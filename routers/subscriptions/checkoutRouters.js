const express = require("express");
const checkoutSession = require("../../controllers/subcriptions/checkoutControllers");
const router = express.Router();

router.post("/:servicePlanId", checkoutSession.createCheckoutSession);
// router.get('/success')
router.get('/cancel', checkoutSession.getCancel)
module.exports = router;
