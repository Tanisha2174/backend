const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/UserServiceController");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Fetch user-specific services (using query params)
router.get("/", authMiddleware, serviceController.getUserServices);

// ✅ Update service status (using query params)
router.put("/update", authMiddleware, serviceController.updateServiceStatus);

// ✅ Delete a service (using query params)
router.delete("/delete", authMiddleware, serviceController.deleteService);

module.exports = router;


