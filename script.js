// constant variables
var cityFormEl = document.querySelector("#city-form");
var apikey = "66362f6b0e9db023ad53305c124d1c5c";
var cityOutput = [];
var cityInpEL = document.querySelector("#city");
var citySearch = document.querySelector("#city_search");
var cityLiEl = document.querySelector("#city-li");
var cityFormEl = document.querySelector("#city-form");
var weatherContEl = document.querySelector("#weather-cont");
var forecastContEl = document.querySelector("#forecast-cont");
var citySearch;
var uvIndexEL;
var currentWeatherEL;
var currentCity;
var forecastContEl = document.querySelector("#forecast-cont");
var formSubmitHandler = function(event) {
    event.preventDefault();

// displays city name
    var city = cityInpEL.value.trim();
    citySearch = cityInpEL.value.trim();

    if (city) {
        getLatLon(city);
        cityOutput.unshift(city);
        cityInpEL.value = "";
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
                alert('Error:' + response.statusText);
                
            }
        }).catch(function(error) {
            alert('Unable to data');
        });
};


var displayWeather = function(weeklyForecast) {
    var forecastDate;
    // checks to see if the object is empty 
    if (weeklyForecast.length === 0) {
        alert("no forecast info found");
        return;
    }
    // resets(clears) display
    if (currentWeatherEL) {
        weatherContEl.removeChild(currentWeatherEL);
        forecastContEl.innerHTML = "";
    }
    forecastDate = currentForecast.dt;
    var formatDate = new Date(forecastDate * 1000).toLocaleDateString("en-US");
    //creation of elements for current weather info
    currentWeatherEL = document.createElement('ul');
    currentWeatherEL.classLi = 'collection with-header';
    var currentCity = document.createElement('li');
    currentCity.innerHTML = '<li><h2 class="subtitle"><span id="city-search">' + currentCity + ' ' + formatDate + '</span></h2></li>'
    var currentTemp = document.createElement('li');
    currentTemp.innerHTML = 'Temp: ' + currentForecast.temp;
    var currentWind = document.createElement('li');
    currentWind.innerHTML = 'Wind: ' + currentForecast.wind_speed;
    var currentHum = document.createElement('li');
    currentHum.innerHTML = 'Humidity: ' + currentForecast.humidity;
    var currentUv = document.createElement('li');
    currentUv.innerHTML = 'UVI: <span id="uv">' + weeklyForecast[0].uvi + '</span>';

    // Created a loop to pull the forecast no more than 5 days form now
    for (let i = 0; i < 5; i++) {
        // Gets date format
        forecastDate = weeklyForecast[i].dt;
        var weatherObj = weeklyForecast[i].weather[0]
        var icon = weatherObj.icon;
        var iconUrl = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
        // changes date format
        formatDate = new Date(forecastDate * 1000).toLocaleDateString("en-US");
        //pulls of 5 day forecast
        var forecastCol = document.createElement('div');
        forecastCol.classLi = 'card ';
        var forecastCard = document.createElement('div');
        forecastCard.classLi = 'card';
        var forecastContent = document.createElement('div');
        forecastContent.classLi = 'card'
        var forecastDate = document.createElement('p');
        forecastDate.innerHTML = formatDate;
        var forecastIcon = document.createElement('p');
        forecastIcon.innerHTML = '<img src=' + iconUrl + '>';
        var forecastTemp = document.createElement('p');
        forecastTemp.innerHTML = 'Temp: ' + weeklyForecast[i].temp.day + ' °F';
        var forecastWind = document.createElement('p');
        forecastWind.innerHTML = 'Wind: ' + weeklyForecast[i].wind_speed + ' MPH';
        var forecastHum = document.createElement('p');
        forecastHum.innerHTML = 'Humidity: ' + weeklyForecast[i].humidity + ' %';
        //appends all into cards
        forecastContent.appendChild(forecastDate);
        forecastContent.appendChild(forecastIcon);
        forecastContent.appendChild(forecastTemp);
        forecastContent.appendChild(forecastWind);
        forecastContent.appendChild(forecastHum);

        forecastCard.appendChild(forecastContent)

        forecastCol.appendChild(forecastCard);
        // appends all 
        forecastContEl.appendChild(forecastCol);

    }

    // appending all current weather info to a list 
    currentWeatherEL.appendChild(currentCity);
    currentWeatherEL.appendChild(currentTemp);
    currentWeatherEL.appendChild(currentWind);
    currentWeatherEL.appendChild(currentHum);
    currentWeatherEL.appendChild(currentUv);

    // appends to the weather container list
    weatherContEl.appendChild(currentWeatherEL);
    uvCheck(weeklyForecast[0].uvi);

};


function uvCheck(uv) {
    uvIndexEL = document.querySelector('#uv')
    if (uv < 3) {
        uvIndexEL.setAttribute("class", "uv-fav");
    } else if (uv > 4 && uv < 6) {
        uvIndexEL.setAttribute("class", "uv-mod");
    } else {
        uvIndexEL.setAttribute("class", "uv-sev");
    }
}

cityFormEl.addEventListener('submit', formSubmitHandler);

