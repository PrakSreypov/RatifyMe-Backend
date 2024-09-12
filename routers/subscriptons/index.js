const express = require("express");
const router = express.Router();
const checkoutRouters = require("./checkoutRouters");

router.use("/subscribe/:servicePlanId", checkoutRouters);
// router.use("/checkoutSession", checkoutRouters);

module.exports = router;
