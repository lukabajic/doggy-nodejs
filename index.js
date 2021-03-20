const express = require("express");

require("dotenv").config();

const port = process.env.port || 8080;
const serverUrl =
  process.env.CONFIG === "prod"
    ? `http://doggyapp-api.epicss.dev:${port}`
    : `http://localhost:${port}`;

const app = express();

// parses all incoming json data
app.use(express.json());

// use ejs as view engine
app.set("view engine", "ejs");

// index page
app.get("/", (req, res) => {
  res.render("index");
});

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.listen(port, () => {
  console.log(
    `Listening to requests on: ${serverUrl} with '${process.env.CONFIG}' config.`
  );
});
