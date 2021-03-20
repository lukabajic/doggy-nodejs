const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  res.json({
    message: "Bravo",
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server started");
});
