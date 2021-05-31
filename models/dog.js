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

const dogSchema = new Schema({
  imageData: {
    type: String,
    default: "https://source.unsplash.com/288x162?dog",
  },
  imageName: {
    type: String,
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  breed: {
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
  weight: {
    type: Number,
    required: true,
  },
  birthday: {
    type: String,
    default: "01/01/1977",
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

const Dog = mongoose.model("Dog", dogSchema);

module.exports = {
  dogSchema,
  default: Dog,
};
