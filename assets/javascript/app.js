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

//in firebase, storing name, destination, frequency, minsUntilTrain, arrivalTime

function convertTime() {
    
}

//Every minute, update number of minutes until next train in table
var refreshOnMinute = setInterval(function() { //every minute, refresh time until next train &
    $("#minutes-away-table").text(minsUntilTrain);
}, 60000);

//setting initial values
var name = "";
var firstTrainTime = "";
var frequency = "";
var destination = "";
//var minsUntilTrain;
//var arrivalTime;

//when submit button is clicked...
$("#submit-button").on("click", function() {
    //capture user form entries
    name = $("#train-name").val().trim();
    firstTrainTime = $("#first-time").val().trim();
    frequency = $("#frequency").val().trim();
    destination = $("#destination").val().trim();
    database.ref().push({ //pushing variables to firebase to be tracked
        name: name,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        destination: destination,
        //minsUntilTrain: minsUntilTrain,
        //arrivalTime: arrivalTime
    });
    database.ref().on("value", function(snapshot) { //on load, and anytime the data in the database changes...
        //update HTML to reflect those changes
            console.log(snapshot.val());
            var trainName = name.snapshot.val();
            $("#train-name-table").text(trainName);
            var trainDestination = destination.snapshot.val();
            $("#destination-table").text(snapshot.val().trainDestination);
            var trainFrequency = frequency.snapshot.val();
            $("#frequency-table").text(snapshot.val().trainFrequency);

            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

            var minsUntilTrain = function(currentTime, trainFrequency, firstTrainTime) { //to calculate minutes until next train
                //17 - [Remainder of ( (currentTime - firstTrainTime) / trainFrequency )] = time til next train
                    var currentTimeMinutes = (currentTime.hour()*60) + currentTime.minute(); //currentTime to minutes
                    var firstTrainTimeMinutes = (firstTrainTime.hour()*60) + firstTrainTime.minute(); //firstTrainTime to minutes; use moment.js?????
                    var difference = currentTimeMinutes - firstTrainTimeMinutes;
                    var remainder = difference % trainFrequency;
                    var minutesLeft = 17 - remainder;
                }

            var arrivalTime = currentTime + minsUntilTrain; //do sthg with this using moment.js
            
            //calculate minutes until next train & arrival time!!!!!!!!!!!!!

            //$("#next-arrival-table").text(snapshot.val().minsUntilTrain);
            //$("#minutes-away-table").text(snapshot.val().arrivalTime)
        });
});

//IS 12:00 A STRING OR AN INTEGER????????



//grab user's input from form


//snapshot.val();





$("#remove-button").on("click", function() {

});
});