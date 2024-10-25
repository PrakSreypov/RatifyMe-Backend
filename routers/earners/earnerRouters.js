const express = require("express");
const router = express.Router();

const earnerControllers = require("../../controllers/earners/earnerControllers");
const earnerAchievementControllers = require("../../controllers/earners/earnerAchievementsController");
const authMiddlewares = require("../../middlewares/auth");

router.route("/").get(earnerControllers.getAll).post(authMiddlewares.protect, earnerControllers.createOne);

router.route("/achievement/:earnerId").patch(authMiddlewares.protect, earnerControllers.updateAchievementStatus);
router.route("/achievementById/:achievementId").get(authMiddlewares.protect, earnerControllers.getOneAchievement);

router.route("/earnerAchievement").get(authMiddlewares.protect, earnerAchievementControllers.getAll);
router.route("/earnerAchievement/:achievementId/earner/:earnerId").get(authMiddlewares.protect, earnerAchievementControllers.getOne);
router.route("/earnerAchievementByUid/:credId").get(authMiddlewares.protect, earnerAchievementControllers.getEarnerAchiveByUid);

router
    .route("/:id")
    .get(earnerControllers.getOne)
    .patch(earnerControllers.updateOne)
    .delete(earnerControllers.deleteOne);

module.exports = router;
