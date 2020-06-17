/* fetching weather data from api */
const API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";
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
