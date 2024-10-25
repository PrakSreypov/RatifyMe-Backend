const express = require("express");
const router = express.Router();

const academicBackgroundControllers = require("../../controllers/earners/academicBackgroundControllers");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/")
    .get(authMiddlewares.protect, academicBackgroundControllers.getAll)
    .post(authMiddlewares.protect, academicBackgroundControllers.createOne);

router
    .route("/:id")
    .get(authMiddlewares.protect, academicBackgroundControllers.getOne)
    .patch(authMiddlewares.protect, academicBackgroundControllers.updateOne)
    .delete(authMiddlewares.protect, academicBackgroundControllers.deleteOne);

router.route("/academicByUserId/:userId").get(authMiddlewares.protect, academicBackgroundControllers.getAcademicByUserId);

module.exports = router;
