const express = require("express");
const router = express.Router();

const fieldOfStudyControllers = require("../../controllers/earners/fieldOfStudyControllers");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/")
    .get(authMiddlewares.protect, fieldOfStudyControllers.getAll)
    .post(authMiddlewares.protect, fieldOfStudyControllers.createOne);

router
    .route("/:id")
    .get(authMiddlewares.protect, fieldOfStudyControllers.getOne)
    .patch(authMiddlewares.protect, fieldOfStudyControllers.updateOne)
    .delete(authMiddlewares.protect, fieldOfStudyControllers.deleteOne);

module.exports = router;
