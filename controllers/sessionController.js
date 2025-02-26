const Session = require("../models/Session");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

exports.createSession = async (req, res) => {
  try {
    const { userId, assistant, slot, reason, comments } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    if (!assistant || !slot || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSession = new Session({userId, assistant, slot, reason, comments });
    await newSession.save();

    // Email Notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.COMPANY_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.COMPANY_EMAIL,
      to: process.env.HR_EMAIL,
      subject: "New Mentorship Session Scheduled",
      text: `Assistant: ${assistant}\nSlot: ${slot}\nReason: ${reason}\nComments: ${comments}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error("Error sending email:", err);
      else console.log("Email sent:", info.response);
    });

    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ message: "Error scheduling session", error });
  }
};

exports.getSessions = async (req, res) => {
    try {
        const userId = req.query.userId;
        
        if (!userId) return res.status(400).json({ message: "User ID is required" });
    
        console.log("✅ Fetching session for user:", userId);
    
        // Convert userId to ObjectId
        const objectId = new mongoose.Types.ObjectId(userId);
    
        const session = await Session.find({ userId: userId });
    
        console.log("📁 Session found:", session);
    
        res.json(session);
      } catch (error) {
        console.error("🚨 Error fetching sessions:", error);
        res.status(500).json({ message: "Error fetching sessions", error });
      }
};

