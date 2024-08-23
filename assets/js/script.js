document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "a83e2b8fb0083fb31e9c784032086c65";
    const search_btn = document.getElementById("search_btn");
    const search_input = document.getElementById("search_input");
    const current_city = document.getElementById("current_city");
    const current_temp = document.getElementById("current_temp");
    const current_wind = document.getElementById("current_wind");
    const current_humidity = document.getElementById("current_humidity");
    const weather_cards = document.getElementById("weather_cards");
    const history_list = document.getElementById("history_list");
    const savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];

    // Function to fetch current weather data
    async function getCurrentWeatherByCoords(lat, lon) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
            const data = await response.json();
            // Process the data and display the current weather
            console.log(data);
            return data;
        } catch (error) {
            console.error("Error fetching current weather:", error);
        }
    }

    // Function to fetch five day forecast data
    async function getFiveDayForecastByCoords(lat, lon) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&days=5`);
            const data = await response.json();
            // Process the data and display the five day forecast
            console.log(data);
            return data;
        } catch (error) {
            console.error("Error fetching five day forecast:", error);
        }
    }

    // Function to display current weather data on the webpage
    function displayCurrentWeather(data) {
        current_city.textContent = data.name;
        current_temp.textContent = `Temperature: ${data.main.temp}°F`;
        current_wind.textContent = `Wind: ${data.wind.speed} MPH`;
        current_humidity.textContent = `Humidity: ${data.main.humidity}%`;
    }

    // Function to display five day forecast data on the webpage
    function displayFiveDayForecast(data) {
        weather_cards.innerHTML = ""; // Clear previous forecast cards
        data.list.forEach(day => {
            if (day.dt_txt.includes("12:00:00")) {
                const forecastCard = document.createElement("li");
                forecastCard.classList.add("card");
                forecastCard.innerHTML = `
                <h3>${day.dt_txt}</h3>
                <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="Weather Icon">
                <h6>Temp: ${day.main.temp}°F</h6>
                <h6>Wind: ${day.wind.speed} MPH</h6>
                <h6>Humidity: ${day.main.humidity}%</h6>
            `;
                weather_cards.appendChild(forecastCard);
            }
        });
    }
    function createSearchButton(cities) {
        history_list.innerHTML = ""; // Clear previous forecast cards
        cities.forEach(city => {
            
                const cityBtn = document.createElement("button");
                cityBtn.textContent = city
                cityBtn.addEventListener("click",(event) => {
                    const cityName = event.target.textContent;
                    search_input.value = cityName;
                    search_btn.click();

                });
                history_list.appendChild(cityBtn);
        });
    }

    // Event listener for the search button
    search_btn.addEventListener("click", () => {
        const city = search_input.value;
        if (savedCities.includes(city)) {
            console.log("City already saved in history.");
            
        } else {
            savedCities.push(city);
            localStorage.setItem("savedCities", JSON.stringify(savedCities));
            createSearchButton(savedCities);
        }
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`)
            .then(response => response.json())
            .then(data => {
                displayCurrentWeather(data);
                return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`);
            })
            .then(response => response.json())
            .then(data => displayFiveDayForecast(data));
    });
    createSearchButton(savedCities);
});
    
// Check if there is stored weather data in localStorage and display it
const storedCurrentWeather = JSON.parse(localStorage.getItem("currentWeather"));
const storedFiveDayForecast = JSON.parse(localStorage.getItem("fiveDayForecast"));
if (storedCurrentWeather) {
    displayCurrentWeather(storedCurrentWeather);
}
if (storedFiveDayForecast) {
    displayFiveDayForecast(storedFiveDayForecast);
}


