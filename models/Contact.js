const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  message: String,
  fileUrls: [String],
}, { timestamps: true });

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
