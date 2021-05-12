const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=metric&appid=52d955a0ab75924f884a952b78015bcf";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.message) {
      callback("Invalid Location", undefined);
    } else {
      callback(
        undefined,
        body.weather[0].description +
          ". It is currently " +
          body.main.temp +
          " degrees out. There is " +
          body.main.humidity +
          "% humidity."
      );
    }
  });
};

module.exports = forecast;
