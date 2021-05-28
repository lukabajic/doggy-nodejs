const mongoose = require("mongoose");

const { Schema } = mongoose;

const recommendedSchema = new Schema({
  businessId: {
    type: String,
    required: true,
  },
});

const Recommended = mongoose.model("Recommended", recommendedSchema);

module.exports = Recommended;
