const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  res.json({
    message: "Bravo",
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server started", process.env.PORT || 8080);
});
