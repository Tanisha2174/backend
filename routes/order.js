// const express = require("express");
// const { createOrder, verifyPayment } = require("../controllers/orderController");
// const authMiddleware = require("../middleware/authMiddleware");
// const User = require("../models/User");
// const Order = require("../models/Order");
// const router = express.Router();

// router.post("/create-order", authMiddleware, createOrder);
// router.post("/verify-payment", verifyPayment);
// router.get("/account", async (req, res) => {
//     try {
//         const userId = req.user.id; // Assuming you have authentication middleware
//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         const orders = await Order.find({ user: userId });

//         res.json({ user, orders });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// module.exports = router;
