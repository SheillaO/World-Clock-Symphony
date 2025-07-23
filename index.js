// -------------------------
// 🕒 Time + Weather Logic
// -------------------------

function updateTime() {
  let nairobiElement = document.querySelector("#nairobi");
  if (nairobiElement) {
    let nairobiDateElement = nairobiElement.querySelector(".date");
    let nairobiTimeElement = nairobiElement.querySelector(".time");
    let nairobiTime = moment().tz("Africa/Nairobi");

    if (nairobiDateElement) {
      nairobiDateElement.innerHTML = nairobiTime.format("dddd, MMMM Do YYYY");
    }
    if (nairobiTimeElement) {
      nairobiTimeElement.innerHTML =
        nairobiTime.format("h:mm:ss") +
        " <small>" +
        nairobiTime.format("A") +
        "</small>";
    }
  }

  let berlinElement = document.querySelector("#berlin");
  if (berlinElement) {
    let berlinDateElement = berlinElement.querySelector(".date");
    let berlinTimeElement = berlinElement.querySelector(".time");
    let berlinTime = moment().tz("Europe/Berlin");

    if (berlinDateElement) {
      berlinDateElement.innerHTML = berlinTime.format("dddd, MMMM Do YYYY");
    }
    if (berlinTimeElement) {
      berlinTimeElement.innerHTML =
        berlinTime.format("h:mm:ss") +
        " <small>" +
        berlinTime.format("A") +
        "</small>";
    }
  }

  let dynamicCities = document.querySelectorAll(
    ".city[id]:not(#nairobi):not(#berlin)"
  );
  dynamicCities.forEach((cityDiv) => {
    let timeZone = cityDiv.id.replace(/-/g, "/");
    let cityTime = moment().tz(timeZone);

    let dateElement = cityDiv.querySelector(".date");
    let timeElement = cityDiv.querySelector(".time");
    if (dateElement) {
      dateElement.innerHTML = cityTime.format("dddd, MMMM Do YYYY");
    }
    if (timeElement) {
      timeElement.innerHTML =
        cityTime.format("h:mm:ss") +
        " <small>" +
        cityTime.format("A") +
        "</small>";
    }
  });
}

updateTime();
setInterval(updateTime, 1000);

// -------------------------
// 📍 Add City Logic
// -------------------------

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }

  let cityId = cityTimeZone.replace(/\//g, "-").replace(/\s+/g, "-");
  if (document.getElementById(cityId)) return;

  let cityNameRaw = event.target.options[event.target.selectedIndex].text;
  const cleanCityName = cityNameRaw.replace(/[^a-zA-Z\s]/g, "").trim();

  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");

  if (citiesElement) {
    const cityDiv = document.createElement("div");
    cityDiv.className = "city";
    cityDiv.id = cityId;

    cityDiv.innerHTML = `
      <div>
        <h2>${cityNameRaw}</h2>
        <div class="date">${cityTime.format("dddd, MMMM Do YYYY")}</div>
      </div>
      <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format(
      "A"
    )}</small></div>
      <div class="weather-info">
        <div class="temperature"></div>
        <div class="humidity"></div>
        <div class="wind-speed"></div>
        <div class="icon"></div>
      </div>
    `;

    citiesElement.appendChild(cityDiv);
    applyDayNightClasses();
    getWeather(cleanCityName || cityNameRaw, cityId);
  }
}

let citiesSelectElement = document.querySelector("#city");
if (citiesSelectElement) {
  citiesSelectElement.addEventListener("change", updateCity);
}

// -------------------------
// 🌦️ Weather API (SheCodes)
// -------------------------

function displayWeather(cityId, response) {
  const cityElement = document.querySelector(`#${cityId}`);
  if (!cityElement) return;

  const tempEl = cityElement.querySelector(".temperature");
  const humidityEl = cityElement.querySelector(".humidity");
  const windEl = cityElement.querySelector(".wind-speed");
  const iconEl = cityElement.querySelector(".icon");

  const temperature = Math.round(response.data.temperature.current);
  const humidity = response.data.temperature.humidity;
  const windSpeed = Math.round(response.data.wind.speed);
  const iconUrl = response.data.condition.icon_url;

  if (tempEl) tempEl.textContent = `🌡️ ${temperature}°C`;
  if (humidityEl) humidityEl.textContent = `💧 ${humidity}%`;
  if (windEl) windEl.textContent = `💨 ${windSpeed} km/h`;
  if (iconEl) iconEl.innerHTML = `<img src="${iconUrl}" alt="Weather icon" />`;
}

function getWeather(cityName, cityId) {
  const apiKey = "7601b0fff0179o9d5059a8db34ctbc66";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then((response) => displayWeather(cityId, response))
    .catch((error) => {
      console.warn(`Weather data not found for ${cityName}:`, error);
    });
}

getWeather("Nairobi", "nairobi");
getWeather("Berlin", "berlin");

// -------------------------
// 🌗 Auto Day/Night Class for Cards
// -------------------------

function getTimezoneFromCityId(cityId) {
  return cityId.replace(/-/g, "/");
}

function applyDayNightClasses() {
  const cityElements = document.querySelectorAll(".city");

  cityElements.forEach((cityElement) => {
    const cityId = cityElement.id;
    const cityTimezone = getTimezoneFromCityId(cityId);
    const time = moment().tz(cityTimezone);
    const hour = time.hour();

    cityElement.classList.remove("day", "night");

    if (hour >= 6 && hour < 18) {
      cityElement.classList.add("day");
    } else {
      cityElement.classList.add("night");
    }
  });
}

applyDayNightClasses();
setInterval(applyDayNightClasses, 5 * 60 * 1000);

// -------------------------
// 🎨 Theme Toggle Logic (No Conflict)
// -------------------------

let manualTheme = false;

function updateThemeBasedOnTime() {
  if (manualTheme) return;

  const hour = moment().hour();
  const body = document.body;

  body.classList.remove("day-mode", "night-mode");

  if (hour >= 6 && hour < 18) {
    body.classList.add("day-mode");
  } else {
    body.classList.add("night-mode");
  }
}

updateThemeBasedOnTime();
setInterval(updateThemeBasedOnTime, 60 * 1000);

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector("#theme-toggle");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      manualTheme = true;

      const body = document.body;

      if (body.classList.contains("day-mode")) {
        body.classList.remove("day-mode");
        body.classList.add("night-mode");
      } else {
        body.classList.remove("night-mode");
        body.classList.add("day-mode");
      }
    });
  }
});
