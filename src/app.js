const hbs = require("hbs");
const path = require("path");
const express = require("express");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine & views Location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Adarsh Srivastava",
  });
});

// About Page Route
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Adarsh Srivastava",
  });
});

// Help Page Route
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Adarsh Srivastava",
    helperText:
      "Please visit api.openweather.org or api.mapbox.com for weather or address service related issue respectively.",
  });
});

/// Weather Page Route
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided!",
    });
  }

  geocode(req.query.address, (err, { longitude, latitude, location } = {}) => {
    if (err) {
      return res.send({
        error: err,
      });
    }

    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

// Dummy Query Sring Example

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please Provide the search term",
    });
  }

  console.log(req.query.rating);
  res.send({
    products: [],
  });
});

/// Error Pages
// Help Page Error
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    name: "Adarsh Srivastava",
    errorMessage: "Help article not found",
  });
});
// 404 Error
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    name: "Adarsh Srivastava",
    errorMessage: "Page Not Found!",
  });
});

// Listening to the port no. where the server is up
app.listen(PORT, () => {
  console.log("Server is up on port " + PORT);
});
