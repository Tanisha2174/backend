const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  category: {
    type: String,  // E.g., 'Company Registration', 'IPR Registration', etc.
    required: true,
    enum: [
      'Company Registration',
      'IPR Registration',
      'Licenses and Certification',
      'Compliances and Returns',
      'Legal and Business Consultancy',
      'Consumer Case Filing/Consultancy'
    ],
  },
  preCardContent: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  services: [
    {
      name: {
        type: String,
        required: true,
      },
      href: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;


