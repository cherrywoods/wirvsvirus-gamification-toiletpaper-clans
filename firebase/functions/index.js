const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.cronUserUpdate = functions.pubsub.schedule('every 5 minutes').onRun(context => {
  const usersAtHome = admin.database().ref('User').orderByChild('atHomeTime').startAt(Date.now() - (30 * 60 * 1000));
  usersAtHome.once('value', users => {
    console.log(users);
  });
  return null;
});