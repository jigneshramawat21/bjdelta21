// routes/enrollRoutes.js
const express = require("express");
const router = express.Router();
const Enroll = require("../models/Enroll");

// ✅ GET all enrolls (for admin panel)
router.get("/", async (req, res) => {
  try {
    const enrolls = await Enroll.find();
    res.json(enrolls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new enrollment (from frontend form)
router.post("/", async (req, res) => {
  try {
    const { name, gender, contact, email } = req.body;
    const newEnroll = new Enroll({ name, gender, contact, email });
    await newEnroll.save();
    res.status(201).json({ message: "Enroll saved successfully", data: newEnroll });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
