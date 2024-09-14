const express = require("express");
const router = express.Router();
const checkoutRouters = require("./checkoutRouters");
const servicePlanRouters = require("./servicePlanRouters");

// Subcribe session checkout Router
router.use("/subscribe", checkoutRouters);

// ServicePlan Router
router.use("/servicePlan", servicePlanRouters);

// Webhook Router
router.use('/webhook', express.json(), )

module.exports = router;
