const StartupMSME = require("../models/StartupMSME");

// Fetch all startup MSME packages
exports.getStartupMSME = async (req, res) => {
  try {
    const data = await StartupMSME.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new startup MSME packages
exports.addStartupMSME = async (req, res) => {
  try {
    const newData = new StartupMSME(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
