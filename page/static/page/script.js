//JS file
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $("#clock").html(h + ":" + m + ":" + s);
    var t = setTimeout(startTime, 500);
    if(m == 00 && s == 00){
        location.reload();
    }
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

update = function() {
    var current = [];
    var forecast = [];
    var activity = [];
    var monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    g = new Date();
    gTime = monthNames[g.getMonth()] + "-" + g.getDate();
    //Gets and sets current conditions
    $.ajax({
        url: "http://api.wunderground.com/api/" + WEATHER_KEY + "/conditions/q/MO/Rolla.json",
        dataType: 'json',
        timeout: 5000,
        success: function(data, status) {
            $.each(data, function(i, item) {
                current = item;
            });
            $("#temp_f").html(Math.round(current.temp_f));
            
            iconDisplay("#icon", String(current.weather))
        },
        error: function() {
            $("#temp_f").html('Error');
        }
    });

    //Gets and sets the forecast
    $.ajax({
        url: "http://api.wunderground.com/api/" + WEATHER_KEY + "/forecast/q/MO/Rolla.json",
        dataType: 'json',
        timeout: 5000,
        success: function(data, status) {
            $.each(data, function(i, thing) {
                forecast = thing;
            });
            $("#current_HL").html(forecast.simpleforecast.forecastday[0].high.fahrenheit + "&deg" + "/" + 
                    forecast.simpleforecast.forecastday[0].low.fahrenheit + "&deg");

            iconDisplay("#iconOne", String(forecast.simpleforecast.forecastday[0].conditions));
            
            iconDisplay("#iconTwo", String(forecast.simpleforecast.forecastday[1].conditions));
            iconDisplay("#iconThree", String(forecast.simpleforecast.forecastday[2].conditions));
            iconDisplay("#iconFour", String(forecast.simpleforecast.forecastday[3].conditions));
        },
        error: function() {
            $("#iconOne").html('Error');
        }
    });
}


function iconDisplay(icon, item) {
    dir_name = '/static/page/bower_components/animated-climacons/climacons/svg-css/';
    switch(item) {
        case "Clear":
            if(icon === "#icon"){
                t = new Date();
                if(t.getHours() < 19 && t.getHours() > 6)
                    $(icon).attr('src', dir_name + 'sunFill.svg');
                else
                    $(icon).attr('src', dir_name + 'moonFill.svg');
                break;
            }
            $(icon).attr('src', dir_name + 'sunFill.svg');
            break;

        case "Overcast":
            $(icon).attr('src', dir_name + 'cloudFill.svg');
            break;

        case "Heavy Rain":
            $(icon).attr('src', dir_name + 'cloudRain.svg');
            break;

        case "Chance of Rain":
        case "Light Rain":
            $(icon).attr('src', dir_name + 'cloudRainAlt.svg');
            break;

        case "Heavy Snow":
            $(icon).attr('src', dir_name + 'cloudSnow.svg');
            break;

        case "Light Snow":
            $(icon).attr('src', dir_name + 'cloudSnowAlt.svg');
            break;

        case "Sunny":
            $(icon).attr('src', dir_name + 'sunFill.svg');
            break;

        case "Mostly Cloudy":
            $(icon).attr('src', dir_name + 'cloudFill.svg');
            break;

        case "Partly Cloudy":
            $(icon).attr('src', dir_name + 'cloudSunFill.svg');
            break;

        case "Chance of a Thunderstorm":
        case "Thunderstorm":
            $(icon).attr('src', dir_name + 'cloudLightning.svg');
            break;

        default:
            $(icon).html('Error/Other');
    }
}
