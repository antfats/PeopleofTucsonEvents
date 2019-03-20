
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

    $("#map-display-btn").click(function () {
        event.preventDefault();

      //Use Ajax to convert address to GPS coordinates

      var userAddress = $("#userAddress").val();
      var userCity = $("#userCity").val();
      var userState = $("#userState").val();
      var userZipcode = $("#userZipcode").val();


      var addressURL = "https://api.opencagedata.com/geocode/v1/json?key=5936bf3355354b28bedf111b0c40104c&q=" + userAddress + " " + userCity + " " + userState + " " + userZipcode + "&pretty=1";

      $.ajax({
        method: "GET",
        url: addressURL,

      }).then(function (response) {

        eventLatitude = response.results[1].geometry.lat;
        eventLongitude = response.results[1].geometry.lng;




        //Push the GPS coordinates to the map

        $("#TestDiv").attr("style", "visibility: visible");

        userLatitude = $("#userLatitude").val();
        userLongitude = $("#userLongitude").val();
        eventName = $("#eventName").val();





        var marker = L.marker([eventLatitude, eventLongitude]).addTo(mymap);




        marker.bindPopup("<b>" + eventName + "</b>").openPopup();



      });

    });