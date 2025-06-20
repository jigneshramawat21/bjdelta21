const express = require("express");
const router = express.Router();
const HomeService = require("../models/HomeService");

// Get all services
router.get("/", async (req, res) => {
  try {
    const services = await HomeService.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new service
router.post("/", async (req, res) => {
  try {
    const service = await HomeService.create(req.body);
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update service
router.put("/:id", async (req, res) => {
  try {
    const updated = await HomeService.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete service
router.delete("/:id", async (req, res) => {
  try {
    await HomeService.findByIdAndDelete(req.params.id);
    res.json({ message: "Service Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
