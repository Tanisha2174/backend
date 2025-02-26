const express = require("express");
const { getStartupMSME, addStartupMSME } = require("../controllers/startupMSMEController");

const router = express.Router();

router.get("/", getStartupMSME);
router.post("/", addStartupMSME);

module.exports = router;
