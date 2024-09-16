const express = require("express");
const router = express.Router();

const checkoutSession = require("../../controllers/subcriptions/checkoutControllers");

router.post("/:servicePlanId", checkoutSession.createCheckoutSession);
// router.get('/success')
router.get('/cancel', checkoutSession.getCancel)
module.exports = router;
