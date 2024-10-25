const express = require("express");
const router = express.Router();

const earnerAchievementsControllers = require("../../controllers/earners/earnerAchievementsController");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/")
    .get(earnerAchievementsControllers.getAll)
    .post(authMiddlewares.protect, earnerAchievementsControllers.createOne);
router
    .route("/:id")
    .get(authMiddlewares.protect, earnerAchievementsControllers.getOne)
    .patch(authMiddlewares.protect, earnerAchievementsControllers.updateOne)
    .delete(authMiddlewares.protect, earnerAchievementsControllers.deleteOne);

module.exports = router;
