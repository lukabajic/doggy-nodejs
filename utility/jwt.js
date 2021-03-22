const jwt = require("jsonwebtoken");

exports.generateToken = (userId, email) => {
  const token = jwt.sign({ email, userId }, "DoggyApp");
  return token;
};

exports.getUserId = (token) => {
  const decodedToken = jwt.verify(token, "DoggyApp");
  return decodedToken.userId;
};
