const express = require('express');
const router = express.Router();

const verificationControllers = require('../../controllers/earners/verificationControllers');

router.route('/:id').get(verificationControllers.getVerificationData);

module.exports = router;
