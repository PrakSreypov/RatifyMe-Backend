const express = require("express");
const validateBadgeAndEarners = require("../../middlewares/validateBadgeAndEarners");
const router = express.Router();

const issuerControllers = require("../../controllers/issuers/issuerControllers");
const sendBadgeControllers = require("../../controllers/issuers/sendBadgeControllers");
const authMiddleware = require("../../middlewares/auth");

router.route("/").get(authMiddleware.protect, issuerControllers.getAll).post(issuerControllers.createOne);

router
    .route("/:id")
    .get(issuerControllers.getOne)
    .patch(issuerControllers.updateOne)
    .delete(issuerControllers.deleteOne);

// PATCH route to assign badges to earners
router
    .route("/:badgeClassId/assignEarners")
    .patch(validateBadgeAndEarners, sendBadgeControllers.assignBadgeToEarners);

module.exports = router;
