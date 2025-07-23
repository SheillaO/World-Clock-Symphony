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
    // Convert id back to timezone format
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
  // Replace slashes and spaces to create a valid HTML id
  let cityId = cityTimeZone.replace(/\//g, "-").replace(/\s+/g, "-");
  if (document.getElementById(cityId)) {
    return; // Prevent duplicate city entries
  }

  let cityName = cityTimeZone.split("/").pop().replace(/_/g, " ");
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");

  if (citiesElement) {
    // Create city container
    const cityDiv = document.createElement("div");
    cityDiv.className = "city";
    cityDiv.id = cityId;

    // Create inner HTML structure
    cityDiv.innerHTML = `
      <div>
        <h2>${cityName}</h2>
        <div class="date">${cityTime.format("dddd, MMMM Do YYYY")}</div>
      </div>
      <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format("A")}</small></div>
    `;

    // Append to cities container
    citiesElement.appendChild(cityDiv);
  } else {
    console.warn('Could not find the #cities element in the DOM.');
  }
}

updateTime();
setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#city");
if (citiesSelectElement) {
  citiesSelectElement.addEventListener("change", updateCity);
}
