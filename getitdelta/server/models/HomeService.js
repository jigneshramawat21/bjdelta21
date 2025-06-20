const mongoose = require('mongoose');

const HomeServiceSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  imageTitle: String,
  paragraph: String
});

module.exports = mongoose.model('HomeService', HomeServiceSchema);
