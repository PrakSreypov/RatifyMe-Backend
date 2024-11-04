const express = require("express");
const router = express.Router();

const earnerControllers = require("../../controllers/earners/earnerControllers");
const earnerAchievementControllers = require("../../controllers/earners/earnerAchievementsController");
const authMiddleware = require("../../middlewares/auth");

router
    .route("/")
    .get(authMiddleware.protect, earnerControllers.getAll)
    .post(authMiddleware.protect, earnerControllers.createOne);

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
