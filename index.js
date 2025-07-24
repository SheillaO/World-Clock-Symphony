// 🌍 Cultural greetings for different cities and times
const culturalGreetings = {
  Nairobi: {
    morning: "Habari za asubuhi! 🌅", // Good morning in Swahili
    afternoon: "Habari za mchana! ☀️", // Good afternoon
    evening: "Habari za jioni! 🌆", // Good evening
    night: "Usiku mwema! 🌙", // Good night
  },
  Berlin: {
    morning: "Guten Morgen! 🌅", // Good morning in German
    afternoon: "Guten Tag! ☀️", // Good afternoon
    evening: "Guten Abend! 🌆", // Good evening
    night: "Gute Nacht! 🌙", // Good night
  },
  "New York": {
    morning: "Good morning! 🌅",
    afternoon: "Good afternoon! ☀️",
    evening: "Good evening! 🌆",
    night: "Good night! 🌙",
  },
  London: {
    morning: "Good morning! 🌅",
    afternoon: "Good afternoon! ☀️",
    evening: "Good evening! 🌆",
    night: "Good night! 🌙",
  },
  Tokyo: {
    morning: "Ohayou gozaimasu! 🌅", // Good morning in Japanese
    afternoon: "Konnichiwa! ☀️", // Good afternoon
    evening: "Konbanwa! 🌆", // Good evening
    night: "Oyasumi! 🌙", // Good night
  },
  Sydney: {
    morning: "G'day mate! 🌅", // Australian greeting
    afternoon: "Good arvo! ☀️", // Good afternoon
    evening: "Good evening! 🌆",
    night: "Good night! 🌙",
  },
  Johannesburg: {
    morning: "Goeie môre! 🌅", // Good morning in Afrikaans
    afternoon: "Goeie middag! ☀️", // Good afternoon
    evening: "Goeie aand! 🌆", // Good evening
    night: "Goeie nag! 🌙", // Good night
  },
};

// 🎨 Theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const themeIcon = document.querySelector(".theme-icon");
  const themeText = document.querySelector(".theme-text");

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");

    if (body.classList.contains("dark-theme")) {
      themeIcon.textContent = "☀️";
      themeText.textContent = "Light Mode";
    } else {
      themeIcon.textContent = "🌙";
      themeText.textContent = "Dark Mode";
    }
  });
}

// 🗣️ Get cultural greeting based on time and city
function getCulturalGreeting(momentTime, cityName) {
  const greetings = culturalGreetings[cityName];
  if (!greetings) return "";

  const hour = momentTime.hour();

  if (hour >= 6 && hour < 12) {
    return greetings.morning;
  } else if (hour >= 12 && hour < 18) {
    return greetings.afternoon;
  } else if (hour >= 18 && hour < 22) {
    return greetings.evening;
  } else {
    return greetings.night;
  }
}
const cityBusinessInfo = {
  Nairobi: {
    currency: "KSH (Kenyan Shilling)",
    marketHours: "9:00 AM - 3:00 PM",
    majorPairs: "USD/KSH, EUR/KSH",
    businessHub: "East Africa Financial Hub",
  },
  Berlin: {
    currency: "EUR (Euro)",
    marketHours: "9:00 AM - 5:30 PM",
    majorPairs: "EUR/USD, EUR/GBP, EUR/JPY",
    businessHub: "European Business Center",
  },
  "New York": {
    currency: "USD (US Dollar)",
    marketHours: "9:30 AM - 4:00 PM",
    majorPairs: "EUR/USD, GBP/USD, USD/JPY",
    businessHub: "Global Financial Capital",
  },
  London: {
    currency: "GBP (British Pound)",
    marketHours: "8:00 AM - 4:30 PM",
    majorPairs: "GBP/USD, EUR/GBP, GBP/JPY",
    businessHub: "Forex Trading Center",
  },
  Tokyo: {
    currency: "JPY (Japanese Yen)",
    marketHours: "9:00 AM - 3:00 PM",
    majorPairs: "USD/JPY, EUR/JPY, GBP/JPY",
    businessHub: "Asian Trading Hub",
  },
  Sydney: {
    currency: "AUD (Australian Dollar)",
    marketHours: "10:00 AM - 4:00 PM",
    majorPairs: "AUD/USD, EUR/AUD, GBP/AUD",
    businessHub: "Pacific Trading Center",
  },
  Johannesburg: {
    currency: "ZAR (South African Rand)",
    marketHours: "9:00 AM - 5:00 PM",
    majorPairs: "USD/ZAR, EUR/ZAR",
    businessHub: "African Financial Hub",
  },
};

// 🌅 Get day/night indicator based on time
function getDayNightIndicator(momentTime) {
  const hour = momentTime.hour();

  if (hour >= 6 && hour < 12) {
    return "🌅 Morning";
  } else if (hour >= 12 && hour < 18) {
    return "☀️ Afternoon";
  } else if (hour >= 18 && hour < 22) {
    return "🌆 Evening";
  } else {
    return "🌙 Night";
  }
}

