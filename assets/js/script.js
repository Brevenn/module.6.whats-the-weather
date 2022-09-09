// Create Elements that are easy to aceess

var searchHistoryList = $('#search-history-list');
var searchCityInput = $('#search-city');
var searchCityButton = $('#search-city-button');
var clearHistoryButton = $('#clear-history');
var currentCity = $('#current-city');
var currentTemp = $('#current-temp');
var currentHumidity = $('#current-humidity');
var currentWindSpeed = $('#current-wind-speed');
var UVindex = $('#uvindex');
var weatherContent = $('#weather-content');

// Create access to the OpenWeatheAPI with a key
var APIkey = "5be3557ebb9cca30f6bc2a24bf635be6";

// Create a data array for cities
var cityList = [];

// display current date
var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")");

// display search history
initializeHistory();
showClear();

// add a function to submit the city search
$(document).on("submit", function(){
    event.preventDefault();

    var searchValue = searchCityInput.val().trim();

    currentConditionsRequest(searchValue);
    searchHistory(searchValue);
    searchCityInput.val("");
});

// add a click function for the search button
searchCityButton.on("click", function(event) {
    event.preventDefault();

    var searchValue = searchCityInput.val().trim();

    currentConditionsRequest(searchValue);
    searchHistory(searchValue);
    searchCityInput.val("");
});

// add a click function for the clear history buttton
clearHistoryButton.on("click", function() {

    cityList = [];

    listArray();

    $(this).addClass("hide");
});

// create a function to populate the city results from search history into the card container
searchHistoryList.on("click","li.city-btn", function(event){

    var value = $(this).data("value");
    currentConditionsRequest(value);
    searchHistory(value);
});

// request based on user search
function currentConditionsRequest(searchValue) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial&appid=" + APIkey;

    // Create an AJAX call for weather info
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        currentCity.text(response.name);
        currentCity.append("<small class='text-muted' id='current-date'>");
        $("#current-date").text("(" + currentDate + ")");
        currentCity.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='" + response.weather[0].main + "' />")
        currentTemp.text(response.main.temp);
        currentTemp.append("&deg;F");
        currentHumidity.text(response.main.humidity + "%");
        currentWindSpeed.text(response.wind.speed + "MPH");

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var UVurl = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon" + lon + "&appid" + APIkey;

        // create an ajax call for the UV index
        $.ajax({
            url: UVurl,
            method: "GET"
        }).then(function(response){
        
            UVindex.text(response.value);
        });

        var countryCode = response.sys.country;
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=" + APIkey + "&lat" + lat + "&lon=" + lon;

        // create an ajax call for the 5 day reading of the forecast
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            $('#five-day-forecast').empty();
            for (var i = 1; i < response.list.length; i+=8){

                var forecastDateString = moment(response.list[i].dt_txt).format("L");
                console.log(forecastDateString);

                var forecastCol = $("<div class='col-12 col -md-6 col-lg forecast-day mb-3'>");
                var forecastCard = $("<div class='card'>");
                var forecastCardBody = $("<div class='card-body'>");
                var forecastDate = $("<h5 class='card-title'>");
                var forecastIcon = $("<img>");
                var forecastTemp = $("<p class='card-text mb-0'>");
                var forecastHumidity = $("<p class='card-text mb-0'>");
                
            }
        });
};