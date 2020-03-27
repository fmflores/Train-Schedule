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

  var name, dest, time, freq;
  var arrival = "";
  var minAway = 0;


      $("#submit-train").on("click", function(event) {
        event.preventDefault();

        name = $("#name-input").val();
        dest = $("#destination-input").val();
        time = $("#train-time-input").val();
        freq = $("#frequency-input").val();



        console.log(name, dest, time, freq);

        database.ref().push({
            train_name: name,
      destination: dest,
      time: time,
      frequency: freq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP

        });
      });

// Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.train_name);
    console.log(sv.destination);
    console.log(sv.time);
    console.log(sv.frequency);

    

    $("tbody").append(`<tr><td scope="row">${name}</td><td>${sv.destination}</td><td>${sv.frequency}</td><td>${arrival}</td><td>${minAway}</td></tr>`);


    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

