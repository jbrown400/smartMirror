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

}


function iconDisplay(icon, item) {
    dir_name = '/static/page/bower_components/animated-climacons/climacons/svg-css/';
    switch(item) {
        case "Clear":
            $(icon).attr('src', dir_name + 'sunFill.svg');
              break;
        default:
            $(icon).html('Error/Other');
    }
}
