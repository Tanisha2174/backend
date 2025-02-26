const express = require("express");
const router = express.Router();
const Document = require("../models/Document");
const upload = require("../middleware/documentMiddleware");
const authMiddleware= require("../middleware/authMiddleware")
const jwt = require("jsonwebtoken");
const {
  getDocuments,
  uploadDocument,
  renameDocument,
  deleteDocument,
  downloadDocument,
} = require("../controllers/documentController");

// Get all documents for a user
// router.get("/", getDocuments);
router.get("/", authMiddleware, getDocuments); // 🔐 Protect route
router.post("/upload", authMiddleware, upload.single("file"), uploadDocument);
router.put("/rename/:id", authMiddleware, renameDocument);
router.get("/download/:id", authMiddleware, downloadDocument);
router.delete("/:id", authMiddleware, deleteDocument);

module.exports = router;


