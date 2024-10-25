const express = require("express");
const validateBadgeAndEarners = require("../../middlewares/validateBadgeAndEarners");
const router = express.Router();

const issuerControllers = require("../../controllers/issuers/issuerControllers");
const sendBadgeControllers = require("../../controllers/issuers/sendBadgeControllers");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/")
    .get(authMiddlewares.protect, issuerControllers.getAll)
    .post(authMiddlewares.protect, issuerControllers.createOne);

router
    .route("/:id")
    .get(authMiddlewares.protect, issuerControllers.getOne)
    .patch(authMiddlewares.protect, issuerControllers.updateOne)
    .delete(authMiddlewares.protect, issuerControllers.deleteOne);

// PATCH route to assign badges to earners
router
    .route("/:badgeClassId/assignEarners")
    .patch(
        authMiddlewares.protect,
        validateBadgeAndEarners,
        sendBadgeControllers.assignBadgeToEarners,
    );

module.exports = router;
