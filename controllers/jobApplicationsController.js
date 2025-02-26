// /controllers/jobApplicationsController.js

const JobApplication = require('../models/jobApplication');

exports.createApplication = async (req, res) => {
  const { firstName, lastName, email, phone, role, location } = req.body;

  try {
    const newApplication = new JobApplication({
      firstName,
      lastName,
      email,
      phone,
      role,
      location
    });

    const savedApplication = await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully', application: savedApplication });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
};
