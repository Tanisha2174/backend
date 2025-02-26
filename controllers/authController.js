const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendResetEmail = require("../utils/sendEmail");
const { sendOtpEmail } = require("../utils/sendOtpEmail"); // For OTP verification
const crypto = require("crypto");
const otpStorage = {}; 
const verifiedEmails = {}; 
const connectDB= require("../config/db");


const defaultServices = [
    { serviceId: 1, type: "Contract Drafting", deadline: new Date("2025-01-24"), status: "Pending" },
    { serviceId: 2, type: "Legal Consultation", deadline: new Date("2025-02-10"), status: "Pending" },
    { serviceId: 3, type: "Intellectual Property Filing", deadline: new Date("2025-03-15"), status: "Pending" },
    { serviceId: 4, type: "Tax Advisory", deadline: new Date("2025-04-05"), status: "Pending" },
    { serviceId: 5, type: "Business Compliance Review", deadline: new Date("2025-05-20"), status: "Pending" },
    { serviceId: 6, type: "Employment Agreement Drafting", deadline: new Date("2025-06-12"), status: "Pending" }
  ];

// REGISTER A NEW USER
exports.register = async (req, res) => {
    try {
        const { fullName, email, phone, password, isBusiness, businessName, businessType, location } = req.body;

        // 🔹 Check if all required fields are present
        if (!fullName || !email || !phone || !password) {
            return res.status(400).json({ msg: "All fields are required: fullName, email, phone, password" });
        }

        // 🔹 Ensure email was verified before allowing registration
        if (!verifiedEmails[email]) {
            return res.status(400).json({ msg: "Email is not verified. Please verify OTP first." });
        }

        // 🔹 Check if email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already in use. Please login." });
        }

        // 🔹 Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🔹 Create new user with `isVerified: true`
        const newUser = new User({
            fullName,
            email,
            phone,
            password: hashedPassword,
            isBusiness: isBusiness || false,
            businessName: isBusiness ? businessName : undefined,
            businessType: isBusiness ? businessType : undefined,
            location,
            isVerified: true ,   // ✅ Email is verified before user is created
            services: defaultServices
        });

        await newUser.save();

        // 🔹 Remove from `verifiedEmails` since registration is complete
        delete verifiedEmails[email];

        // 🔹 Generate JWT Token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(201).json({ msg: "User registered successfully", token });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ error: error.message });
    }
};




// LOGIN USER
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        // Compare Passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Set token as HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
          });
        console.log(user);
        req.session.user = { id: user._id, name: user.name, email: user.email };
        res.json({ msg: "Login successful", token ,user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });

    }
};

// LOGOUT USER
exports.logout = (req, res) => {
    res.clearCookie("token", { path: "/" }); // Ensure the token cookie is removed
    res.json({ msg: "Logged out successfully" });
};


// GET USER PROFILE (Protected Route)
exports.getUserProfile = async (req, res) => {
    try {
      await connectDB();
      const user = req.user;
  
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      const userData = await User.findById(user.id).select("-password");
      res.json(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

exports.getUserAccount = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password"); // Exclude password for security

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Get Account Error:", error);
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};


// 🔵 GOOGLE LOGIN CONTROLLER
exports.googleAuth = async (req, res) => {
    try {
        const user = req.user; // Get user from Passport.js
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        req.session.user = { id: user._id, name: user.name, email: user.email };
        res.redirect(`${process.env.CLIENT_URL}/client-portal?token=${token}`); // Redirect to frontend
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) return res.status(400).json({ msg: "User not found" });
  
      // Generate a reset token and expiration time
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpires = Date.now() + 3600000; // Token valid for 1 hour
  
      // ✅ Use updateOne() to avoid validation errors
      await User.updateOne(
        { id: user.id },
        { resetPasswordToken: resetToken, resetPasswordExpires: resetTokenExpires }
      );
  
      // Reset link
      const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  
      // Send email
      await sendResetEmail(user.email, resetLink);
  
      res.json({ msg: "Reset password link sent to your email." });
    } catch (error) {
      console.error("Forgot Password Error:", error);
      res.status(500).json({ error: error.message });
    }
  };


exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ msg: "Email is required" });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store OTP in memory for 5 minutes
        otpStorage[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

        // Send OTP via email
        await sendOtpEmail(email, otp);

        res.json({ msg: "OTP sent successfully" });
    } catch (error) {
        console.error("Send OTP Error:", error);
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};




exports.verify_Otp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ msg: "Email and OTP are required" });
        }

        // Check if OTP exists in temporary storage
        const storedOtp = otpStorage[email];

        if (!storedOtp || storedOtp.otp !== otp || Date.now() > storedOtp.expiresAt) {
            return res.status(400).json({ msg: "Invalid or expired OTP" });
        }

        // Mark email as verified in memory
        verifiedEmails[email] = true;

        // Remove OTP after successful verification
        delete otpStorage[email];

        res.json({ msg: "OTP verified successfully" });
    } catch (error) {
        console.error("Verify OTP Error:", error);
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};



  
  // 🔹 RESET PASSWORD - Validate Token & Change Password
  exports.resetPassword = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
  
      // Find user with valid reset token
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }, // Ensure token is not expired
      });
  
      if (!user) return res.status(400).json({ msg: "Invalid or expired token" });
  
      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
  
      await user.save();
      res.json({ msg: "Password reset successfully. You can now login." });
  
    } catch (error) {
      console.error("Reset Password Error:", error);
      res.status(500).json({ error: error.message });
    }
  };
