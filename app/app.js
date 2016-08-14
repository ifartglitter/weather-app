'use strict'

var temp_c = 0
var temp_f = 0
var isCelsius = true

$.getJSON('http://ipinfo.io', function (result) {

  var url = 'http://api.openweathermap.org/data/2.5/weather'
  var locationArray = result.loc.split(',')
  var data = {
    lat: locationArray[0],
    lon: locationArray[1],
    appid: '975eb43f784021cb7facc638a32336ce'
  }

  $.getJSON(url, data, function (result) {

    var $weatherIcon = $('.weather')
    // icon

    function setIcon (icon, bgcolor) {
      $weatherIcon.html(icon)
      $('body').prop('class', bgcolor)
    }

    switch (result['weather'][0]['main']) {
      case 'Clear':
        setIcon("<i class='wi wi-fw wi-day-sunny'></i>", 'sunny')
        break
      case 'Clouds':
        setIcon("<i class='wi wi-fw wi-day-cloudy'></i>", 'sunny')
        break
      case 'Drizzle':
        setIcon("<i class='wi wi-fw wi-day-showers'></i>", 'rainy')
        break
      case 'Rain':
        setIcon("<i class='wi wi-fw wi-day-rain'></i>", 'rainy')
        break
      case 'Thunderstorm':
        setIcon("<i class='wi wi-fw wi-day-thunderstorm'></i>", 'rainy')
        break
      case 'Snow':
        setIcon("<i class='wi wi-fw wi-day-snow'></i>", 'rainy')
        break
      case 'Atmosphere':
        setIcon("<i class='wi wi-fw wi-day-fog'></i>", 'rainy')
        break
      default:
        console.log(result['weather'][0]['main'])
    }

    temp_c = Math.floor((result['main']['temp'] - 273.15))
    temp_f = temp_c * 9 / 5 + 32

    $('#temperature').html(temp_c + ' °C')
    $('#city').html(result['name'])
    $('#windspeed').html(result['wind']['speed'] + ' km/h')
    $('#description').html(result['weather'][0]['description'])
  }).fail(function (e) {
    alert(e.message)
  })
})

$('#switch').on('click', function () {
  if (isCelsius) {
    $('#temperature').html(temp_f + ' °F')
    isCelsius = false
  } else {
    $('#temperature').html(temp_c + ' °C')
    isCelsius = true
  }
})
