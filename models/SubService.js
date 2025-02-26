const mongoose = require("mongoose");

const subServiceSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g. "Company Registration" or "Non-Profit Registration"
  sub_category: { type: String, required: true }, // e.g. "Private Limited Company", "LLP Registration", etc.

  title: { type: String, required: true },
  description: { type: String, required: true },

  // Storing headings and content for each service
  headings: [
    {
      headingTitle: { type: String, required: true },
      content: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
    },
  ],

  // Storing regulations content for each service
  regulations: [
    {
      headingTitle: { type: String, required: true },
      description: { type: String, required: true },
      points: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("SubService", subServiceSchema);
