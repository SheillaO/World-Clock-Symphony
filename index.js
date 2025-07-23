// -------------------------
// 🕒 Time + Weather Logic
// -------------------------

function updateTime() {
  // Nairobi
  let nairobiElement = document.querySelector("#nairobi");
  if (nairobiElement) {
    let nairobiDateElement = nairobiElement.querySelector(".date");
    let nairobiTimeElement = nairobiElement.querySelector(".time");
    let nairobiTime = moment().tz("Africa/Nairobi");

    nairobiDateElement.innerHTML = nairobiTime.format("MMMM Do YYYY");
    nairobiTimeElement.innerHTML = nairobiTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }

  // Berlin
  let berlinElement = document.querySelector("#berlin");
  if (berlinElement) {
    let berlinDateElement = berlinElement.querySelector(".date");
    let berlinTimeElement = berlinElement.querySelector(".time");
    let berlinTime = moment().tz("Europe/Berlin");

    berlinDateElement.innerHTML = berlinTime.format("MMMM Do YYYY");
    berlinTimeElement.innerHTML = berlinTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }
}

// -------------------------
// 🌍 Selected City Logic
// -------------------------

let selectedCityTimeZone = null;

function updateCity(event) {
  selectedCityTimeZone = event.target.value;
  if (selectedCityTimeZone === "current") {
    selectedCityTimeZone = moment.tz.guess();
  }

  const cityName = getCityNameFromTimezone(selectedCityTimeZone);
  handleCitySelection(cityName); // ⬅️ Trigger background video update
}

function updateSelectedCityTime() {
  if (selectedCityTimeZone) {
    let cityTime = moment().tz(selectedCityTimeZone);
    let cityName = getCityNameFromTimezone(selectedCityTimeZone);
    let citiesElement = document.querySelector("#cities");

    citiesElement.innerHTML = `
      <div class="city">
        <div>
          <h2>${cityName}</h2>
          <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
        </div>
        <div class="time">${cityTime.format(
          "h:mm:ss"
        )} <small>${cityTime.format("A")}</small></div>
      </div>
    `;
  }
}

function getCityNameFromTimezone(timezone) {
  const parts = timezone.split("/");
  return parts.length > 1 ? parts[1].replace("_", " ") : timezone;
}

// -------------------------
// ⏰ Start the Clock
// -------------------------

function updateAll() {
  updateTime(); // Nairobi & Berlin
  updateSelectedCityTime(); // Dropdown-selected city
}

updateAll();
setInterval(updateAll, 1000);

// -------------------------
// 📍 Dropdown Listener
// -------------------------

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);

// -------------------------
// 🌍 City to Continent Map
// -------------------------

const cityToContinent = {
  Nairobi: "Africa",
  Tokyo: "Asia",
  "New York": "America",
  Berlin: "Europe",
  Sydney: "Australia",
  London: "Europe",
  Johannesburg: "Africa",
};

// -------------------------
// 🎥 Background Video Logic
// -------------------------

function changeBackgroundVideo(continent) {
  const video = document.getElementById("bg-video");
  const source = document.getElementById("video-source");

  if (!video || !source) return;

  const newSrc = `media/${continent}.mp4`;

  // Only update if the video is different
  if (!source.src.includes(`${continent}.mp4`)) {
    video.pause();
    source.src = newSrc;
    video.load();
    video.play();
  }
}

// -------------------------
// 🏙️ City Selection Trigger
// -------------------------

function handleCitySelection(cityName) {
  const continent = cityToContinent[cityName];
  if (continent) {
    changeBackgroundVideo(continent);
  }
}
