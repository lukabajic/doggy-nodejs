const mongoose = require("mongoose");

const { Schema } = mongoose;

const pedigreeSchema = new Schema({
  pedigreNo: {
    type: Number,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  aboutBreader: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    country: { type: String, required: true },
    kennel: { type: String, required: true },
    contact: { type: String, required: true },
  },
});

const awardSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  place: {
    type: Number,
    required: true,
  },
  compentition: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const yearAwards = new Schema({
  year: {
    type: Number,
    required: true,
  },
  list: {
    type: [awardSchema],
    default: undefined,
  },
});

const dogschema = new Schema({
  imageUrl: {
    type: String,
    default: "",
  },
  imageName: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  sterilised: {
    type: Boolean,
    required: true,
  },
  pedigree: {
    type: pedigreeSchema,
    default: undefined,
  },
  awards: {
    type: [yearAwards],
    default: undefined,
  },
});

const Dog = mongoose.model("Dog", dogschema);

module.exports = {
  dogschema,
  default: Dog,
};
