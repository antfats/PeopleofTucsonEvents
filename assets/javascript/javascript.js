
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
    var evState = childSnapshot.val().eventStat;
    var evCity = childSnapshot.val().eventCity
    var evZip = childSnapshot.val().eventZip
    var eventDiv = $("<div>");
    var eventPlace = $("<h4>");
    var nameHead = $("<h3>");
    var description = $("<p>");
    var date = $("<small>");
    var mapBtn = $("<button>");
    mapBtn.text("Show on map");

    mapBtn.data(eventPlace);


    eventPlace.text(adress);
    mapBtn.addClass("class='btn btn-primary map-display-btn'");
    mapBtn.attr("type='button'");
    mapBtn.attr("adress='3111 East Fourth Street Tucson AZ 85716")
    date.text(evDate);
    nameHead.text(evName);
    nameHead.append(date);
    description.text(evDesc);
    nameHead.append(date);


    nameHead.append(date);
    eventDiv.append(nameHead);
    evName = JSON.stringify(evName);
    console.log(evName);  

    var clickedAdress = JSON.stringify(adress);
    var fixedState = JSON.stringify(evState);
    var fixedCity = JSON.stringify(evCity);
    var inputInfo = clickedAdress + fixedCity + fixedState + evZip;
    var fixedURL = (inputInfo.replace(/['"]+/g, ' '));
    fixedURL = JSON.stringify(fixedURL);
    console.log(fixedURL);


    eventDiv.append("<button type= 'button' class='btn btn-primary map-display-btn' eventName="+evName+" "+"address=" + fixedURL + ">Show On Map </button>");
  
    eventDiv.append(eventPlace);
    eventDiv.append(description);
    console.log("<button type= 'button' class='btn btn-primary map-display-btn' eventName="+evName+" "+"address=" + fixedURL + ">Show On Map </button>");
    // eventDiv.append(date);





    $(".event-update").append(eventDiv);
})



//Start of Ryans map code

var userLatitude = "";
var userLongitude = "";
var eventName = "";

var eventLatitude = 0;
var eventLongitude = 0;



var mymap = L.map('mapid').setView([32.2226, -110.95], 12);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicnlhbmdyYWR5MjUwIiwiYSI6ImNqdGF1anp2bjBleTM0N29pOGU3bzRldTEifQ.i3WNwmydXC87WBE61bojkg'
}).addTo(mymap);


//On Submit button click


$(document.body).on("click", ".map-display-btn", function (event) {
    event.preventDefault();



    //Use Ajax to convert address to GPS coordinates

    var userAddress = this.getAttribute("address");
    var realEventName = this.getAttribute("eventName");
    console.log(realEventName);
    var addressURL = "https://api.opencagedata.com/geocode/v1/json?key=5936bf3355354b28bedf111b0c40104c&q=" + userAddress + "&pretty=1";

    $.ajax({
        method: "GET",
        url: addressURL,

    }).then(function (response) {

        eventLatitude = response.results[1].geometry.lat;
        eventLongitude = response.results[1].geometry.lng;



        //Push the GPS coordinates to the map

        $("#TestDiv").attr("style", "visibility: visible");

        JSON.stringify(realEventName);
        userLatitude = $("#userLatitude").val();
        userLongitude = $("#userLongitude").val();
        eventName = realEventName;





        var marker = L.marker([eventLatitude, eventLongitude]).addTo(mymap);




        marker.bindPopup("<b>" + eventName + "</b>").openPopup();



    });

});


