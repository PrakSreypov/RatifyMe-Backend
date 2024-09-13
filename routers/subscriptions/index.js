const express = require("express");
const router = express.Router();
const checkoutRouters = require("./checkoutRouters");
const servicePlanRouters = require("./servicePlanRouters");

// Subcribe session checkout
router.use("/subscribe/", checkoutRouters);

// ServicePlan Router
router.use("/servicePlan", servicePlanRouters);

module.exports = router;
