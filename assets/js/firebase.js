  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAxXryRfhLycQrmuVRzJKsxvkWTYhQDGTo",
    authDomain: "trainscheduler-31b14.firebaseapp.com",
    databaseURL: "https://trainscheduler-31b14.firebaseio.com",
    projectId: "trainscheduler-31b14",
    storageBucket: "trainscheduler-31b14.appspot.com",
    messagingSenderId: "390799876929"
  };
  firebase.initializeApp(config);
  const db = firebase.database().ref();
