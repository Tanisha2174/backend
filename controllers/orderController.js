// const Order = require("../models/Order");
// const User = require("../models/User");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // 🔹 Create Order & Initiate Payment
// exports.createOrder = async (req, res) => {
//     try {
//         const { packageName, price } = req.body;
//         const userId = req.user.userId;

//         if (!packageName || !price) {
//             return res.status(400).json({ msg: "Package name and price are required" });
//         }

//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ msg: "User not found" });
//         }

//         // 🔹 Create a Razorpay order
//         const razorpayOrder = await razorpay.orders.create({
//             amount: parseInt(price) * 100, // Convert price to paisa (INR)
//             currency: "INR",
//             receipt: `receipt_${userId}_${Date.now()}`,
//             payment_capture: 1
//         });

//         // 🔹 Save order in the database
//         const newOrder = new Order({
//             user: userId,
//             packageName,
//             price,
//             transactionId: razorpayOrder.id,
//             receiptUrl: `https://dashboard.razorpay.com/app/orders/${razorpayOrder.id}`
//         });

//         await newOrder.save();

//         res.json({ orderId: razorpayOrder.id, key: process.env.RAZORPAY_KEY_ID });
//     } catch (error) {
//         console.error("Create Order Error:", error);
//         res.status(500).json({ msg: "Internal server error", error: error.message });
//     }
// };

// // 🔹 Verify Payment & Update Order Status
// exports.verifyPayment = async (req, res) => {
//     try {
//         const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

//         const body = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//             .update(body)
//             .digest("hex");

//         if (expectedSignature !== razorpay_signature) {
//             return res.status(400).json({ msg: "Invalid payment signature" });
//         }

//         // 🔹 Update order status
//         await Order.findOneAndUpdate(
//             { transactionId: razorpay_order_id },
//             { paymentStatus: "Completed" }
//         );

//         res.json({ msg: "Payment successful!" });
//     } catch (error) {
//         console.error("Payment Verification Error:", error);
//         res.status(500).json({ msg: "Payment verification failed", error: error.message });
//     }
// };
