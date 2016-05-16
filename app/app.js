var $weatherbutton = $('#getweather')
var $weatherIcon = $('.icon')
var $weatherdetails = $('.weather-details')

var geo_options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
}

function geo_error() {
  alert("Sorry, no position available.")
}

function geo_success(position) {
  var url = "http://api.openweathermap.org/data/2.5/weather"
  var data = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
    APPID: "975eb43f784021cb7facc638a32336ce"
  }
  var jqxhr = $.getJSON(url, data, function(result) {
    switch(result["weather"][0]["main"]) {
      case "Clear":
        $weatherIcon.html("<div class='sun'><div class='rays'></div></div>")
        break
      case "Clouds":
        $weatherIcon.html("<div class='cloud'></div><div class='sun'>   <div class='rays'></div></div>")
        //add background
        break
      case "Drizzle":
        $weatherIcon.html("<div class='cloud'></div><div class='rain'></div>")
        //add background
        break
      case "Rain":
        $weatherIcon.html("<div class='cloud'></div><div class='rain'></div>")
        //add background
        break
      case "Thunderstorm":
        $weatherIcon.html("<div class='cloud'></div><div class='lightning'><div class='bolt'></div><div class='bolt'></div></div>")
        break
      case "Snow":
        $weatherIcon.html("<div class='cloud'></div><div class='snow'><div class='flake'></div><div class='flake'></div></div>")
        //add background
        break
      case "Atmosphere":
        $weatherIcon.html("<div class='cloud'></div><div class='rain'></div>")
        //add background
        break
      default:
        console.log(result["weather"][0]["main"])
    }
    $weatherdetails.append('<li>'+ Math.floor((result["main"]["temp"]-273.15)) + '°C</li>')
    $weatherdetails.append('<li>'+ result["name"] + '</li>')
    $weatherdetails.append('<li>'+ result["wind"]["speed"] + 'km/h</li>')
  }).fail(function () {
    console.log("error")
  })
}
/*
$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options)
}) */
