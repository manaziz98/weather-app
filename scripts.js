const cityName = document.getElementById("city-output");
const weatherTypeElem = document.getElementById("weather");
const tempElem = document.getElementById("temp");
const tempMinElem = document.getElementById("min-temp");
const tempMaxElem = document.getElementById("max-temp");
const searchBtn = document.querySelector("#search-btn");
const searchForm = document.querySelector(".search-form");

/* searching dependetly on user's input */
const searchUserInput = (e) => {
  e.preventDefault();
  const inputElem = document.getElementById("city-input");
  const inputValue = inputElem.value;
  // fecthing data from api
  fetchWheatherData(inputValue);
  inputElem.value = "";
};

/* listen to submit */
searchForm.addEventListener("submit", searchUserInput);

/* handling weather data */
const handleWeatherData = (weatherData) => {
  const fahrenheitClasses = fahrenheit.className;
  const weatherType = weatherData.weather[0].main;
  cityName.innerHTML = weatherData.name;
  weatherTypeElem.innerHTML = weatherData.weather[0].main;
  // formule for celsius and  for fahrenheit
  const convertToCelsius = (num) => ((num - 32) * 5) / 9;
  const convertTofahrenheit = (num) => num;

  celsius.addEventListener("click", () => {
    showResult(weatherData.main, convertToCelsius);
  });
  fahrenheit.addEventListener("click", () => {
    showResult(weatherData.main, convertTofahrenheit);
  });
  // showing results depending on fahrenheit or Celsius
  const formule = fahrenheitClasses.includes("active")
    ? convertTofahrenheit
    : convertToCelsius;
  showResult(weatherData.main, formule);
  // speak && say the weather type
  speak(cityName.innerText, weatherType);
};

/* show result */
const showResult = ({ temp, temp_min, temp_max }, formule) => {
  tempElem.innerHTML = Math.round(formule(temp));
  tempMinElem.innerHTML = Math.round(formule(temp_min));
  tempMaxElem.innerHTML = Math.round(formule(temp_max));
};

const speakObj = {
  Clouds: "cloudy",
  Fog: "foggy",
  Rain: "rainy",
  Clear: "clear",
  Drizzle: "drizzling",
  Snow: "snowy",
};

const speak = (cityName, weatherType) => {
  const speaking = window.speechSynthesis;
  //choose  text to say
  const howToSpeak = new SpeechSynthesisUtterance(
    `it's  ${speakObj[weatherType]}, in ${cityName}`
  );
  // choose language
  howToSpeak.lang = "en-US";
  //now speak in that specific way
  speaking.speak(howToSpeak);
};

const showError = () => {
  cityName.innerText = "Invalid city name";
  weatherTypeElem.innerText = "---";
  tempMinElem.innerText = "--";
  tempElem.innerText = "--";
  tempMaxElem.innerText = "--";
};
