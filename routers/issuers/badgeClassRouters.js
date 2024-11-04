const express = require("express");
const router = express.Router();
const { upload } = require("../../app");

const badgeClassesControllers = require("../../controllers/issuers/badgeClassControllers");
const addBadgesControllers = require("../../controllers/issuers/addBadgeClassControllers");
const editBadgesControllers = require("../../controllers/issuers/editBadgeClassControllers");
const sendBadgeController = require("../../controllers/issuers/sendBadgeControllers");
const authMiddleware = require("../../middlewares/auth");

router
    .route("/")
    .get(authMiddleware.protect, badgeClassesControllers.getAll)
    .post(authMiddleware.protect, badgeClassesControllers.createOne);

router.route("/addBadge").post(authMiddleware.protect, upload.single("badgeFile"), addBadgesControllers.addBadgeClass);
router
    .route("/editBadge/:badgeId")
    .patch(upload.single("badgeFile"), editBadgesControllers.editBadgeClass);

router.route("/earner/:earnerId").get(badgeClassesControllers.getBadgeClassesByEarnerId);
router.route("/claim/:earnerId").get(badgeClassesControllers.getBadgeClaimByEarner);
router.route("/issueOn").patch(sendBadgeController.updateIssuedOnForAchievements);

router
    .route("/:id")
    .get(authMiddleware.protect, badgeClassesControllers.getOne)
    .patch(badgeClassesControllers.updateOne)
    .delete(badgeClassesControllers.deleteOne);

module.exports = router;
