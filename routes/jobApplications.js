// /routes/jobApplications.js

const express = require('express');
const router = express.Router();
const jobApplicationsController = require('../controllers/jobApplicationsController');

// POST request to submit the job application
router.post('/apply', jobApplicationsController.createApplication);

module.exports = router;
