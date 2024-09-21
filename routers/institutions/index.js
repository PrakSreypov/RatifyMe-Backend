const express = require("express");
const router = express.Router();

const institutionRouters = require("./institutionRouters");
const institutionStatsRouter = require("./institutionStatsRouters")

router.use("/institutionStats", institutionStatsRouter )
router.use("/", institutionRouters);

module.exports = router;
