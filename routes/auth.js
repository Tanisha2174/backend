const express = require("express");
const passport = require("passport");
const { googleAuth} = require("../controllers/authController");
const { register, login, logout, getUserProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const { forgotPassword, resetPassword ,sendOtp, verify_Otp,} = require("../controllers/authController");
const router = express.Router();
const { getUserAccount } = require("../controllers/authController");
const{ OAuth2Client } =require("google-auth-library");
const User = require("../models/User");
const bcrypt = require("bcryptjs");




router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
// router.get("/profile", authMiddleware, getUserProfile);
router.get("/profile", authMiddleware, async (req, res) => {
    try {
      console.log("Authenticated User ID:", req.user.userId);
  
      const user = await User.findById(req.user.userId).select("-password");
      if (!user) return res.status(404).json({ msg: "User not found" });
  
      res.json(user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ msg: "Server error" });
    }
  });


  
  

  
router.get("/account", authMiddleware, getUserAccount);
// Google OAuth Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), googleAuth);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
// Phone Login Routes


router.post("/send-otp", sendOtp); // ✅ Ensure these exist
router.post("/verify-otp", verify_Otp);



const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { name, email, sub } = ticket.getPayload();

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name, email, googleId: sub });
  }

  const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token: jwtToken });
});

module.exports = router;
