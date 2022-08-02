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

    for(i=0; i<cityList.length; i++){
        var a = $("<a>");
        a.addClass("list-group-item list-group-item-action list-group-item-primary city");
        a.attr("data-name", cityList[i]);
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
    }else if (cityList.length >= 5){
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

// Create an event handler for after the user clicks the search input
$("#cityInput").keypress(function(e){
    if(e.which == 13){
        $("#citySearchBtn").click();
    }
})

// Create a function that pulls the current cityList, weather and fivedayforecast frrom the Open Weather API
async function displayWeather() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=d3b85d453bf90d469c82e650a0a3da26";
    var response = await $.ajax({
        url: queryURL,
        method: "GET"
      })
        console.log(response);
        var currentWeatherDiv = $("<div class='card-body' id='currentWeather'>");
        var getCurrentCity = response.name;
        var date = new Date();
        var val=(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
        var getCurrentWeatherIcon = response.weather[0].icon;
        var displayCurrentWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + getCurrentWeatherIcon + "@2x.png />");
        var currentCityEl = $("<h3 class = 'card-body'>").text(getCurrentCity+" ("+val+")");
        currentCityEl.append(displayCurrentWeatherIcon);
        currentWeatherDiv.append(currentCityEl);
        var getTemp = response.main.temp.toFixed(1);
        var tempEl = $("<p class='card-text'>").text("Temperature: "+getTemp+"° F");
        currentWeatherDiv.append(tempEl);
        var getHumidity = response.main.humidity;
        var humidityEl = $("<p class='card-text'>").text("Humidity: "+getHumidity+"%");
        currentWeatherDiv.append(humidityEl);
        var getWindSpeed = response.wind.speed.toFixed(1);
        var windSpeedEl = $("<p class='card-text'>").text("Wind Speed: "+getWindSpeed+" mph");
        currentWeatherDiv.append(windSpeedEl);
        var getLong = response.coord.lon;
        var getLat = response.coord.lat;
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=d3b85d453bf90d469c82e650a0a3da26&lat="+getLat+"&lon="+getLong;
        var uvResponse = await $.ajax({
            url: uvURL,
            method: "GET"
        })
        var getUVIndex = uvResponse.value;
        var uvNumber = $("<span>");
        if (getUVIndex > 0 && getUVIndex <= 2.99){
            uvNumber.addClass("low");
        }else if(getUVIndex >= 3 && getUVIndex <= 5.99){
            uvNumber.addClass("moderate");
        }else if(getUVIndex >= 6 && getUVIndex <= 7.99){
            uvNumber.addClass("high");
        }else if(getUVIndex >= 8 && getUVIndex <= 10.99){
            uvNumber.addClass("vhigh");
        }else{
            uvNumber.addClass("extreme");
        } 
        uvNumber.text(getUVIndex);
        var uvIndexEl = $("<p class='card-text'>").text("UV Index: ");
        uvNumber.appendTo(uvIndexEl);
        currentWeatherDiv.append(uvIndexEl);
        $("#weatherContainer").html(currentWeatherDiv);
}

async function displayFiveDayForecast() {
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&units=imperial&appid=d3b85d453bf90d469c82e650a0a3da26";
var response = await $.ajax({
    url: queryURL,
    method: "GET"
  })
  var forecastDiv = $("<div  id='fiveDayForecast'>");
  var forecastHeader = $("<h5 class='card-header border-secondary'>").text("5 Day Forecast");
  forecastDiv.append(forecastHeader);
  var cardDeck = $("<div  class='card-deck'>");
  forecastDiv.append(cardDeck);
  
  console.log(response);
  for (i=0; i<5;i++){
      var forecastCard = $("<div class='card mb-3 mt-3'>");
      var cardBody = $("<div class='card-body'>");
      var date = new Date();
      var val=(date.getMonth()+1)+"/"+(date.getDate()+i+1)+"/"+date.getFullYear();
      var forecastDate = $("<h5 class='card-title'>").text(val);
      
    cardBody.append(forecastDate);
    var getCurrentWeatherIcon = response.list[i].weather[0].icon;
    console.log(getCurrentWeatherIcon);
    var displayWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + getCurrentWeatherIcon + ".png />");
    cardBody.append(displayWeatherIcon);
    var getTemp = response.list[i].main.temp;
    var tempEl = $("<p class='card-text'>").text("Temp: "+getTemp+"° F");
    cardBody.append(tempEl);
    var getHumidity = response.list[i].main.humidity;
    var humidityEl = $("<p class='card-text'>").text("Humidity: "+getHumidity+"%");
    cardBody.append(humidityEl);
    forecastCard.append(cardBody);
    cardDeck.append(forecastCard);
  }
  $("#forecastContainer").html(forecastDiv);
}
function historyDisplayWeather(){
    cityname = $(this).attr("data-name");
    displayWeather();
    displayFiveDayForecast();
    console.log(cityname);
    
}

$(document).on("click", ".city", historyDisplayWeather);