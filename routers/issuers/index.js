const express = require("express");
const router = express.Router();

const issuerRouters = require("./issuerRouters");
const achievementRouters = require("./achievementRouters");
const badgeClassRouters = require("./badgeClassRouters");

router.use("/achievements", achievementRouters);
router.use("/badgeclasses", badgeClassRouters);
router.use("/", issuerRouters);

module.exports = router;
