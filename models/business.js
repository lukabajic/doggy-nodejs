const mongoose = require("mongoose");

const { dogSchema } = require("./dog");

const { Schema } = mongoose;

// const imageSchema = new Schema({
//   imageData: {
//     type: String,
//     required: true,
//   },
//   imageName: {
//     type: String,
//     required: true,
//   },
// });

const acceptedSizeSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
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

const workingHoursSchema = new Schema({
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
  closed: {
    type: Boolean,
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
    required: undefined,
  },
  description: {
    type: Schema.Types.Mixed,
    default: undefined,
  },
});

const skillsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: [String],
    required: true,
  },
});

const dogWalkingInfoSchema = new Schema({
  willingToTravel: {
    type: String,
    required: true,
  },
  walkLength: {
    type: String,
    required: true,
  },
  lastMinute: {
    type: Boolean,
    required: true,
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
    web: {
      type: String,
      default: undefined,
    },
    about: {
      type: String,
      required: true,
    },
  },
  imageData: {
    type: String,
    default: "https://source.unsplash.com/288x162?dog",
  },
  logo: {
    type: String,
    default: "https://source.unsplash.com/40x40?logo",
  },
  acceptedSize: {
    type: acceptedSizeSchema,
    default: undefined,
  },
  workingHours: {
    type: [workingHoursSchema],
    default: [],
  },
  services: {
    type: [serviceSchema],
    default: [],
  },
  servicesWithDescription: {
    type: Boolean,
    default: true,
  },
  skills: {
    type: skillsSchema,
    default: undefined,
  },
  dogWalkingInfo: {
    type: dogWalkingInfoSchema,
    default: undefined,
  },
  callout: {
    type: String,
    default: undefined,
  },
  warnings: {
    type: [String],
    default: undefined,
  },
  comments: {
    type: [commentSchema],
    default: [],
  },
  dogsForAdoption: {
    type: [dogSchema],
    default: undefined,
  },
});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
