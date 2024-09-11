const express = require("express");
const router = express.Router();
const checkoutRouters = require("./checkoutRouters");

router.use("/checkoutSession", checkoutRouters);
// router.use("/customers/:institutionId");

module.exports = router;
