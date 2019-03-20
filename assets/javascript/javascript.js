
var weatherURL = "https://api-watson.herokuapp.com/api/weather";

$.ajax({
    method: "GET",
    url: weatherURL,

}).then(function (response) {
    var dayOneMax = (response.DailyForecasts[0].Temperature.Maximum.Value);
    var dayOneMin = (response.DailyForecasts[0].Temperature.Minimum.Value);

    var dayOneWeather = $("<p>").append("High: " + dayOneMax + "Min: " + dayOneMin);
    $("#dayOne").append(dayOneWeather);

    var dayTwoMax = (response.DailyForecasts[1].Temperature.Maximum.Value);
    var dayTwoMin = (response.DailyForecasts[1].Temperature.Minimum.Value);

    var dayOneWeather = $("<p>").append("High: " + dayTwoMax + "Min: " + dayTwoMin);
    $("#dayTwo").append(dayOneWeather);

    var dayThreeMax = (response.DailyForecasts[2].Temperature.Maximum.Value);
    var dayThreeMin = (response.DailyForecasts[2].Temperature.Minimum.Value);

    var dayOneWeather = $("<p>").append("High: " + dayThreeMax + "Min: " + dayThreeMin);
    $("#dayThree").append(dayOneWeather);

    var dayFourMax = (response.DailyForecasts[3].Temperature.Maximum.Value);
    var dayFourMin = (response.DailyForecasts[3].Temperature.Minimum.Value);

    var dayOneWeather = $("<p>").append("High: " + dayFourMax + "Min: " + dayFourMin);
    $("#dayFour").append(dayOneWeather);

    var dayFiveMax = (response.DailyForecasts[4].Temperature.Maximum.Value);
    var dayFiveMin = (response.DailyForecasts[4].Temperature.Minimum.Value);

    var dayOneWeather = $("<p>").append("High: " + dayFiveMax + "Min: " + dayFiveMin);
    $("#dayFive").append(dayOneWeather);
});




//Firebase 
var config = {
    apiKey: "AIzaSyCeCpOaBk-68HiFXTZAuY6mJadCHh88v28",
    authDomain: "groupprojectone-924a1.firebaseapp.com",
    databaseURL: "https://groupprojectone-924a1.firebaseio.com",
    projectId: "groupprojectone-924a1",
    storageBzucket: "groupprojectone-924a1.appspot.com",
    messagingSenderId: "64898286191"
};
firebase.initializeApp(config);
var database = firebase.database();
//Firebase

$("#add-event-button").click(function (event) {
    event.preventDefault();

    //storing the information the user inputs
    var newEvent = {
        eventName: $("#event-name-input").val().trim(),
        eventDesc: $("#event-description-input").val().trim(),
        eventDate: $("#date-input").val().trim(),
        eventAdress: $("#userAddress").val().trim(),
        eventCity: $("#userCity").val().trim(),
        eventStat: $("#userState").val().trim(),
        eventZip: $("#userZipcode").val().trim(),
        category: $("#Categories").val().trim()
    }
    //Put the new information in the firebase
    database.ref().push(newEvent);
    //Clears the input fields
    $("#event-name-input").val("");
    $("#event-description-input").val("");
    $("#date-input").val("");
    $("#userAddress").val("");
    $("#userCity").val("");
    $("#userState").val("");
    $("#userZipcode").val("");
    $("#Categories").val("");
})
//Whenever anything gets added to the database 
database.ref().on("child_added", function (childSnapshot) {
    var evName = childSnapshot.val().eventName;
    var evDate = childSnapshot.val().eventDate;
    var evDesc = childSnapshot.val().eventDesc;
    var adress = childSnapshot.val().eventAdress;

   console.log(adress);
   
    var eventDiv = $("<div>");
    var eventPlace = $("<h4>");
    var nameHead = $("<h3>");
    var description = $("<p>");
    var date= $("<small>");
    eventPlace.text(adress);

    date.text(evDate);
    nameHead.text(evName);
    nameHead.append(date);
    description.text(evDesc);
    nameHead.append(date);

    nameHead.append(date)
    eventDiv.append(nameHead);
    eventDiv.append(eventPlace); 
    eventDiv.append(description);
    // eventDiv.append(date);


    $(".event-update").append(eventDiv);
})