// 😊 Get fun emoji reaction based on time
function getFunTimeReaction(momentTime) {
  const hour = momentTime.hour();
  const isWeekend = momentTime.day() === 0 || momentTime.day() === 6;

  if (hour >= 6 && hour < 8) {
    return "☕ Coffee time!";
  } else if (hour >= 8 && hour < 10) {
    return "🏃‍♂️ Rush hour!";
  } else if (hour >= 10 && hour < 12) {
    return "💼 Getting things done!";
  } else if (hour >= 12 && hour < 14) {
    return "🍕 Lunch break!";
  } else if (hour >= 14 && hour < 17) {
    return "⚡ Productive hours!";
  } else if (hour >= 17 && hour < 19) {
    return "🏃‍♀️ Home time!";
  } else if (hour >= 19 && hour < 22) {
    if (isWeekend) {
      return "🎉 Weekend fun!";
    } else {
      return "🍽️ Dinner time!";
    }
  } else if (hour >= 22 || hour < 6) {
    if (isWeekend && hour >= 22 && hour < 2) {
      return "🌃 Night out!";
    } else {
      return "😴 Sleep time!";
    }
  }
  return "⏰ Another hour!";
}

// 📈 Check if market is open (simple version)
function getMarketStatus(momentTime, cityName) {
  const hour = momentTime.hour();
  const info = cityBusinessInfo[cityName];
  if (!info) return "Market info unavailable";

  // Simple check - most markets open 9 AM - 4 PM weekdays
  const isWeekday = momentTime.day() >= 1 && momentTime.day() <= 5;
  const isMarketHours = hour >= 9 && hour <= 16;

  if (isWeekday && isMarketHours) {
    return "🟢 Market Open";
  } else {
    return "🔴 Market Closed";
  }
}

// 🏢 Create business info HTML
function createBusinessInfo(cityName) {
  const info = cityBusinessInfo[cityName];
  if (!info) return "";

  return `
    <div style="margin-top: 10px; font-size: 14px; color: #555; line-height: 1.4;">
      <div><strong>💰 ${info.currency}</strong></div>
      <div>📈 Major Pairs: ${info.majorPairs}</div>
      <div>🏢 ${info.businessHub}</div>
      <div>⏰ Market: ${info.marketHours}</div>
    </div>
  `;
}

// 🕒 Update time for Nairobi and Berlin
function updateTime() {
  // Nairobi
  const nairobi = document.querySelector("#nairobi");
  if (nairobi) {
    const nairobiDate = nairobi.querySelector(".date");
    const nairobiTime = nairobi.querySelector(".time");
    const nairobiGreeting = nairobi.querySelector(".cultural-greeting");
    const time = moment().tz("Africa/Nairobi");

    nairobiDate.innerHTML = time.format("MMMM Do YYYY");

    const dayNight = getDayNightIndicator(time);
    const marketStatus = getMarketStatus(time, "Nairobi");
    const funReaction = getFunTimeReaction(time);
    const culturalGreeting = getCulturalGreeting(time, "Nairobi");

    nairobiTime.innerHTML = `
      ${time.format("h:mm:ss")} <small>${time.format("A")}</small>
      <br><small style="font-size: 16px; color: #666;">${dayNight}</small>
      <br><small style="font-size: 14px; color: #777;">${marketStatus}</small>
      <br><small style="font-size: 14px; color: #ff6b6b;">${funReaction}</small>
    `;

    if (nairobiGreeting) {
      nairobiGreeting.innerHTML = culturalGreeting;
    }
  }

  // Berlin
  const berlin = document.querySelector("#berlin");
  if (berlin) {
    const berlinDate = berlin.querySelector(".date");
    const berlinTime = berlin.querySelector(".time");
    const berlinGreeting = berlin.querySelector(".cultural-greeting");
    const time = moment().tz("Europe/Berlin");

    berlinDate.innerHTML = time.format("MMMM Do YYYY");

    const dayNight = getDayNightIndicator(time);
    const marketStatus = getMarketStatus(time, "Berlin");
    const funReaction = getFunTimeReaction(time);
    const culturalGreeting = getCulturalGreeting(time, "Berlin");

    berlinTime.innerHTML = `
      ${time.format("h:mm:ss")} <small>${time.format("A")}</small>
      <br><small style="font-size: 16px; color: #666;">${dayNight}</small>
      <br><small style="font-size: 14px; color: #777;">${marketStatus}</small>
      <br><small style="font-size: 14px; color: #ff6b6b;">${funReaction}</small>
    `;

    if (berlinGreeting) {
      berlinGreeting.innerHTML = culturalGreeting;
    }
  }

  // Update selected city time if it exists
  const selectedCity = document.querySelector("#selected-city");
  if (selectedCity && selectedCity.dataset.timezone) {
    const selectedTime = selectedCity.querySelector(".time");
    const selectedDate = selectedCity.querySelector(".date");
    const cityName = selectedCity.dataset.cityname;
    const time = moment().tz(selectedCity.dataset.timezone);

    selectedDate.innerHTML = time.format("MMMM Do YYYY");

    const dayNight = getDayNightIndicator(time);
    const marketStatus = getMarketStatus(time, cityName);
    const funReaction = getFunTimeReaction(time);

    selectedTime.innerHTML = `
      ${time.format("h:mm:ss")} <small>${time.format("A")}</small>
      <br><small style="font-size: 16px; color: #666;">${dayNight}</small>
      <br><small style="font-size: 14px; color: #777;">${marketStatus}</small>
      <br><small style="font-size: 14px; color: #ff6b6b;">${funReaction}</small>
    `;
  }
}

