const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

// import routes
const authRoutes = require("./routes/auth");

const port = process.env.PORT || 8080;
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

// listen to routes
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URL, mongoDBOptions)
  .then(() => {
    app.listen(port, () => {
      console.log("Listening to requests on port: ", port);
    });
  })
  .catch((err) => console.log(err));
