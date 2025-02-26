const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  pricingDetails: { type: String, default: "Annually (Excluding 18% GST and Govt. Fees)" },
  features: [{ type: String, required: true }],
});

const HeroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const StartupMSMESchema = new mongoose.Schema({
  hero: HeroSchema,
  packages: [PackageSchema],
}, { strict: 'throw' }); // Ensuring strict mode throws errors for undefined fields

module.exports = mongoose.model("StartupMSME", StartupMSMESchema);

