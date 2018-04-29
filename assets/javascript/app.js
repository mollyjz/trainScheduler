$(document).ready(function() {

var config = { //setting up connection to firebase
    apiKey: "AIzaSyAuDQi6-1qaonDqRA9fZUHUP0Tixytzx2M",
    authDomain: "train-schedule-700c9.firebaseapp.com",
    databaseURL: "https://train-schedule-700c9.firebaseio.com",
    projectId: "train-schedule-700c9",
    storageBucket: "train-schedule-700c9.appspot.com",
    messagingSenderId: "882169554453"
  };

firebase.initializeApp(config);

var database = firebase.database(); //refers to info in database

//setting initial values
var name = "";
var firstTrainTime = "";
var frequency = "";
var destination = "";

//when submit button is clicked...
$("#submit-button").on("click", function() {
    event.preventDefault();
    name = $("#train-name").val().trim(); //capture user form entries
    firstTrainTime = $("#first-time").val().trim();
    frequency = $("#frequency").val().trim();
    destination = $("#destination").val().trim();
    database.ref().push({ //push variables to firebase to be tracked
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
    });
});


database.ref().on("value", function(snapshot) { //on load, and anytime the data in the database changes...

    //console.log (snapshot.val().name); //UNDEFINED!!!!!!!!!!!!!!!???????????????????????????????????????????
    frequencyInt = parseInt(snapshot.val().frequency); //converting to integer for use in calculations

    console.log(snapshot.val()); //NULL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    var currentTime = moment();
    var difference = moment().diff(moment(firstTrainTime), "minutes");
    var remainder = difference % frequencyInt;
    var minsUntilTrain = 17 - remainder; //NOT A NUMBER???????????????????????????
    var arrivalTime = moment().add(minsUntilTrain, "minutes");

    //append data to train table
    $("#train-table").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + arrivalTime + "</td><td>" + minsUntilTrain + "</td></tr>");

    //refresh time until next train every minute
    //function refreshOnMinute() {
    //    $("").replaceWith(minsUntilTrain)
    //};

    //setInterval(refreshOnMinute(), 60000);
});

    });


//$("#remove-button").on("click", function() {
//});