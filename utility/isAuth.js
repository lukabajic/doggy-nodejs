const jwt = require("jsonwebtoken");

const { catchError, throwError } = require("./errors");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    !authHeader &&
      throwError(
        "You're not logged in or you don't have access privilege.",
        400
      );

    const token = authHeader.split(" ")[1];
    !token &&
      throwError(
        "You're not logged in or you don't have access privilege.",
        400
      );

    const decodedToken = jwt.verify(token, "DoggyApp");

    req.userId = decodedToken.userId;
    req.email = decodedToken.email;
    req.token = token;

    next();
  } catch (err) {
    catchError(res, err);
  }
};
