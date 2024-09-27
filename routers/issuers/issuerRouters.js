const express = require("express");
const router = express.Router();

const issuerControllers = require("../../controllers/issuers/issuerControllers");
const sendBadgeControllers = require("../../controllers/issuers/sendBadgeControllers");

router.route("/").get(issuerControllers.getAll).post(issuerControllers.createOne);

router
    .route("/:id")
    .get(issuerControllers.getOne)
    .patch(issuerControllers.updateOne)
    .delete(issuerControllers.deleteOne);

router.route("/sendBadge/:id").patch(sendBadgeControllers.sendBadges);

module.exports = router;
