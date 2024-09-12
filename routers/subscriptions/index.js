const express = require("express");
const router = express.Router();
const checkoutRouters = require("./checkoutRouters");

router.use("/subscribe/", checkoutRouters);
// router.use("/checkoutSession", checkoutRouters);

module.exports = router;
