var $weatherbutton = $('#getweather')
var $weatherIcon = $('.weather')
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
    //icon
    switch(result["weather"][0]["main"]) {
      case "Clear":
        $weatherIcon.html("<i class='wi wi-fw wi-day-sunny'></i>")
        break
      case "Clouds":
        $weatherIcon.html("<i class='wi wi-fw wi-day-cloudy'></i>")
        //add background
        break
      case "Drizzle":
        $weatherIcon.html("<i class='wi wi-fw wi-day-showers'></i>")
        //add background
        break
      case "Rain":
        $weatherIcon.html("<i class='wi wi-fw wi-day-rain'></i>")
        //add background
        break
      case "Thunderstorm":
        $weatherIcon.html("<i class='wi wi-fw wi-day-thunderstorm'></i>")
        break
      case "Snow":
        $weatherIcon.html("<i class='wi wi-fw wi-day-snow'></i>")
        //add background
        break
      case "Atmosphere":
        $weatherIcon.html("<i class='wi wi-fw wi-day-fog'></i>")
        //add background
        break
      default:
        console.log(result["weather"][0]["main"])
    }
    $weatherdetails.children().remove()
    $weatherdetails.append('<h1>'+ Math.floor((result["main"]["temp"]-273.15)) + '<span id="switch"> °C</span></h1>')
    $weatherdetails.append('<h2>'+ result["name"] + '</h2>')
    $weatherdetails.append('<h2>'+ result["wind"]["speed"] + 'km/h</h2>')
    $weatherdetails.append('<h2>'+ result["weather"][0]["description"] + '</h2>')
  }).fail(function () {
    console.log("error")
  })
}

$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options)
})
