#!/usr/bin/env node

// const https = require("https");
// const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const formData = require("express-form-data");

require("dotenv").config();

// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const MONGO_URL =
  "mongodb+srv://lukabajic23:Zuccher0@cluster0.e8uab.mongodb.net/doggy-app?retryWrites=true&w=majority";
const PORT = 8080;

const mongoDBOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const app = express();

// parses all incoming json data
app.use(express.json());
app.use(formData.parse());

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
app.use("/user", userRoutes);

// const options = {
//   key: fs.readFileSync("key.pem"),
//   cert: fs.readFileSync("cert.pem"),
// };

mongoose
  .connect(MONGO_URL, mongoDBOptions)
  .then(() => {
    app.listen(PORT);
    // https.createServer(options, app).listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
