const mongoose = require("mongoose");

const { dogSchema } = require("./dog");

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
  dogs: {
    type: [dogSchema],
    default: [],
  },
  followers: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  following: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  imageData: {
    type: String,
    default: undefined,
  },
  imageName: {
    type: String,
    default: undefined,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
