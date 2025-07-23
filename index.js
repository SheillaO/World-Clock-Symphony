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
}

function updateSelectedCityTime() {
  if (selectedCityTimeZone) {
    let cityTime = moment().tz(selectedCityTimeZone);
    let cityName = selectedCityTimeZone.split("/")[1].replace("_", " ");
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


  const videoElement = document.getElementById("bg-video");
  const sourceElement = videoElement.querySelector("source");

  const videos = [
    "media/Africa.mp4",
    "media/Asia.mp4",
    "media/America.mp4",
    "media/Australia.mp4",
    "media/Europe.mp4"
  ];

  let currentIndex = 0;

  function changeVideo() {
    currentIndex = (currentIndex + 1) % videos.length;
    sourceElement.src = videos[currentIndex];
    videoElement.load(); // reload the video with new source
    videoElement.play(); // ensure it plays again
  }

  setInterval(changeVideo, 10000); // 20 seconds
