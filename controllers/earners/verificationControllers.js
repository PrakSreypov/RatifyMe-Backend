// controllers/verificationController.js
const express = require('express');

// Mock data for verification (this is what will be returned to the frontend)
const mockVerificationData = {
  123: {
    issuedOn: "September 15, 2023",
    issuedBy: "Lincoln Technologies",
    issuedUsing: "Blockchain Verification",
    issuedTo: "John Doe",
    acceptedOn: "September 20, 2023",
    lastUpdated: "September 25, 2023",
  },
  456: {
    issuedOn: "August 1, 2023",
    issuedBy: "Tech Innovators",
    issuedUsing: "Digital Signature",
    issuedTo: "Jane Smith",
    acceptedOn: "August 5, 2023",
    lastUpdated: "August 10, 2023",
  },
};

// Fetch verification data by ID
const getVerificationData = (req, res) => {
  const { id } = req.params;
  const verification = mockVerificationData[id];

  if (verification) {
    res.status(200).json(verification);
  } else {
    res.status(404).json({ message: 'Verification data not found' });
  }
};

module.exports = {
  getVerificationData,
};
