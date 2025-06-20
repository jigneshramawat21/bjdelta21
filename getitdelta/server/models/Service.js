// models/Service.js
const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  points: {
    type: [String], // You can change this to String if you're not storing as array
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Service", ServiceSchema);
