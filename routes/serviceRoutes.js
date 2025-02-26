const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Get services by category
router.get('/services/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const services = await Service.findOne({ category });

    if (!services) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
});

module.exports = router;



