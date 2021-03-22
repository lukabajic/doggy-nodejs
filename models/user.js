const mongoose = require("mongoose");

const { animalSchema } = require("./animal");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: undefined,
  },
  emailVerified: {
    type: Boolean,
    defaul: false,
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  animals: {
    type: [animalSchema],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
