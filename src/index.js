
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

function showWeather(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(response.data.temperature.current);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML = response.data.condition.description;
  formatDate(response.data.time * 1000)
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



searchCity("Paris");

document.querySelector("#form").addEventListener("submit", handleSubmit);
document.querySelector("#current-button").addEventListener("click", getCurrentLocation);
