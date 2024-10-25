const express = require("express");
const router = express.Router();
const { upload } = require("../../app");

const badgeClassesControllers = require("../../controllers/issuers/badgeClassControllers");
const addBadgesControllers = require("../../controllers/issuers/addBadgeClassControllers");
const editBadgesControllers = require("../../controllers/issuers/editBadgeClassControllers");
const sendBadgeController = require("../../controllers/issuers/sendBadgeControllers");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/")
    .get(badgeClassesControllers.getAll)
    .post(authMiddlewares.protect, badgeClassesControllers.createOne);

router.route("/addBadge").post(upload.single("badgeFile"), addBadgesControllers.addBadgeClass);
router
    .route("/editBadge/:badgeId")
    .patch(upload.single("badgeFile"), editBadgesControllers.editBadgeClass);

router
    .route("/earner/:earnerId")
    .get(badgeClassesControllers.getBadgeClassesByEarnerId);
router
    .route("/claim/:earnerId")
    .get(badgeClassesControllers.getBadgeClaimByEarner);
router
    .route("/issueOn")
    .patch(authMiddlewares.protect, sendBadgeController.updateIssuedOnForAchievements);

router
    .route("/:id")
    .get(badgeClassesControllers.getOne)
    .patch(badgeClassesControllers.updateOne)
    .delete(badgeClassesControllers.deleteOne);

module.exports = router;
