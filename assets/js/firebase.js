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

let trainName = $("#train-name");
let destination = $("#destination");
let firstTrainTime = $("#first-train-time");
let frequency = $("#frequency");
let nextArrival;

$("#submit-train").click(event => {
  event.preventDefault();

  // Add form inputs to database as a list
  db.ref().push({
    trainName: trainName.val().trim(),
    destination: destination.val().trim(),
    firstTrainTime: firstTrainTime.val().trim(),
    frequency: frequency.val().trim(),
  });

  // Empty values on the form
  trainName.val("");
  destination.val("");
  firstTrainTime.val("");
  frequency.val("");
});

// Listener for DB
// TODO: Calcaulate minutes away
db.ref().on("child_added", function(snapshot) {

  nextArrival = nextTime(snapshot.val().firstTrainTime, snapshot.val().frequency);

  let minsAway = nextArrival.fromNow(true)
  $(".table-body").append(
    `<tr>
        <td> ${snapshot.val().trainName}
        <td> ${snapshot.val().destination}
        <td> ${snapshot.val().frequency} min
        <td> ${nextArrival.format('h:mm A')}
        <td> ${minsAway}
      `
  );
});

// Find the next arrival time
function nextTime(firstTrainTime, frequency) {
  nextArrival = moment(firstTrainTime, "HH:mm");
  console.log(nextArrival);
  if (moment().isBefore(nextArrival)) {
    console.log(`the start time is later than the current time of ${moment()}`);
    return nextArrival;
  } else {
    while (moment().isAfter(nextArrival)) {
      nextArrival = nextArrival.add(frequency, "m");
    }
  }
  return nextArrival;
}
