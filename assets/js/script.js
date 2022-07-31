// Delcaring the global variable for the city names and persisting list.
var cityList = [];
var cityname;

// Creating functions for localStorage
initCityList();
initWeather();

// Creating a function that display the city the user enters
function renderCities(){
    $("#cityList").empty();
    $("#cityInput").val("");

    for(i=0; i<citylist.length; i++){
        var a = $("<a>");
        a.addClass("list-group-item list-group-item-action list-group-item-primary city");
        a.attr("data-name", citylist[i]);
        a.text(cityList[i]);
        $("cityList").prepend(a);
    }
}