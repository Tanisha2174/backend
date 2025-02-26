const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getUserFromToken = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await User.findById(decoded.id).select("-password");
  } catch (error) {
    return null;
  }
};

module.exports = { getUserFromToken };
