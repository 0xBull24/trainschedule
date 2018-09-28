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
  const db = firebase.database();

  $('#submit-train').click(event => {
    event.preventDefault();

    let trainName = $('#train-name')
    let destination = $('#destination')
    let firstTrainTime = $('#first-train-time')
    let frequency = $('#frequency')

    // Add form inputs to database as a list
    db.ref().push({
      trainName: trainName.val().trim(),
      destination: destination.val().trim(),
      firstTrainTime: firstTrainTime.val().trim(),
      frequency: frequency.val().trim(),
      nextArrival: 1, 
      minsAway: 1,
    })

    // Empty values on the form
    trainName.val('');
    destination.val('');
    firstTrainTime.val('');
    frequency.val('');
  })

  // Listener for DB
  // TODO: Calculate the next arrival
  // TODO: Calcaulate minutes away
  db.ref().on('child_added', function(snapshot){
    console.log(snapshot.val())
    $('.table-body').append(
      `<tr>
        <td> ${snapshot.val().trainName}
        <td> ${snapshot.val().destination}
        <td> ${snapshot.val().frequency} min
        <td> ${snapshot.val().nextArrival} 
        <td> ${snapshot.val().minsAway} 
      `
    )
  })