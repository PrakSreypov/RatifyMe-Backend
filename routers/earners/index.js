const express = require("express");
const router = express.Router();

const academicLevelRouters = require("./academicLevelRouters");
const fieldOfStudyRouters = require("./fieldOfStudyRouters");
const specializationRouters = require("./specializationRouters");
const courseRouters = require("./courseRouters");
const academicBackgroundRouters = require("./academicBackgroundRouters");
const earnerRouters = require("./earnerRouters");
const verificationRouters = require("./verificationRouters");
const certRouters = require("./certRouters");
const earnerAchievementRouters = require("./earnerAchievementRouters");

router.use("/academiclevels", academicLevelRouters);
router.use("/fieldofstudies", fieldOfStudyRouters);
router.use("/specializations", specializationRouters);
router.use("/courses", courseRouters);
router.use("/academicbackgrounds", academicBackgroundRouters);
router.use("/verifications", verificationRouters);
router.use("/uploadCerti", certRouters);
router.use("/earnerAchievement", earnerAchievementRouters);
router.use("/", earnerRouters);

module.exports = router;
