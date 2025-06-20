const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  sectionOne: {
    titleOne: String,
    titleTwo: String,
    paragraph: String,
    pointTitle: String,
    point: String
  },
  sectionTwo: {
    sectionTwoTitle: String,
    paragraphOne: String,
    paragraphTwo: String,
    paragraphThree: String,
    sectionThreeTitle: String,
    sectionThreeParagraph: String,
    pointOne: String,
    pointTwo: String
  }
});

module.exports = mongoose.model("About", aboutSchema);
