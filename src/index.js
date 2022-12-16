
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  let minutes = now.getMinutes();
  document.querySelector("#current-time").innerHTML = ` ${hours}:${minutes}`;
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
    ];
  let currentWeekDay = weekDays[now.getDay()];
  document.querySelector("#current-week-day").innerHTML = currentWeekDay;
}

function showCUnits (event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML = Math.round(CUnits);
}

function showFUnits (event) {
  event.preventDefault();
  let FUnits = CUnits * (9/5) + 32;
  document.querySelector("#current-temp").innerHTML = Math.round(FUnits);
}

function showWeather(response) {
  CUnits = response.data.temperature.current;
  document.querySelector("#current-temp").innerHTML = Math.round(CUnits);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML = response.data.condition.description;
  formatDate(response.data.time * 1000)
  let currentIcon = document.querySelector("#current-icon");
  let icon = response.data.condition.icon;
  currentIcon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`);
  currentIcon.setAttribute("alt", response.data.condition.icon);
}

function searchCity (city) {
  let apiKey = "f34eafbe5b20fo4443a0a3et0b481f5f";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function handleSubmit (event) {
  event.preventDefault();
  let city = document.querySelector("#input").value.toLowerCase();
  searchCity(city);
}

function searchLocation (position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f34eafbe5b20fo4443a0a3et0b481f5f";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function getCurrentLocation (event) {
navigator.geolocation.getCurrentPosition(searchLocation);
}

let CUnits = null;

document.querySelector("#F").addEventListener("click", showFUnits);
document.querySelector("#C").addEventListener("click", showCUnits);

document.querySelector("#form").addEventListener("submit", handleSubmit);
document.querySelector("#current-button").addEventListener("click", getCurrentLocation);

searchCity("Paris");

