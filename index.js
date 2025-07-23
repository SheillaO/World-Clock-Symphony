function updateTime() {
  // nairobi
  let nairobiElement = document.querySelector("#nairobi");
  let nairobiDateElement = nairobiElement.querySelector(".date");
  let nairobiTimeElement = nairobiElement.querySelector(".time");
  let nairobiTime = moment().tz("Africa/Nairobi");

  nairobiDateElement.innerHTML = nairobiTime.format("dddd, MMMM Do YYYY");
  nairobiTimeElement.innerHTML = nairobiTime.format(
    "h:mm:ss:SS[<small>]A[</small>]"
  );

  // berlin
  let berlinElement = document.querySelector("#berlin");
  let berlinDateElement = berlinElement.querySelector(".date");
  let berlinTimeElement = berlinElement.querySelector(".time");
  let berlinTime = moment().tz("Europe/Berlin");

  berlinDateElement.innerHTML = berlinTime.format("dddd, MMMM Do YYYY");
  berlinTimeElement.innerHTML = berlinTime.format(
    "h:mm:ss:SS[<small>]A[</small>]"
  );
}

updateTime();
setInterval(updateTime, 100);
