const express = require("express");
const router = express.Router();

const academicBackgroundControllers = require("../../controllers/earners/academicBackgroundControllers");
const authMiddleware = require("../../middlewares/auth");

router
    .route("/")
    .get(authMiddleware.protect, academicBackgroundControllers.getAll)
    .post(authMiddleware.protect, academicBackgroundControllers.createOne);

router
    .route("/:id")
    .get(authMiddleware.protect, academicBackgroundControllers.getOne)
    .patch(authMiddleware.protect, academicBackgroundControllers.updateOne)
    .delete(authMiddleware.protect, academicBackgroundControllers.deleteOne);

router.route("/academicByUserId/:userId").get(academicBackgroundControllers.getAcademicByUserId);

module.exports = router;
