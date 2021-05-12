const weatherForm = document.querySelector("form");
const searchLocation = document.querySelector("input");
const errorMsg = document.getElementById("error");
const forecastMsg = document.getElementById("forecast");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = searchLocation.value;

  errorMsg.textContent = "Loading...";
  forecastMsg.textContent = "";

  // Fetching from the reative URL
  fetch("/weather?address=" + location).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        errorMsg.textContent = data.error;
        return;
      }
      errorMsg.textContent = data.location;
      forecastMsg.textContent = data.forecast;
    });
  });
});
