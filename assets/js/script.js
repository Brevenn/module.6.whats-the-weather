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
    
}