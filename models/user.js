const mongoose = require("mongoose");

const { dogSchema } = require("./dog");

const { Schema } = mongoose;

const followSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  pending: {
    type: Boolean,
    default: true,
  },
});

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
  dogs: {
    type: [dogSchema],
    default: [],
  },
  followers: {
    type: [followSchema],
    default: [],
  },
  following: {
    type: [followSchema],
    default: [],
  },
  imageData: {
    type: String,
    default: "https://source.unsplash.com/53x53?person",
  },
  imageName: {
    type: String,
    default: undefined,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
