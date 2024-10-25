const express = require("express");
const router = express.Router();

const earnerAchievementsControllers = require("../../controllers/earners/earnerAchievementsController");

router
    .route("/")
    .get(earnerAchievementsControllers.getAll)
    .post(earnerAchievementsControllers.createOne);
router
    .route("/:id")
    .get(earnerAchievementsControllers.getOne)
    .patch(earnerAchievementsControllers.updateOne)
    .delete(earnerAchievementsControllers.deleteOne);

module.exports = router;
