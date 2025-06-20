const express = require("express");
const router = express.Router();
const Home = require("../models/Home");

router.get("/", async (req, res) => {
  const data = await Home.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  try {
    const home = await Home.create(req.body);
    res.json(home);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Home.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Home.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
