// models/Enroll.js
const mongoose = require("mongoose");

const enrollSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("Enroll", enrollSchema);
