const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const { TIMESTAMP } = admin.database.ServerValue;

const userCollectionRef = admin.database().ref('User');
const teamCollectionRef = admin.database().ref('Team');
const metaCollectionRef = admin.database().ref('Meta');

const metaDropTimestampsRef = metaCollectionRef.child('dropTimestamps');

const getAtHomeExpiry = timestamp => (timestamp || Date.now()) - 30 * 60 * 1000;
const getMinAtHomeLimit = timestamp => (timestamp || Date.now()) - 1 * 60 * 1000;

const handleObjectRefTransaction = (ref, handler) => {
  return ref.transaction(obj => {
    if (!obj) {
      // causes transaction to be called again when value is available
      return 0;
    }
    return handler(obj);
  }, () => {}, true)
  // For some reason this is necessary to fix a Maximum call stack exception:
    .then(() => true)
    .catch(() => false);
};

exports.onUserSignup = functions.auth.user().onCreate(async user => {
  const { uid } = user;
  const userRef = userCollectionRef.child(uid);
  const teamRef = await teamCollectionRef.push({
    name: null,
    leader: uid,
    members: [uid],
    toiletpaper: 0,
    disinfectant: 1
  });
  if (!teamRef || !teamRef.key) {
    throw new Error('Team creation failure.');
  }
  
  return userRef.set({
    username: null,
    team: teamRef.key,
    toiletpaper: 1,
    lastAtHomeTime: TIMESTAMP,
    lastOutsideTime: 0,
    lastStatus: TIMESTAMP,
    new: true
  });
});

exports.onUserTeamChange = functions.database.ref('/User/{uid}/team').onWrite(async (data, context) => {
  const { uid } = context.params;
  const userDoc = await userCollectionRef.child(uid).once('value');
  const user = userDoc.val();
  const promises = [];
  if (data.before) {
    const teamRef = teamCollectionRef.child(data.before);
    promises.push(
      teamRef.child('toiletpaper').transaction(value => value - user.toiletpaper)
    );
  }
  if (data.after) {
    const teamRef = teamCollectionRef.child(data.after);
    promises.push(
      teamRef.child('toiletpaper').transaction(value => value + user.toiletpaper)
    );
  }
  return Promise.all(promises);
});

exports.onCronUserUpdate = functions.pubsub.schedule('every 5 minutes').onRun(async context => {
  const callDate = new Date(context.timestamp);
  const callTimestamp = callDate.getTime();

  const usersAtHome = admin.database().ref('User').orderByChild('lastAtHomeTime').startAt(getAtHomeExpiry(callTimestamp));
  const result = await usersAtHome.once('value');
  const users = result.val();

  if (!users) {
    return;
  }

  const teamMembersHome = {};
  const updateObj = Object.keys(users).reduce(
    (obj, key) => {
      const user = users[key];
      
      // Users have to be at home for at least 1 minute to be able to receive drops
      if (user.lastOutsideTime >= getMinAtHomeLimit(callTimestamp)) {
        return obj;
      }

      if (!teamMembersHome[user.team]) {
        teamMembersHome[user.team] = [key];
      } else {
        teamMembersHome[user.team].push(key);
      }
      return {
        ...obj,
        [`${key}/toiletpaper`]: users[key].toiletpaper+1
      };
    },
    {}
  );
  
  const dropDisinfectant = callDate.getMinutes() % 2 === 1;

  await Promise.all([
    handleObjectRefTransaction(
      metaDropTimestampsRef,
      timestamps => {
        timestamps.lastToiletpaperDrop = callTimestamp;
        timestamps.upcomingToiletpaperDrop = callTimestamp + 5 * 60 * 1000;
        if (dropDisinfectant) {
          timestamps.lastDisinfectantDrop = callTimestamp;
          timestamps.upcomingDisinfectantDrop = callTimestamp + 10 * 60 * 1000;
        }
        return timestamps;
      }
    ),
    userCollectionRef.update(updateObj),
    ...Object.keys(teamMembersHome).map(
      async key => handleObjectRefTransaction(
        teamCollectionRef.child(key),
        team => {
          const membersHomeCount = teamMembersHome[key].length;
          team.toiletpaper = (team.toiletpaper || 0) + membersHomeCount;
          if (membersHomeCount >= Object.keys(team.members).length) {
            if (dropDisinfectant) {
              // only increase every 10 minutes
              team.disinfectant = (team.disinfectant || 0) + 1;
            }
          } else {
            team.disinfectant = (team.disinfectant || 0) - 1;
          }
          return team;
        }
      )
    )
  ]);
});

exports.updateHomeStatus = functions.https.onCall(async ({ home }, context) => {
  if (!context.auth || !context.auth.uid) {
    throw new Error('Authentication failure.');
  }

  const userRef = admin.database().ref('User').child(context.auth.uid);
  console.log(context.auth.uid);
  return handleObjectRefTransaction(
    userRef,
    user => {
      const currentTime = Date.now();
      user.lastStatus = currentTime;
      if (home) {
        if (user.lastAtHomeTime < getAtHomeExpiry()) {
          user.lastOutsideTime = currentTime - 1;
        }
        user.lastAtHomeTime = currentTime;
      }
      return user;
    }
  );
});