
// var apiKey = "ba5f08a1af110cb53f0aab50ebe1553b";

// var queryURL     = "http://api.openweathermap.org/data/2.5/forecast?q=tallahassee,florida&units=imperial&appid=ba5f08a1af110cb53f0aab50ebe1553b";

var city  = "";
var state = "";

var cityInput  = $("#searchCity");
var stateInput = $("#searchState");

var dateArray = [];
var iconArray = [];
var tempArray = [];
var humArray  = [];

function runQuery(){

    // URL for 5 day forcast
    var futureDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city +"," + state + "&units=imperial&appid=ba5f08a1af110cb53f0aab50ebe1553b";

    // URL for current forecast
    var currentDayURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city +"," + state + "&units=imperial&appid=ba5f08a1af110cb53f0aab50ebe1553b"


$.ajax({
    url: futureDayURL,
    method: "GET"
  }).then(function(response) {

    // Grab date for each day
    var date1 = moment().add(1, 'days').format("l");
    var date2 = moment().add(2, 'days').format("l");
    var date3 = moment().add(3, 'days').format("l");
    var date4 = moment().add(4, 'days').format("l");
    var date5 = moment().add(5, 'days').format("l");

    dateArray.push(date1, date2, date3, date4, date5);
    
    console.log(dateArray);

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

    iconArray.push(iconurl1, iconurl2, iconurl3, iconurl4, iconurl5);

    console.log(iconArray);

    // Grab temperature for each day
    var temp1 = (response.list[4].main.temp).toFixed(1) + " °F";
    var temp2 = (response.list[12].main.temp).toFixed(1) + " °F";
    var temp3 = (response.list[20].main.temp).toFixed(1) + " °F";
    var temp4 = (response.list[28].main.temp).toFixed(1) + " °F";
    var temp5 = (response.list[36].main.temp).toFixed(1) + " °F";

    tempArray.push(temp1, temp2, temp3, temp4, temp5);

    console.log(tempArray);

    // Grab humidity for each day
    var hum1 = Math.round(response.list[4].main.humidity) + "%";
    var hum2 = Math.round(response.list[12].main.humidity) + "%";
    var hum3 = Math.round(response.list[20].main.humidity) + "%";
    var hum4 = Math.round(response.list[28].main.humidity) + "%";
    var hum5 = Math.round(response.list[36].main.humidity) + "%";

    humArray.push(hum1, hum2, hum3, hum4, hum5);

    console.log(humArray);
    
  });

$.ajax({
    url: currentDayURL,
    method: "GET"
  }).then(function(response) {

    // Grab city name
    var city = response.name;

    // Grab date
    var date = moment().format("l");

    // Put City name on page
    $(".current-day").addClass("border");
    $(".cityName").text(city + " " + date).addClass("ml-5 mt-4");

    // Grab weather icon
    var icon = response.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";

    // Grab temperature
    var temp = (response.main.temp).toFixed(1) + " °F";

    // Put Temp on page
    $(".cityTemp").text("Temperature: " + temp).addClass("ml-5 mt-4");

    // Grab humidity
    var hum = Math.round(response.main.humidity) + "%";

    // Put Humidity on page
    $(".cityHum").text("Humidity: " + hum).addClass("ml-5 mt-4");

    // Grab wind speed
    var wind = (response.wind.speed).toFixed(1) + "MPH";

    // Put Wind Speed on page
    $(".cityWind").text("Wind Speed: " + wind).addClass("ml-5 mt-4");

    // Grab latitude and longitude
    var lon = response.coord.lon;
    var lat = response.coord.lat;

    // URL for current UV Index
    var UVIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=ba5f08a1af110cb53f0aab50ebe1553b";


  $.ajax({
    url: UVIndexURL,
    method: "GET"
  }).then(function(response) {

    // Grab UV index
    var UV = response.value;

    // Add class to UV
    var span = $("<span>").text(UV).addClass("UV-bad");

    // Put UV on page
    $(".cityUV").text("UV Index: ").addClass("ml-5 mt-4").append(span);

  });

  });

};

$("#search-btn").on("click", function(e){
    e.preventDefault();
    city  = cityInput.val().trim().toLowerCase();
    state = stateInput.val().trim().toLowerCase();
    runQuery();
    cityInput.val("");
    stateInput.val("");
  });
