const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { throwError } = require("../utility/errors");

exports.userExists = async (email) => {
  const check = await User.findOne({ email });
  check && throwError("Email is already being used.", 409);
};

exports.getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  !user && throwError("Email doesn't exist in our database.", 404);

  return user;
};

exports.passwordMatches = async (enteredPassword, userPassword) => {
  const passwordsMatch = await bcrypt.compare(enteredPassword, userPassword);
  !passwordsMatch && throwError("You entered a wrong password.", 401);
};

exports.getUser = async (id) => {
  const user = await User.findById(id);
  !user && throwError("User doesn't exist in our database.", 404);

  return user;
};
