const mongoose = require("mongoose");

const barSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {
    type: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: Number, required: true },
      },
    ],
    required: true,
  },
  hasHappyHour: { type: Boolean, required: true },
  happyHourTime: { type: String, required: true },
  description: String,
  img: String,
}, {timestamps: true});

const Bar = mongoose.model("Bar", barSchema);

module.exports = Bar;
