const express = require("express");
const router = express.Router();

const achievementTypesControllers = require("../../controllers/issuers/achievementTypeControllers");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/")
    .get(authMiddlewares.protect, achievementTypesControllers.getAll)
    .post(authMiddlewares.protect, achievementTypesControllers.createOne);

router
    .route("/:id")
    .get(authMiddlewares.protect, achievementTypesControllers.getOne)
    .patch(authMiddlewares.protect, achievementTypesControllers.updateOne)
    .delete(authMiddlewares.protect, achievementTypesControllers.deleteOne);

module.exports = router;
