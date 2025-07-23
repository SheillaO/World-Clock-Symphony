// 🕒 Update time for Nairobi and Berlin
function updateTime() {
  // Nairobi
  const nairobi = document.querySelector("#nairobi");
  if (nairobi) {
    const nairobiDate = nairobi.querySelector(".date");
    const nairobiTime = nairobi.querySelector(".time");
    const time = moment().tz("Africa/Nairobi");

    nairobiDate.innerHTML = time.format("MMMM Do YYYY");
    nairobiTime.innerHTML =
      time.format("h:mm:ss") + ` <small>${time.format("A")}</small>`;
  }

  // Berlin
  const berlin = document.querySelector("#berlin");
  if (berlin) {
    const berlinDate = berlin.querySelector(".date");
    const berlinTime = berlin.querySelector(".time");
    const time = moment().tz("Europe/Berlin");

    berlinDate.innerHTML = time.format("MMMM Do YYYY");
    berlinTime.innerHTML =
      time.format("h:mm:ss") + ` <small>${time.format("A")}</small>`;
  }
}

// ☁️ Fetch weather and update card by elementId
function fetchWeather(cityName, elementId) {
  const apiKey = "7601b0fff0179o9d5059a8db34ctbc66"; // Your SheCodes API key
  const url = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const weatherEl = document.querySelector(`#${elementId} .weather`);
      if (weatherEl && data.condition) {
        weatherEl.innerHTML = `
          <img src="${data.condition.icon_url}" alt="${
          data.condition.description
        }" width="40" />
          ${Math.round(data.temperature.current)}°C — ${
          data.condition.description
        }
        `;
      }
    })
    .catch(() => {
      const weatherEl = document.querySelector(`#${elementId} .weather`);
      if (weatherEl) weatherEl.innerText = "Weather unavailable";
    });
}

// 🌍 Update time, date, and weather for selected city from dropdown
function updateSelectedCity(event) {
  let cityTimeZone = event.target.value;
  if (!cityTimeZone) return;

  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }

  let cityName = cityTimeZone.split("/")[1].replace("_", " ");
  let cityTime = moment().tz(cityTimeZone);

  const citiesElement = document.querySelector("#cities");

  citiesElement.innerHTML = `
    <div class="city-card" id="selected-city">
      <div class="city-header">
        <h2>${cityName}</h2>
        <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
      </div>
      <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format(
    "A"
  )}</small></div>
      <div class="weather">Loading weather...</div>
    </div>
  `;

  // Fetch weather for selected city
  fetchWeather(cityName, "selected-city");
}

// Initial calls
updateTime();
fetchWeather("Nairobi", "nairobi");
fetchWeather("Berlin", "berlin");

// Run updateTime every second
setInterval(updateTime, 1000);

// Add dropdown change listener
document.querySelector("#city").addEventListener("change", updateSelectedCity);
