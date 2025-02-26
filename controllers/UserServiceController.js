const User = require("../models/User");

// ✅ Get Services for a User
exports.getUserServices = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Update Service Status
exports.updateServiceStatus = async (req, res) => {
  try {
    const { userId, serviceId } = req.query;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const service = user.services.find(s => s.serviceId == serviceId); // Loose equality fix
    if (!service) return res.status(404).json({ message: "Service not found" });

    // Toggle status
    service.status = service.status === "Pending" ? "Completed" : "Pending";
    await user.save();

    res.json({ message: "Service status updated", service });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Delete Service for a User
exports.deleteService = async (req, res) => {
  try {
    const { userId, serviceId } = req.query;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const serviceIndex = user.services.findIndex(s => s.serviceId == serviceId);
    if (serviceIndex === -1) return res.status(404).json({ message: "Service not found" });

    user.services.splice(serviceIndex, 1); // Remove the service
    await user.save();

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
