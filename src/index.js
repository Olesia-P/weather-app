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
  document.querySelector("#current-temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
}

function searchCity (city) {
  let apiKey = "894a2e7aa7f46eeca5d8778f6faa5a5b";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  let apiKey = "894a2e7aa7f46eeca5d8778f6faa5a5b";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function getCurrentLocation (event) {
navigator.geolocation.getCurrentPosition(searchLocation);
}

let now = new Date();
showDate(now);
showCurrentTime(now);

searchCity("Kyiv");

document.querySelector("#form").addEventListener("submit", handleSubmit);
document.querySelector("#current-button").addEventListener("click", getCurrentLocation);
