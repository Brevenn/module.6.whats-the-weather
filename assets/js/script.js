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
var APIkey = "";

// Create a data array for cities
var cityList = [];

// display current date
var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")");

// display search history
initializeHistory();
showClear();


$(document).on("submit", function(){
    event.preventDefault();

    var searchValue = searchCityInput.val().trim();

    currentConditionsRequest(searchValue);
    searchHistory(searchValue);
    searchCityInput.val("");
});

searchCityButton.on("click", function(event) {
    event.preventDefault();

    var searchValue = searchCityInput.val().trim();

    currentConditionsRequest(searchValue);
    searchHistory(searchValue);
    searchCityInput.val("");
});

clearHistoryButton.on("click", function() {

    cityList = [];

    listArray();

    $(this).addClass("hide");
});