const express = require("express");
const router = express.Router();

const academicLevelControllers = require("../../controllers/earners/academicLevelControllers");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/")
    .get(authMiddlewares.protect, academicLevelControllers.getAll)
    .post(authMiddlewares.protect, academicLevelControllers.createOne);

router
    .route("/:id")
    .get(authMiddlewares.protect, academicLevelControllers.getOne)
    .patch(authMiddlewares.protect, academicLevelControllers.updateOne)
    .delete(authMiddlewares.protect, academicLevelControllers.deleteOne);

module.exports = router;
