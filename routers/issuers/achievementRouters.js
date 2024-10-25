const express = require("express");
const router = express.Router();

const achievementsControllers = require("../../controllers/issuers/achievementControllers");

router.route("/").get(achievementsControllers.getAll).post(achievementsControllers.createOne);

router
    .route("/:id")
    .get(achievementsControllers.getOne)
    .patch(achievementsControllers.updateOne)
    .delete(achievementsControllers.deleteOne);

module.exports = router;
