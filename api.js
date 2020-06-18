/* fetching weather data from api */
const API_KEY = "xxxxxxxxxxxxxxxxxxxxxx";
const fetchWheatherData = (cityName) => {
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;

  fetch(BASE_URL)
    .then((response) => {
      return response.json();
    })
    .then((weatherData) => {
      handleWeatherData(weatherData);
    })
    .catch(() => showError());
};
