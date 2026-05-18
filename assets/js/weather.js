//~ Standard Variables
const lat = 39.152;
const lon = -96.636;
const apiUrl =
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
  `&current=temperature_2m,wind_speed_10m,weather_code,is_day` +
  `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
  `&temperature_unit=fahrenheit&wind_speed_unit=mph` +
  `&timezone=America%2FChicago&forecast_days=4`;

// Days of the week
const days = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thurs",
  "Fri",
  "Sat",
];

var weatherData;

//~ Fetch Open-Meteo API
async function getWeather() {
  await fetch(apiUrl, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const [year, month, day] = data.current.time.split("T")[0].split("-");
      console.log(
        `%c${days[new Date(year, month - 1, day).getDay()]}`,
        "color:green"
      );
      weatherData = data;
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//~ Begin DOM manipulation - fired when fetch to API is finished
async function populateDOM() {
  await getWeather();

  //~ grab all DOM elements
  // today
  const weatherIcon = document.getElementsByClassName("icon-img")[0];
  const theTemp = document.getElementsByClassName("the-temp")[0];
  const weather = document.getElementsByClassName("what-weather")[0];
  const windSpeed = document.getElementsByClassName("wind")[0];

  // tomorrow
  const tomorrowDay = document.getElementsByClassName("tomorrow")[0];
  const tomorrowWeatherIcon =
    document.getElementsByClassName("tomorrow-icon")[0];
  const tomorrowHi = document
    .getElementsByClassName("future-row-1")[0]
    .getElementsByClassName("hi")[0];
  const tomorrowLo = document
    .getElementsByClassName("future-row-1")[0]
    .getElementsByClassName("lo")[0];

  // day after tomorrow
  const dayAfterTomorrowDay =
    document.getElementsByClassName("day-after-tomorrow")[0];
  const dayAfterTomorrowIcon = document.getElementsByClassName(
    "day-after-tomorrow-icon"
  )[0];
  const dayAfterTomorrowHi = document
    .getElementsByClassName("future-row-2")[0]
    .getElementsByClassName("hi")[0];
  const dayAfterTomorrowLo = document
    .getElementsByClassName("future-row-2")[0]
    .getElementsByClassName("lo")[0];

  // three days from today
  const threeDaysFromTodayDay = document.getElementsByClassName(
    "three-days-from-today"
  )[0];
  const threeDaysFromTodayIcon = document.getElementsByClassName(
    "three-days-from-today-icon"
  )[0];
  const threeDaysFromTodayHi = document
    .getElementsByClassName("future-row-3")[0]
    .getElementsByClassName("hi")[0];
  const threeDaysFromTodayLo = document
    .getElementsByClassName("future-row-3")[0]
    .getElementsByClassName("lo")[0];

  //~ Set Today's Weather
  const current = weatherData.current;
  const isDay = current.is_day === 1;
  weatherIcon.src = `./assets/images/icons/${assignIcon(current.weather_code, isDay)}.png`;
  theTemp.innerHTML = Math.ceil(current.temperature_2m);
  weather.innerHTML = weatherCodeToSummary(current.weather_code);
  windSpeed.innerHTML = Math.ceil(current.wind_speed_10m);

  //~ Set future days
  const setFutureDay = (index, dayEl, iconEl, hiEl, loEl) => {
    const [y, m, d] = weatherData.daily.time[index].split("-");
    dayEl.innerHTML = days[new Date(y, m - 1, d).getDay()];
    iconEl.src = `./assets/images/icons/${assignIcon(weatherData.daily.weather_code[index], true)}.svg`;
    hiEl.innerHTML = Math.ceil(weatherData.daily.temperature_2m_max[index]);
    loEl.innerHTML = Math.ceil(weatherData.daily.temperature_2m_min[index]);
  };

  setFutureDay(1, tomorrowDay, tomorrowWeatherIcon, tomorrowHi, tomorrowLo);
  setFutureDay(2, dayAfterTomorrowDay, dayAfterTomorrowIcon, dayAfterTomorrowHi, dayAfterTomorrowLo);
  setFutureDay(3, threeDaysFromTodayDay, threeDaysFromTodayIcon, threeDaysFromTodayHi, threeDaysFromTodayLo);
}

getWeather();
populateDOM();

// Maps WMO weather codes to local icon filenames
const assignIcon = function (code, isDay = true) {
  if (code === 0) {
    return "sun";
  } else if (code <= 2) {
    return "part-cloud";
  } else if (code === 3) {
    return "cloudy";
  } else if (code === 45 || code === 48) {
    return "foggy";
  } else if (code >= 51 && code <= 67) {
    return "rain";
  } else if (code >= 71 && code <= 77) {
    return "snow";
  } else if (code >= 80 && code <= 82) {
    return "rain";
  } else if (code >= 85 && code <= 86) {
    return "snow";
  } else if (code >= 95) {
    return "rain";
  }
  return "part-cloud";
};

// Maps WMO weather codes to human-readable summaries
const weatherCodeToSummary = function (code) {
  if (code === 0) return "Clear";
  if (code === 1) return "Mostly Clear";
  if (code === 2) return "Partly Cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 55) return "Drizzle";
  if (code >= 56 && code <= 57) return "Freezing Drizzle";
  if (code >= 61 && code <= 65) return "Rain";
  if (code >= 66 && code <= 67) return "Freezing Rain";
  if (code >= 71 && code <= 75) return "Snow";
  if (code === 77) return "Snow Grains";
  if (code >= 80 && code <= 82) return "Rain Showers";
  if (code >= 85 && code <= 86) return "Snow Showers";
  if (code === 95) return "Thunderstorm";
  if (code >= 96) return "Thunderstorm w/ Hail";
  return "Unknown";
};
