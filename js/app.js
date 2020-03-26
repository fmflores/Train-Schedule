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

      $("#submit-train").on("click", function() {
        event.preventDefault();

        name = $("#name-input").val();
        dest = $("#destination-input").val();
        time = $("#train-time-input").val();
        freq = $("#frequency-input").val();


        console.log(name, dest, time, freq);

        writeUserData(name, dest, time, freq);
      })



  database.ref().on("value", function(snapshot){
      console.log(snapshot.val());
  })

  function writeUserData(name, dest, time, freq) {
    firebase.database().ref().set({
      train_name: name,
      destination: dest,
      time: time,
      frequency: freq
    });
  }