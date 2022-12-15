function showDate(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentWeekDay = weekDays[date.getDay()];
  let pageWeekDay = document.querySelector("#current-week-day");
  pageWeekDay.innerHTML = currentWeekDay;
}

function showCurrentTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let pageCurrentTime = document.querySelector("#current-time");
  pageCurrentTime.innerHTML = ` ${hours}:${minutes}`;
}


function showWeather(response) {
  console.log(response.data);
  document.querySelector("#current-temp").innerHTML = Math.round(response.data.temperature.current);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
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

let now = new Date();
showDate(now);
showCurrentTime(now);

searchCity("Paris");

document.querySelector("#form").addEventListener("submit", handleSubmit);
document.querySelector("#current-button").addEventListener("click", getCurrentLocation);
