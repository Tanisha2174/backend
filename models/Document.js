const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Links document to a user
  name: { type: String, required: true },
  category: { type: String, default: "General" },
  date: { type: Date, default: Date.now },
  type: { type: String, required: true },
  size: { type: String, required: true },
  fileUrl: { type: String, required: true },
}, { timestamps: true }); // Adds createdAt & updatedAt fields automatically

const Document = mongoose.model("Document", DocumentSchema);
module.exports= Document;

