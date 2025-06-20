const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({


  about: {
    title: String,
    paragraphOne: String,
    paragraphTwo: String,
    numberOne: Number,
    numberTwo: Number
  },

  footer: {
    paragraph: String,
    titleOne: String,
    titleTwo: String
  }
});

module.exports = mongoose.model('Home', HomeSchema);
