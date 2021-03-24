const mongoose = require("mongoose");

const { Schema } = mongoose;

const imageSchema = new Schema({
  imageData: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
});

const commentSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const workingTimeSchema = new Schema({
  day: {
    type: String,
    default: undefined,
  },
  from: {
    type: String,
    default: undefined,
  },
  to: {
    type: String,
    default: undefined,
  },
});

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: undefined,
  },
});

const businessSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  image: {
    type: imageSchema,
    default: undefined,
  },
  coordinates: {
    latitude: {
      type: String,
      default: undefined,
    },
    longitude: {
      type: String,
      default: undefined,
    },
  },
  information: {
    icon: {
      type: imageSchema,
      default: undefined,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      default: undefined,
    },
    about: {
      type: String,
      required: true,
    },
  },
  workingTime: {
    type: [workingTimeSchema],
    default: [],
  },
  services: {
    type: [serviceSchema],
    default: [],
  },
  comments: {
    type: [commentSchema],
    default: [],
  },
});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
