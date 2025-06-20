const Home = require("../models/Home");

// Get data
exports.getHome = async (req, res) => {
  const data = await Home.findOne();
  res.json(data);
};

// Create or Update
exports.saveHome = async (req, res) => {
  const existing = await Home.findOne();
  if (existing) {
    await Home.findByIdAndUpdate(existing._id, req.body);
    return res.json({ message: "Updated successfully" });
  } else {
    const newData = new Home(req.body);
    await newData.save();
    return res.json({ message: "Created successfully" });
  }
};
