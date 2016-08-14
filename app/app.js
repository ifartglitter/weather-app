var $weatherIcon = $('.weather')

var temp_c = 0
var temp_f = 0
var isCelsius = true

var url = 'http://api.openweathermap.org/data/2.5/weather'

var data = {
    lat: 0,
    lon: 0,
    appid: '975eb43f784021cb7facc638a32336ce'
}

$.getJSON('http://ipinfo.io', function(result) {
    var locationArray = result.loc.split(',')
    data.lat = locationArray[0]
    data.lon = locationArray[1]
    $.getJSON(url, data, function(result) {
        // icon
        switch (result['weather'][0]['main']) {
            case 'Clear':
                $weatherIcon.html("<i class='wi wi-fw wi-day-sunny'></i>")
                $('body').addClass('sunny')
                break
            case 'Clouds':
                $weatherIcon.html("<i class='wi wi-fw wi-day-cloudy'></i>")
                $('body').addClass('sunny')
                break
            case 'Drizzle':
                $weatherIcon.html("<i class='wi wi-fw wi-day-showers'></i>")
                $('body').addClass('rainy')
                break
            case 'Rain':
                $weatherIcon.html("<i class='wi wi-fw wi-day-rain'></i>")
                $('body').addClass('rainy')
                break
            case 'Thunderstorm':
                $weatherIcon.html("<i class='wi wi-fw wi-day-thunderstorm'></i>")
                $('body').addClass('rainy')
                break
            case 'Snow':
                $weatherIcon.html("<i class='wi wi-fw wi-day-snow'></i>")
                $('body').addClass('rainy')
                break
            case 'Atmosphere':
                $weatherIcon.html("<i class='wi wi-fw wi-day-fog'></i>")
                $('body').addClass('rainy')
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
    }).fail(function(e) {
        alert(e.message)
    })
})

$('#switch').on('click', function() {
    if (isCelsius) {
        $('#temperature').html(temp_f + ' °F')
        isCelsius = false
    } else {
        $('#temperature').html(temp_c + ' °C')
        isCelsius = true
    }
})
