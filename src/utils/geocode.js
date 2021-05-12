const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaW1hZGFyc2hzcmkiLCJhIjoiY2tuZTkyaG5lMWc0OTJ1bnNzMTBqdW5kbyJ9.eBsIaNb8oeQdnWcsk4ZCmw&limit=1";
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.message || body.features.length === 0) {
      callback("Unable to find Location. Try another search.", undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
      });
    }
  });
};

module.exports = geocode;
