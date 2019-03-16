
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
