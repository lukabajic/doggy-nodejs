const https = require("https");
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

// import routes
const authRoutes = require("./routes/auth");

const port = process.env.PORT || 8000;
const mongoDBOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const app = express();

// parses all incoming json data
app.use(express.json());

// use ejs as view engine
app.set("view engine", "ejs");

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

// index page
app.get("/", (req, res) => {
  res.render("index");
});

// listen to routes
app.use("/auth", authRoutes);

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

mongoose
  .connect(process.env.MONGO_URL, mongoDBOptions)
  .then(() => {
    process.env.CONFIG = "dev"
      ? app.listen(port)
      : https.createServer(options, app).listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
