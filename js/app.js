// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA_BO_r3Fpmr97G51dWWlZza9a3bAgH9qY",
  authDomain: "train-schedule-e0006.firebaseapp.com",
  databaseURL: "https://train-schedule-e0006.firebaseio.com",
  projectId: "train-schedule-e0006",
  storageBucket: "train-schedule-e0006.appspot.com",
  messagingSenderId: "663107929281",
  appId: "1:663107929281:web:1f50b1c3b118f28089c040",
  measurementId: "G-YJ196LVQ4V"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();

var name, dest, firstTime, tFreq;

$("#submit-train").on("click", function(event) {
  event.preventDefault();

  name = $("#name-input").val();
  dest = $("#destination-input").val();
  firstTime = $("#train-time-input").val();
  tFreq = $("#frequency-input").val();

  database.ref().push({
    train_name: name,
    destination: dest,
    time: firstTime,
    frequency: tFreq,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

// Firebase watcher .on("child_added"
database.ref().on(
  "child_added",
  function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.train_name);
    console.log(sv.destination);
    console.log(sv.time);
    console.log(sv.frequency);

    firstTimeConverted = moment(sv.time, "HH:mm a").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % sv.frequency;

    var tMinutesTillTrain = sv.frequency - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    $("tbody").append(
      `<tr><td scope="row">${sv.train_name}</td><td>${sv.destination}</td><td>${
        sv.frequency
      }</td><td>${moment(nextTrain).format(
        "hh:mm a"
      )}</td><td>${tMinutesTillTrain}</td></tr>`
    );

    // Handle the errors
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
