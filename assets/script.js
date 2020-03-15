
// var apiKey = "ba5f08a1af110cb53f0aab50ebe1553b";

// var queryURL     = "http://api.openweathermap.org/data/2.5/forecast?q=tallahassee,florida&units=imperial&appid=ba5f08a1af110cb53f0aab50ebe1553b";

var city  = "";
var state = "";

var cityInput = $("#searchCity");
var stateInput = $("#searchState");

function runQuery(){

    // URL for 5 day forcast
    var futureDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city +"," + state + "&units=imperial&appid=ba5f08a1af110cb53f0aab50ebe1553b";

    // URL for current forecast
    var currentDayURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city +"," + state + "&units=imperial&appid=ba5f08a1af110cb53f0aab50ebe1553b"


$.ajax({
    url: futureDayURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    // Grab date for each day


    // Grab weather icon for each day

    var iconcode1 = response.list[4].weather[0].icon;
    var iconcode2 = response.list[12].weather[0].icon;
    var iconcode3 = response.list[20].weather[0].icon;
    var iconcode4 = response.list[28].weather[0].icon;
    var iconcode5 = response.list[36].weather[0].icon;

    var iconurl1 = "http://openweathermap.org/img/w/" + iconcode1 + ".png";
    var iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png";
    var iconurl3 = "http://openweathermap.org/img/w/" + iconcode3 + ".png";
    var iconurl4 = "http://openweathermap.org/img/w/" + iconcode4 + ".png";
    var iconurl5 = "http://openweathermap.org/img/w/" + iconcode5 + ".png";

    // Grab temperature for each day

    console.log((response.list[4].main.temp).toFixed(1) + " °F");
    console.log((response.list[12].main.temp).toFixed(1) + " °F");
    console.log((response.list[20].main.temp).toFixed(1) + " °F");
    console.log((response.list[28].main.temp).toFixed(1) + " °F");
    console.log((response.list[36].main.temp).toFixed(1) + " °F");

    // Grab humidity for each day


  });

$.ajax({
    url: currentDayURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    // Grab city name

    console.log(response.name);


    // Grab date

    console.log(moment().format("l"));


    // Grab temperature

    console.log((response.main.temp).toFixed(1) + " °F");

    // Grab humidity

    console.log(Math.round(response.main.humidity) + "%");

    // Grab wind speed

    console.log((response.wind.speed).toFixed(1) + "MPH");

    // Grab latitude and longitude

    console.log(response.coord.lon);
    console.log(response.coord.lat);
    var lon = response.coord.lon;
    var lat = response.coord.lat;

    // URL for current UV Index
  var UVIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=ba5f08a1af110cb53f0aab50ebe1553b";

  $.ajax({
    url: UVIndexURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    // Grab UV index
    console.log(response.value);


  });


  });


};

$("#search-btn").on("click", function(e){
    e.preventDefault();
    city  = cityInput.val().trim().toLowerCase();
    state = stateInput.val().trim().toLowerCase();
    runQuery();
  });
