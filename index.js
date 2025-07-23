function updateTime() {
  // nairobi
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

  // berlin
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

  // dynamic cities (excluding nairobi and berlin)
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

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }

  let cityId = cityTimeZone.replace(/\//g, "-").replace(/\s+/g, "-");
  if (document.getElementById(cityId)) {
    return;
  }

  let cityName = cityTimeZone.split("/").pop().replace(/_/g, " ");
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");

  if (citiesElement) {
    const cityDiv = document.createElement("div");
    cityDiv.className = "city";
    cityDiv.id = cityId;

    // 🔥 Add styling classes
    const cityCard = document.createElement("div");
    cityCard.className = "city-card float slide-up";

    cityCard.innerHTML = `
      <h2>${cityName}</h2>
      <div class="date">${cityTime.format("dddd, MMMM Do YYYY")}</div>
      <div class="temperature"></div>
      <div class="humidity"></div>
      <div class="wind-speed"></div>
      <div class="weather-icon"></div>
      <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format(
      "A"
    )}</small></div>
    `;

    cityDiv.appendChild(cityCard);
    citiesElement.appendChild(cityDiv);

    getWeather(cityName, cityId);
  }
}

function displayWeather(cityId, response) {
  const cityElement = document.querySelector(`#${cityId}`);
  if (!cityElement) return;

  const card = cityElement.querySelector(".city-card");
  const tempEl = card.querySelector(".temperature");
  const humidityEl = card.querySelector(".humidity");
  const windEl = card.querySelector(".wind-speed");
  const iconEl = card.querySelector(".weather-icon");

  const temperature = Math.round(response.data.temperature.current);
  const humidity = response.data.temperature.humidity;
  const windSpeed = Math.round(response.data.wind.speed);
  const iconUrl = response.data.condition.icon_url;
  const condition = response.data.condition.description.toLowerCase();

  if (tempEl) tempEl.textContent = `🌡️ ${temperature}°C`;
  if (humidityEl) humidityEl.textContent = `💧 ${humidity}%`;
  if (windEl) windEl.textContent = `💨 ${windSpeed} km/h`;
  if (iconEl) {
    iconEl.innerHTML = `<img src="${iconUrl}" alt="Weather icon" />`;
    iconEl.classList.remove("sunny", "rainy"); // Clear previous animation class
    if (condition.includes("sun")) {
      iconEl.classList.add("sunny");
    } else if (condition.includes("rain")) {
      iconEl.classList.add("rainy");
    }
  }
}

function getWeather(cityName, cityId) {
  const apiKey = "7601b0fff0179o9d5059a8db34ctbc66";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then((response) => {
      displayWeather(cityId, response);
    })
    .catch((error) => {
      console.warn(`Weather data not found for ${cityName}:`, error);
    });
}

// Initial setup
updateTime();
setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#city");
if (citiesSelectElement) {
  citiesSelectElement.addEventListener("change", updateCity);
}

// Load weather for static cities
getWeather("Nairobi", "nairobi");
getWeather("Berlin", "berlin");
