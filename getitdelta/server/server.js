const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ROUTE IMPORTS
const aboutRoutes = require("./routes/about");
const contactRoutes = require("./routes/contactRoutes");
const enrollRoutes = require("./routes/enrollRoutes");
const homeRoutes = require("./routes/home");
const homeServiceRoutes = require("./routes/HomeServerRouter");
const serviceRoutes = require("./routes/serviceRoutes"); // 👈 correct file for /services

// ROUTE USE
app.use("/api/about", aboutRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/homeservices", homeServiceRoutes);
app.use("/api/services", serviceRoutes); // ✅ FIXED: this matches frontend code

// SERVER START
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
