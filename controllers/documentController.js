const Document = require("../models/Document");
const fs = require("fs");
const path = require("path");
const User= require("../models/User");
const mongoose = require("mongoose");

exports.downloadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id);

    if (!document) return res.status(404).json({ message: "Document not found" });

    // Extract filename from fileUrl
    const filename = path.basename(document.fileUrl);
    const filePath = path.join(__dirname, "../uploads", filename);

    // Log file path for debugging
    console.log("Attempting to download file from:", filePath);

    // Check if file exists before sending
    if (!fs.existsSync(filePath)) {
      console.error("File not found:", filePath);
      return res.status(404).json({ message: "File not found on the server" });
    }

    // Send file for download
    res.download(filePath, document.name, (err) => {
      if (err) {
        console.error("Error during download:", err);
        res.status(500).json({ message: "Error downloading document", error: err });
      }
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Error downloading document", error });
  }
};





// Get documents for a specific user

exports.getDocuments = async (req, res) => {
    try {
      const userId = req.query.userId;
      
      if (!userId) return res.status(400).json({ message: "User ID is required" });
  
      console.log("✅ Fetching documents for user:", userId);
  
      // Convert userId to ObjectId
      const objectId = new mongoose.Types.ObjectId(userId);
  
      const documents = await Document.find({ userId: userId });
  
      console.log("📁 Documents found:", documents);
  
      res.json(documents);
    } catch (error) {
      console.error("🚨 Error fetching documents:", error);
      res.status(500).json({ message: "Error fetching documents", error });
    }
  };
  

// Upload a new document
exports.uploadDocument = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const newDocument = new Document({
      userId: userId,
      name: file.originalname,
      category: "General",
      type: file.mimetype,
      size: (file.size / 1024).toFixed(2) + " KB",
      fileUrl: `/uploads/${file.filename}`,
    });

    await newDocument.save();
    res.status(201).json({ message: "File uploaded successfully", document: newDocument });
  } catch (error) {
    res.status(500).json({ message: "Error uploading document", error });
  }
};

// Rename a document
exports.renameDocument = async (req, res) => {
    try {
      const { newName } = req.body;
      const { id } = req.params; // Use req.params instead of req.body
  
      if (!id || !newName) return res.status(400).json({ message: "ID and new name are required" });
  
      const updatedDoc = await Document.findByIdAndUpdate(id, { name: newName }, { new: true });
  
      if (!updatedDoc) return res.status(404).json({ message: "Document not found" });
  
      res.json({ message: "Document renamed", document: updatedDoc });
    } catch (error) {
      res.status(500).json({ message: "Error renaming document", error });
    }
  };
  

// Delete a document
exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDoc = await Document.findByIdAndDelete(id);

    if (!deletedDoc) return res.status(404).json({ message: "Document not found" });

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting document", error });
  }
};
