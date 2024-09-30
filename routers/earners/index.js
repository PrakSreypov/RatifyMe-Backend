const express = require("express");
const router = express.Router();

const academicLevelRouters = require("./academicLevelRouters");
const fieldOfStudyRouters = require("./fieldOfStudyRouters");
const specializationRouters = require("./specializationRouters");
const courseRouters = require("./courseRouters");
const academicBackgroundRouters = require("./academicBackgroundRouters");
const earnerRouters = require("./earnerRouters");
const verificationRouters = require("./verificationRouters");

router.use("/academiclevels", academicLevelRouters);
router.use("/fieldofstudies", fieldOfStudyRouters);
router.use("/specializations", specializationRouters);
router.use("/courses", courseRouters);
router.use("/academicbackgrounds", academicBackgroundRouters);
router.use("/verifications", verificationRouters)
router.use("/", earnerRouters);

module.exports = router;
