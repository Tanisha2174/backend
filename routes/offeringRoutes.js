const express = require('express');
const router = express.Router();
const Offering = require('../models/Offering');

// Route to get all offerings
router.get('/', async (req, res) => {
  try {
    const offerings = await Offering.find();
    res.status(200).json(offerings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching offerings' });
  }
});

module.exports = router;
