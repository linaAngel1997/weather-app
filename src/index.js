let dayTime = document.querySelector(".day-time");
let searchForm = document.querySelector(".search-form");
let searchInput = document.querySelector("input#search");
let cityName = document.querySelector("h1");
let celsius = document.querySelector("button#celsius");
let farenheit = document.querySelector("button#farenheit");
let bigTemp = document.querySelector(".big-temp");
let weatherType = document.querySelector(".weather-type");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let weatherLogo = document.querySelector(".weather-logo");
let currentBtn = document.querySelector(".current");
let degrees = document.querySelector(".degrees");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let now = new Date();
let apiKey = "5e3e45785dddb62309fa6130cbdb7674";

dayTime.innerHTML = `${days[now.getDay()]} ${now.getHours()}:${
  (now.getMinutes() < 10 ? "0" : "") + now.getMinutes()
}`;

function setWeather(res) {
  cityName.innerHTML = res.name;
  bigTemp.innerHTML = `${Math.ceil(res.main.temp)}`;
  weatherType.innerHTML = res.weather[0].main;
  humidity.innerHTML = res.main.humidity;
  wind.innerHTML = res.wind.speed;
  weatherLogo.src = `http://openweathermap.org/img/w/${res.weather[0].icon}.png`;
}

currentBtn.addEventListener("click", getCurrentWeather);

function getCurrentWeather() {
  navigator.geolocation.getCurrentPosition(setWeatherByPosition);
}

function setWeatherByPosition(position) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
  ).then((response) =>
    response.json().then((res) => {
      setWeather(res);
    })
  );
}

searchForm.addEventListener("submit", showData);

function showData(e) {
  e.preventDefault();
  if (searchInput.value === "") {
    alert("Good try, but you need to enter something");
    return;
  }
  if (!isNaN(Number(searchInput.value))) {
    alert("Number as a city, are you serious?");
    return;
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`
  ).then((response) =>
    response.json().then((res) => {
      setWeather(res);
    })
  );
}

farenheit.addEventListener("click", changeToFarenheit);
function changeToFarenheit() {
  farenheit.disabled = true;
  celsius.disabled = false;
  let temperature = Math.round(Number(bigTemp.innerHTML) * (9 / 5) + 32);
  degrees.innerHTML = "°F";
  bigTemp.innerHTML = temperature;
}

celsius.addEventListener("click", changeToCelsius);

function changeToCelsius() {
  celsius.disabled = true;
  farenheit.disabled = false;
  let temperature = Math.round(((Number(bigTemp.innerHTML) - 32) * 5) / 9);
  degrees.innerHTML = "°C";
  bigTemp.innerHTML = temperature;
}
