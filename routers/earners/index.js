const express = require("express");
const router = express.Router();

const academicLevelRouters = require("./academicLevelRouters");
const fieldOfStudyRouters = require("./fieldOfStudyRouters");

router.use("/academiclevels", academicLevelRouters);
router.use("/fieldofstudies", fieldOfStudyRouters);

module.exports = router;
