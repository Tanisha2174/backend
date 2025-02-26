const express = require("express");
const { createSession, getSessions } = require("../controllers/sessionController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", createSession);
router.get("/", getSessions);

module.exports = router;
