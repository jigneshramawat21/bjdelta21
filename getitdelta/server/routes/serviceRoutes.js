// routes/serviceRoutes.js
const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

// GET all cards
router.get("/", async (req, res) => {
  try {
    const cards = await Service.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new card
router.post("/", async (req, res) => {
  try {
    const newCard = await Service.create(req.body);
    res.status(201).json(newCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update card by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedCard = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE card by ID
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Card deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
