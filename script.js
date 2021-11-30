// constant variables
var apikey = "66362f6b0e9db023ad53305c124d1c5c";
//var apiUrl = https://api.openweathermap.org;
var cityOutput = [];
var cityInpEL = document.querySelector("#city");
var citySearch = document.querySelector("#city_search");
var cityLiEl = document.querySelector("#city-li");
var citySearch;
var uvIndexEL;
var currentWeatherEL;
var currentCity;
var weatherContEl = document.querySelector("#weather-cont");
var forecastContEl = document.querySelector("#forecast-cont");
var formSubmitHandler = function(event) {
    event.preventDefault();

// displays city name
    var city = cityInputEl.value.trim();
    citySearch = cityInputEl.value.trim();

    if (city) {
        getLatLon(city);
        cityList.unshift(city);
        storePreviousCity();
        renderPreviousCity();
        cityInpEl.value = "";
    } else {
        alert("Please enter a city name");
    }
};
var getWeather = function(lat, lon) {
    var apiKey = '66362f6b0e9db023ad53305c124d1c5c'
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + apiKey + "&units=imperial";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    currentForecast = data.current;
                    weeklyForecast = data.daily;
                    displayWeather(weeklyForecast);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to database');
        });
};
var getLatLon = function(city) {
    var apiKey = "66362f6b0e9db023ad53305c124d1c5c"
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey + '&units=imperial';

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
               
                response.json().then(function(data) {
                    
                    currentCity = data.city.name
                        
                    getWeather(data.city.coord.lat, data.city.coord.lon);
                });
            } else {
                alert('Error: ' + response.statusText);
                //return lat and lon or should i jsut save the api response as an object and only use the lat lon info?
            }
        }).catch(function(error) {
            alert('Unable to data');
        });
}


    // dom element references





//function currentWeather (city, weather) {
    
    //var temp = weather.temp
    //var wind = weather.windspeed

   
//}