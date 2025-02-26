const mongoose = require('mongoose');

const offeringSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model('Offering', offeringSchema);
