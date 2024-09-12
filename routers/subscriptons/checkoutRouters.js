const express = require("express");
const checkoutSession = require("../../controllers/subcriptions/checkoutControllers");
const router = express.Router();

router.post('/', checkoutSession.createCheckoutSession)
// router.get('/success' )
// router.get('/cancel',)
module.exports = router