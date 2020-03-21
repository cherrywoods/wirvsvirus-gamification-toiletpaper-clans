import * as firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyADJaKzQkiHVAlJsjEVijQA7vU81ltyxTs",
    authDomain: "wirvsvirus-toiletpaper.firebaseapp.com",
    databaseURL: "https://wirvsvirus-toiletpaper.firebaseio.com/",
    projectId: "wirvsvirus-toiletpaper",
    storageBucket: "wirvsvirus-toiletpaper.appspot.com",
    messagingSenderId: "922995692187",
    appId: "1:922995692187:web:f98db1f5db979682e5ec3e",
    measurementId: "G-SCVEE4EEG5"
  };

export function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // test console log
  firebase.database().ref('Team/').once('value', function (snapshot) {
    console.log(snapshot.val())
    registerDisinfectantListener("-M2xiPYYzZTU5u9yy3Fa", (desi) => {console.log("disinfectant: " + desi)});
    registerToiletpaperListener("-M2xiPYYzZTU5u9yy3Fa", (tp) => {console.log("toiletpaper: " + tp)});
  });
}

export function registerDisinfectantListener(teamId, listener) {
  firebase.database().ref('Team/' + teamId + '/disinfectant').on('value', (snapshot) => {
    listener(snapshot.val());
  });
}

export function registerToiletpaperListener(teamId, listener) {
  
  firebase.database().ref('Team/' + teamId).once('value', (snapshot) => {
    const value = snapshot.val();
    var members = value.Member.split(",");

    var toiletpaperScores = new Map();
    for (const index in members) {
      firebase.database().ref('User/' + members[index] + '/toiletpaper').on('value', (snapshot) => {
        toiletpaperScores.set(members[index], snapshot.val());

        const sum = (accumulator, currentValue) => accumulator + currentValue;
        const teamToiletpaperScore = Array.from(toiletpaperScores.values()).reduce(sum);
        listener(teamToiletpaperScore + 0);
      });
    }

  });

}
