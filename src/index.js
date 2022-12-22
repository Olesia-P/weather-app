
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
  C.classList.add("clickedUnits");
  F.classList.remove("clickedUnits");
}

function showFUnits (event) {
  event.preventDefault();
  let FUnits = CUnits * (9/5) + 32;
  document.querySelector("#current-temp").innerHTML = Math.round(FUnits);
  F.classList.add("clickedUnits");
  C.classList.remove("clickedUnits");
}

function showAdvice (weather) {
  let conditions = [ "clear", "clouds", "rain", "thunderstorm", "snow", "mist"];
  let advice = document.querySelector("#advice");
  if (weather.search(conditions[0])>-1) {
    advice.innerHTML = "Don't forget to put the sunscreen!";
  }
  if (weather.search(conditions[1])>-1) {
    advice.innerHTML = "Don't be sad about the clouds :)";
  }
  if (weather.search(conditions[2])>-1 || weather.search(conditions[3])>-1) {
    advice.innerHTML = "Don't forget to take an umbrella!";
  }
  if (weather.search(conditions[4])>-1) {
    advice.innerHTML = "Be careful, the roads might be icy!";
  }
  if (weather.search(conditions[5])>-1) {
    advice.innerHTML = "Put on some extra clothes, it might feel chilly.";
  }
  }

  function getForecastDay (timestamp) {
    let time = [timestamp[1].time * 1000, timestamp[2].time * 1000, timestamp[3].time * 1000, timestamp[4].time * 1000, timestamp[5].time * 1000];
    let weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
    ];
    document.querySelector("#predictionWeekDay1").innerHTML = weekDays[new Date(time[0]).getDay()];
    document.querySelector("#predictionWeekDay2").innerHTML = weekDays[new Date(time[1]).getDay()];
    document.querySelector("#predictionWeekDay3").innerHTML = weekDays[new Date(time[2]).getDay()];
    document.querySelector("#predictionWeekDay4").innerHTML = weekDays[new Date(time[3]).getDay()];
    document.querySelector("#predictionWeekDay5").innerHTML = weekDays[new Date(time[4]).getDay()];
  }

  function showForecast (response) {
    console.log(response.data);
    getForecastDay(response.data.daily);
    getForecast
    
    
  
    
    
    
  
   
  }
  
  function getForecast(coordinates) {
    let apiKey = "f34eafbe5b20fo4443a0a3et0b481f5f";
    forecastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
    axios.get(forecastUrl).then(showForecast);
  
  }

function showWeather(response) {
  //console.log(response.data);
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
  let description = response.data.condition.description;
  showAdvice(description);
  getForecast (response.data.coordinates);
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

let F = document.querySelector("#F");
F.addEventListener("click", showFUnits);
F.classList.remove("clickedUnits");

let C = document.querySelector("#C");
C.addEventListener("click", showCUnits);

document.querySelector("#form").addEventListener("submit", handleSubmit);
document.querySelector("#current-button").addEventListener("click", getCurrentLocation);



searchCity("Paris");





