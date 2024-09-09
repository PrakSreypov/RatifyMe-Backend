const express = require("express");
const router = express.Router();

const academicLevelRouters = require("./academicLevelRouters");

router.use("/academiclevels", academicLevelRouters);

module.exports = router;
