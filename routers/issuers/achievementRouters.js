const express = require("express");

const achievementsControllers = require("../../controllers/issuers/achievementControllers");
const router = express.Router();

router.route("/").get(achievementsControllers.getAll).post(achievementsControllers.createOne);

router
    .route("/:id")
    .get(achievementsControllers.getOne)
    .patch(achievementsControllers.updateOne)
    .delete(achievementsControllers.deleteOne);

module.exports = router;
