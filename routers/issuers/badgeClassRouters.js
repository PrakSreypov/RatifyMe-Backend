const express = require("express");
const router = express.Router();
const {upload} = require("../../app")

const badgeClassesControllers = require("../../controllers/issuers/badgeClassControllers");
const addBadgesControllers = require("../../controllers/issuers/addBadgeClassControllers");

router.route("/").get(badgeClassesControllers.getAll).post(badgeClassesControllers.createOne);

router.route("/addBadge").post(upload.single("badgeFile"), addBadgesControllers.addBadgeClass);

router.route("/earner/:earnerId").get(badgeClassesControllers.getBadgeClassesByEarnerId);
router.route("/claim/:earnerId").get(badgeClassesControllers.getBadgeClaimByEarner);

router
    .route("/:id")
    .get(badgeClassesControllers.getOne)
    .patch(badgeClassesControllers.updateOne)
    .delete(badgeClassesControllers.deleteOne);

module.exports = router;
