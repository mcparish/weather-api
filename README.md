# Weather API

## Introduction
This project is intended to be used for the purposes of generating an application that allows the user to access the weather from the open weather api and can be used to to store weather data including current weather data and a 5 day forecast.  

## Installation
To get started with the Weather API, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/weather-api.git`
2. Obtain an API key from [OpenWeatherMap](https://openweathermap.org/) by creating an account.
3. In the search field type in the city field you would like to view the weather data for and after selecting the city the search history will be stored.  




## API Endpoints
The Weather API provides the following endpoints:

- `GET /weather/:city`: Retrieves the current weather information for the specified city.
- `GET /forecast/:city`: Retrieves the 5-day weather forecast for the specified city.

## Usage    
Here are some example requests that you can make to the Weather API:

- Get the current weather for Denver:
  ```
  GET /weather/Denver
  ```

- Get the 5-day forecast for New York:
  ```
  GET /forecast/New York
  ```

## Response Format
The Weather API returns responses in JSON format. Here is an example response for the `/weather` endpoint:

```json
{
  "city": "Denver",
  "temperature": 15,
  "description": "Cloudy"
}
```
## License
MIT

