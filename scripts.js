window.onload = () => {
  let searchBtn = document.querySelector("#search-btn");
  let userInput = "";
  searchBtn.addEventListener("click", () => {
    /* getting user's input */
    userInput = getUserInput();
    /* fecthing data from api */
    fetchWheatherData(userInput);
  });

  console.log(fahrenheit, celsius);
  window.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      userInput = getUserInput();
      fetchWheatherData(userInput);
    }
  });
};

let getUserInput = () => {
  let input = document.getElementById("city-input");
  return input.value;
};

/* showing data on the page */

let showWeather = (weatherData) => {
  let cityName = document.getElementById("city-output");
  let weatherTypeElem = document.getElementById("weather");
  let tempElem = document.getElementById("temp");
  let tempMinElem = document.getElementById("min-temp");
  let tempMaxElem = document.getElementById("max-temp");

  cityName.innerHTML = weatherData.name;
  let allTemp = weatherData.main;
  let weatherType = weatherData.weather[0].main;
  weatherTypeElem.innerHTML = weatherType;

  celsius.addEventListener("click", function () {
    console.log(tempElem, tempMaxElem, tempMinElem, allTemp);
    let formule = (num) => ((num - 32) * 5) / 9;
    outputResult(tempElem, tempMaxElem, tempMinElem, allTemp, formule);
  });

  fahrenheit.addEventListener("click", function () {
    console.log(tempElem, tempMaxElem, tempMinElem, allTemp);
    let formule = (num) => num;
    outputResult(tempElem, tempMaxElem, tempMinElem, allTemp, formule);
  });

  let fahrenheitClasses = fahrenheit.className;
  let formule = () => {};
  if (fahrenheitClasses.includes("active")) {
    formule = (num) => {
      return num;
    };
  } else {
    formule = (num) => {
      return ((num - 32) * 5) / 9;
    };
  }
  outputResult(tempElem, tempMaxElem, tempMinElem, allTemp, formule);

  changeBackground(weatherType);
  //make this function change the background based on weatherType
  speak(cityName.innerText, weatherType);
};

let outputResult = (tempElem, tempMaxElem, tempMinElem, allTemp, formule) => {
  tempElem.innerHTML = Math.round(formule(allTemp.temp));
  tempMinElem.innerHTML = Math.round(formule(allTemp.temp_min));
  tempMaxElem.innerHTML = Math.round(formule(allTemp.temp_max));
};

let fetchWheatherData = (cityName) => {
  const API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";
  console.log(cityName);
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;
  fetch(BASE_URL)
    .then((response) => {
      return response.json();
    })
    .then((weatherData) => showWeather(weatherData))
    .catch((error) => showError());
};

let changeBackground = (weatherType) => {
  document.body.style.backgroundImage = `url("../background/${weatherType}.webp")`;
};

let speak = (cityName, weatherType) => {
  console.log(cityName);
  let speaking = window.speechSynthesis;
  //specify language & text to say
  let howToSpeak = new SpeechSynthesisUtterance(
    `it's  ${weatherType}, in ${cityName}`
  );

  howToSpeak.lang = "en-US";

  //getting all the voices available
  let allVoicesAvailable = window.speechSynthesis.getVoices();

  //choose one voice
  // howToSpeak.voice = allVoicesAvailable[1];

  //now speak in that specific way
  speaking.speak(howToSpeak);
};
let showError = () => {
  let cityName = document.getElementById("city-output");
  let weatherTypeElem = document.getElementById("weather");
  let tempElem = document.getElementById("temp");
  let tempMinElem = document.getElementById("min-temp");
  let tempMaxElem = document.getElementById("max-temp");

  cityName.innerText = "Invalid city name";
  weatherTypeElem.innerText = "---";
  tempMinElem.innerText = "--";
  tempElem.innerText = "--";
  tempMaxElem.innerText = "--";
};
