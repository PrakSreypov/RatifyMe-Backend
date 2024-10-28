const express = require("express");
const router = express.Router();

const earnerControllers = require("../../controllers/earners/earnerControllers");
const earnerAchievementControllers = require("../../controllers/earners/earnerAchievementsController");

router.route("/").get(earnerControllers.getAll).post(earnerControllers.createOne);

router.route("/achievement/:earnerId").patch(earnerControllers.updateAchievementStatus);
router.route("/achievementById/:achievementId").get(earnerControllers.getOneAchievement);

router.route("/earnerAchievement").get(earnerAchievementControllers.getAll);
router
    .route("/earnerAchievement/:achievementId/earner/:earnerId")
    .get(earnerAchievementControllers.getOne);
router
    .route("/earnerAchievementByUid/:credId")
    .get(earnerAchievementControllers.getEarnerAchiveByUid);

router
    .route("/:id")
    .get(earnerControllers.getOne)
    .patch(earnerControllers.updateOne)
    .delete(earnerControllers.deleteOne);

module.exports = router;
