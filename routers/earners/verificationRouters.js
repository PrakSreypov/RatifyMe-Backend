const express = require('express');
const router = express.Router();

const verificationControllers = require('../../controllers/earners/verificationControllers');

router.route('/:credId').post(verificationControllers.verifyCredential);

module.exports = router;
