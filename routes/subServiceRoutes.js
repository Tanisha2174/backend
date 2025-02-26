const express = require("express");
const router = express.Router();
const SubService = require("../models/SubService");

// Route: GET /api/:category/:subService
router.get("/:category/:subService", async (req, res) => {
  try {
    const { category, subService } = req.params;

    // Convert hyphenated values back to spaces
    const formattedCategory = category.replace(/-/g, " ");
    const formattedSubService = subService.replace(/-/g, " ");

    console.log("🔍 Received API Request");
    console.log("➡️ Original Category:", category);
    console.log("➡️ Original Sub-service:", subService);
    console.log("🔄 Formatted Category:", formattedCategory);
    console.log("🔄 Formatted Sub-service:", formattedSubService);

    // Find sub-service in MongoDB (case-insensitive search)
    const serviceData = await SubService.findOne({
        category: { $regex: new RegExp("^" + formattedCategory + "$", "i") },
        sub_category: { $regex: new RegExp("^" + formattedSubService + "$", "i") } // ✅ Fix applied here
    });
      

    if (!serviceData) {
      console.log("❌ No matching sub-service found in MongoDB!");
      return res.status(404).json({ error: "Sub-service not found" });
    }

    console.log("✅ Sub-service found:", serviceData);
    res.json(serviceData);
  } catch (error) {
    console.error("❌ Error fetching sub-service:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;