// ☁️ Fetch weather and update card by elementId
function fetchWeather(cityName, elementId) {
  const apiKey = "7601b0fff0179o9d5059a8db34ctbc66";
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
  let dayNight = getDayNightIndicator(cityTime);
  let marketStatus = getMarketStatus(cityTime, cityName);
  let funReaction = getFunTimeReaction(cityTime);
  let culturalGreeting = getCulturalGreeting(cityTime, cityName);
  let businessInfo = createBusinessInfo(cityName);

  const existingSelected = document.querySelector("#selected-city");
  if (existingSelected) {
    existingSelected.remove();
  }

  // Use the SAME structure as Nairobi and Berlin
  const newCityCard = `
  <div class="city-card" id="selected-city" data-timezone="${cityTimeZone}" data-cityname="${cityName}">
    <div class="city-header">
      <h2>${cityName}</h2>
      <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
    </div>
    <div class="time">
      ${cityTime.format("h:mm:ss")} <small>${cityTime.format("A")}</small>
      <br><small style="font-size: 16px; color: #666;">${dayNight}</small>
      <br><small style="font-size: 14px; color: #777;">${marketStatus}</small>
      <br><small style="font-size: 14px; color: #ff6b6b;">${funReaction}</small>
    </div>
    <div class="cultural-greeting">${culturalGreeting}</div>
    <div class="weather">Loading weather...</div>
  </div>
`;

  const citiesElement = document.querySelector("#cities");
  citiesElement.insertAdjacentHTML("beforeend", newCityCard);

  // Add business info after the greeting (same as Nairobi and Berlin)
  const greeting = document.querySelector("#selected-city .cultural-greeting");
  if (greeting && businessInfo) {
    greeting.insertAdjacentHTML("afterend", businessInfo);
  }

  fetchWeather(cityName, "selected-city");
}
// Initial calls - Add business info to default cities
document.addEventListener("DOMContentLoaded", function () {
  const nairobiCard = document.querySelector("#nairobi");
  if (nairobiCard) {
    const greeting = nairobiCard.querySelector(".cultural-greeting");
    if (greeting) {
      greeting.insertAdjacentHTML("afterend", createBusinessInfo("Nairobi"));
    }
  }

  const berlinCard = document.querySelector("#berlin");
  if (berlinCard) {
    const greeting = berlinCard.querySelector(".cultural-greeting");
    if (greeting) {
      greeting.insertAdjacentHTML("afterend", createBusinessInfo("Berlin"));
    }
  }
});

updateTime();
fetchWeather("Nairobi", "nairobi");
fetchWeather("Berlin", "berlin");
initThemeToggle(); // Initialize theme toggle

setInterval(updateTime, 1000);

document.querySelector("#city").addEventListener("change", updateSelectedCity);

const clientId = "7cf0f53647d34acd967f205ebb01c51c";
const clientSecret = "cc1f3903f3214178abef218a5b027599";

async function getAccessToken() {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
  return data.access_token;
}

async function showTrack(query) {
  const token = await getAccessToken();

  const search = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=1`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const data = await search.json();
  const track = data.tracks.items[0];

  if (track) {
    const embed = `
      <iframe src="https://open.spotify.com/embed/track/${track.id}" 
              width="300" height="80" frameborder="0" 
              allowtransparency="true" allow="encrypted-media"></iframe>
    `;
    document.getElementById("spotify-player").innerHTML = embed;
  }
}

const sautiSongs = [
  "Sauti Sol Melanin",
  "Sauti Sol Suzanna",
  "Sauti Sol Midnight Train",
];
const randomSong = sautiSongs[Math.floor(Math.random() * sautiSongs.length)];
showTrack(randomSong);

const bird = document.querySelector(".flying-bird");

function randomPosition() {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  bird.style.transform = `translate(${x}px, ${y}px)`;
}

// Move the bird every 1.2 seconds
setInterval(randomPosition, 10);
