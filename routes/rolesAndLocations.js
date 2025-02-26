// /routes/rolesAndLocations.js
const express = require('express');
const router = express.Router();

// Endpoint to fetch available roles and locations
router.get('/roles-and-locations', (req, res) => {
  const rolesAndLocations = {
    roles: ["Legal Associate", "Paralegal Expert", "Intern"],
    locations: ["Delhi"]
  };

  res.status(200).json(rolesAndLocations);
});

module.exports = router;
