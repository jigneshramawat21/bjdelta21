const About = require("../models/About");

// Get About Data
exports.getAbout = async (req, res) => {
  const data = await About.findOne();
  res.json(data);
};

// Save or Update About
exports.saveAbout = async (req, res) => {
  const existing = await About.findOne();
  if (existing) {
    await About.findByIdAndUpdate(existing._id, req.body);
    return res.json({ message: "About Page Updated" });
  } else {
    const newAbout = new About(req.body);
    await newAbout.save();
    return res.json({ message: "About Page Created" });
  }
};
