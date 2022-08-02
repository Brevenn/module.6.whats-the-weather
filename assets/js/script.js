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

// Create a function that pulls the city city list.
function initCityList() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        cityList = storedCities;
    }

    renderCities();
}

// Create a function to pull the current city entered by the user into localStorage
function initWeather() {
        var storedWeather = JSON.parse(localStorage.getItem("currentCity"));

        if (storedWeather !== null) {
            cityname = storedWeather;

            displayWeather();
            displayFiveDayForecast();
        }
}

// Create a function to save the city list into the localStorage
function storeCityArray() {
    localStorage.setItem("cities", JSON.stringify(cityList));
}

// Create a function to save the current city enetered and displaying into localStorage
function storeCurrentCity() {
    localStorage.setItem("currentCity", JSON.stringify(cityname));
}

// Create an event handler for the click on the city search button
$("#citySearchBtn").on("click", function (event){
    event.preventDefault();

    cityname = $("#cityInput").val().trim();
    if (cityname === ""){
        alert("Please enter a city to search for.")
    }else if (citylist.length >= 5){
        cityList.shift();
        cityList.push(cityname);

    }else{
        cityList.push(cityname);
    }
    storeCurrentCity();
    storeCityArray();
    renderCities();
    displayWeather();
    displayFiveDayForecast();
});