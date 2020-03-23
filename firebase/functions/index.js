const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const { TIMESTAMP } = admin.database.ServerValue;

const userCollectionRef = admin.database().ref('User')
const teamCollectionRef = admin.database().ref('Team');

const getAtHomeExpiry = date => (date || Date.now()) - 30 * 60 * 1000;
const getMinAtHomeLimit = date => (date || Date.now()) - 1 * 60 * 1000;

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

exports.onCronUserUpdate = functions.pubsub.schedule('every 5 minutes').onRun(context => {
  const callDate = new Date(context.timestamp);
  const usersAtHome = admin.database().ref('User').orderByChild('lastAtHomeTime').startAt(getAtHomeExpiry(callDate));
  usersAtHome.once('value', async result => {
    const users = result.val();
    if (!users) {
      return;
    }
    const teamMembersHome = {};
    const updateObj = Object.keys(users).reduce(
      (obj, key) => {
        const user = users[key];
        
        // Users have to be at home for at least 1 minute to be able to receive loot
        if (user.lastOutsideTime >= getMinAtHomeLimit(callDate)) {
          return obj;
        }

        teamMembersHome[user.team].push(key);
        return {
          ...obj,
          [`${key}/toiletpaper`]: users[key].toiletpaper+1
        };
      },
      {}
    );
    await userCollectionRef.update(updateObj);
    await Promise.all(Object.keys(teamMembersHome).map(async key => {
      return teamCollectionRef.child(key).transaction(team => {
        const membersHomeCount = teamMembersHome[key].length;
        team.toiletpaper = (team.toiletpaper || 0) + membersHomeCount;
        if (callDate.getMinutes() % 2 === 1 && membersHomeCount >= Object.keys(team.members).length) {
          team.disinfectant = (team.disinfectant || 0) + 1;
        } else {
          team.disinfectant = (team.disinfectant || 0) - 1;
        }
        return team;
      });
    }));
  });
  return null;
});

exports.updateHomeStatus = functions.https.onCall(async ({ home }, context) => {
  if (!context.auth || !context.auth.uid) {
    throw new Error('Authentication failure.');
  }

  const userRef = admin.database().ref('User').child(context.auth.uid);
  // const updateDoc = {
  //   lastStatus: TIMESTAMP,
  // };
  // if (home) {
  //   updateDoc.lastAtHomeTime = TIMESTAMP;
  //   if ()
  // }
  return userRef.transaction(user => {
    user.lastStatus = TIMESTAMP;
    if (home) {
      if (user.lastAtHomeTime < getAtHomeExpiry()) {
        user.lastOutsideTime = TIMESTAMP-1;
      }
      user.lastAtHomeTime = TIMESTAMP;
    }
    return user;
  });
});