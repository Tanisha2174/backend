const jwt = require("jsonwebtoken");
const User = require("../models/User"); 

const { getUserFromToken } = require("../utils/auth");

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
  
    try {
      const token = authHeader.split(" ")[1]; // Extract token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
  
      console.log("Decoded Token:", decoded); // Log decoded token
  
      req.user = decoded; // Attach userId to req.user
  
      // Optional: Check if user exists in DB
      const user =  User.findById(req.user.userId);
      if (!user) return res.status(404).json({ msg: "User not found" });
  
      next(); // Proceed to next middleware
    } catch (err) {
      console.error("Token verification error:", err);
      res.status(401).json({ msg: "Invalid token" });
    }
};

