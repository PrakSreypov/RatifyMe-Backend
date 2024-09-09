const express = require("express");
const router = express.Router();

const academicLevelRouters = require("./academicLevelRouters");
const fieldOfStudyRouters = require("./fieldOfStudyRouters");
const specializationRouters = require("./specializationRouters");
const courseRouters = require("./courseRouters");

router.use("/academiclevels", academicLevelRouters);
router.use("/fieldofstudies", fieldOfStudyRouters);
router.use("/specializations", specializationRouters);
router.use("/courses", courseRouters);

module.exports = router;
