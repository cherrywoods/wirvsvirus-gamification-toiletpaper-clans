const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const { TIMESTAMP } = admin.database.ServerValue;

const userCollectionRef = admin.database().ref('User')
const teamCollectionRef = admin.database().ref('Team');

exports.userSignup = functions.auth.user().onCreate(async user => {
  const { uid } = user;
  const userRef = userCollectionRef.child(uid);
  const teamRef = await teamCollectionRef.push({
    name: 'Team',
    members: [uid]
  });
  if (!teamRef || !teamRef.key) {
    throw new Error('Team creation failure.');
  }
  
  return userRef.set({
    username: null,
    team: teamRef.key,
    toiletpaper: 1,
    atHomeTime: TIMESTAMP,
    new: true
  });
});

exports.updateHomeStatus = functions.https.onCall(async ({ home }, context) => {
  if (!context.auth || !context.auth.uid) {
    throw new Error('Authentication failure.');
  }

  const userRef = admin.database().ref('User').child(context.auth.uid);
  const updateDoc = {
    lastStatus: TIMESTAMP
  };
  if (home) {
    updateDoc.atHomeTime = TIMESTAMP;
  }
  return userRef.update(updateDoc);
});

exports.cronUserUpdate = functions.pubsub.schedule('every 5 minutes').onRun(context => {
  const usersAtHome = admin.database().ref('User').orderByChild('atHomeTime').startAt(Date.now() - (30 * 60 * 1000));
  usersAtHome.once('value', async result => {
    const users = result.val();
    if (!users) {
      return;
    }
    const teamUpdates = {};
    const updateObj = Object.keys(users).reduce(
      (obj, key) => {
        const user = users[key];
        teamUpdates[user.team] = (teamUpdates[user.team] || 0) + 1;
        return {
          ...obj,
          [`${key}/toiletpaper`]: users[key].toiletpaper+1
        };
      },
      {}
    );
    await userCollectionRef.update(updateObj);
    await Promise.all(Object.keys(teamUpdates).map(async key => {
      return teamCollectionRef.child(`${key}/toiletpaper`).transaction(value => (value || 0) + teamUpdates[key]);
    }));
  });
  return null;
});