const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { submitForm } = require("../controllers/contactController");

router.post("/submit", upload.array("files"), submitForm);

module.exports = router;
