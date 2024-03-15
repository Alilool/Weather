// API key for accessing OpenWeatherMap API
const apiKey = '5b745bdd3ce93a8ba80c74997eec3db1';

// URL for OpenWeatherMap API
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// DOM elements
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById("humidity");
const speedElement = document.getElementById("speed");
const icon = document.getElementById("icon");
const my_locationElement = document.getElementById('my_location');
const my_temperatureElement = document.getElementById('my_temperature');
const my_descriptionElement = document.getElementById('my_description');
const my_humidityElement = document.getElementById("my_humidity");
const my_speedElement = document.getElementById("my_speed");
const my_icon = document.getElementById("my_icon");
const flag = document.getElementById("flag");

// Event listener for search button
searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to fetch weather data from OpenWeatherMap API
function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Update DOM elements with weather data
            icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            locationElement.textContent = data.name;
            temperatureElement.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = capitalizeFirstLetter(data.weather[0].description);
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            speedElement.textContent = `Wind Speed: ${data.wind.speed} Meter/sec`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Function to fetch weather data for user's location
function my_fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Update DOM elements with weather data
            my_icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            my_locationElement.innerHTML = data.name;
            my_temperatureElement.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
            my_descriptionElement.textContent = capitalizeFirstLetter(data.weather[0].description);
            my_humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            my_speedElement.textContent = `Wind Speed: ${data.wind.speed} Meter/sec`;

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // API key for accessing IP Geolocation API
    const apiKey2 = "4e8ed8f4419a45a48e2af40db138f2b4";

    if (navigator.geolocation) {
        // Get the user's current position
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        console.error('Geolocation is not supported by this browser.');
    }

    // Success callback for getting user's location
    function successCallback(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Call a reverse geocoding API to get the city name
        getCityNameFromCoordinates(latitude, longitude);
    }

    // Error callback for getting user's location
    function errorCallback(error) {
        console.error('Error getting location:', error.message);
    }

    // Function to get city name from coordinates using IP Geolocation API
    function getCityNameFromCoordinates(latitude, longitude) {
        // API endpoint for IP Geolocation API
        const apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey2}&lat=${latitude}&long=${longitude}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Extract city name and fetch weather data for that location
                const cityName = data.city || 'Unknown City';
                my_fetchWeather(cityName);
                flag.src = data.country_flag
            })
            .catch(error => {
                console.error('Error fetching city name:', error);
            });
    }
});
