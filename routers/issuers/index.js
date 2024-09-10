const express = require("express");
const router = express.Router();

const issuerRouters = require("./issuerRouters");
const achievementRouters = require("./achievementRouters");
const badgeClassRouters = require("./badgeClassRouters");
const achievementTypeRouters = require("./ahievementTypeRouters");
const badgeCriteriaItemRouters = require("./badgeCriteriaItemRouters");
const criteriaRouters = require("./criteriaRouters");

router.use("/achievements", achievementRouters);
router.use("/badgeclasses", badgeClassRouters);
router.use("/achievementTypes", achievementTypeRouters);
router.use("/badgeCriteriasItems", badgeCriteriaItemRouters);
router.use("/criterias", criteriaRouters);
router.use("/", issuerRouters);

module.exports = router;
