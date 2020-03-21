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

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

firebase.database().ref('Team/').once('value', function (snapshot) {
        console.log(snapshot.val())
});
