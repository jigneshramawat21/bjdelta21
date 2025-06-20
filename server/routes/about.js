const express = require("express");
const router = express.Router();
const About = require("../models/About");

// ✅ GET - return all entries
router.get("/", async (req, res) => {
  try {
    const data = await About.find(); // Returns all documents
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching about data" });
  }
});

// ✅ POST - create a new entry
router.post("/", async (req, res) => {
  try {
    const about = new About(req.body);
    await about.save();
    res.json({ message: "About page created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error saving about data" });
  }
});

// ✅ PUT - update by _id
router.put("/:id", async (req, res) => {
  try {
    await About.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "About page updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error updating about data" });
  }
});

// ✅ DELETE - delete by _id
router.delete("/:id", async (req, res) => {
  try {
    await About.findByIdAndDelete(req.params.id);
    res.json({ message: "About page deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting about data" });
  }
});

module.exports = router;
