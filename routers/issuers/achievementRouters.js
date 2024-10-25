const express = require("express");
const router = express.Router();

const achievementsControllers = require("../../controllers/issuers/achievementControllers");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/")
    .get(authMiddlewares.protect, achievementsControllers.getAll)
    .post(authMiddlewares.protect, achievementsControllers.createOne);

router
    .route("/:id")
    .get(authMiddlewares.protect, achievementsControllers.getOne)
    .patch(authMiddlewares.protect, achievementsControllers.updateOne)
    .delete(authMiddlewares.protect, achievementsControllers.deleteOne);

module.exports = router;
