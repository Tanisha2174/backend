const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  assistant: { type: String, required: true },
  slot: { type: String, required: true },
  reason: { type: String, required: true },
  comments: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;