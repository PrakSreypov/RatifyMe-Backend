const express = require("express");
const router = express.Router();

const academicBackgroundControllers = require("../../controllers/earners/academicBackgroundControllers");

router
    .route("/")
    .get(academicBackgroundControllers.getAll)
    .post(academicBackgroundControllers.createOne);

router
    .route("/:id")
    .get(academicBackgroundControllers.getOne)
    .patch(academicBackgroundControllers.updateOne)
    .delete(academicBackgroundControllers.deleteOne);

router.route("/academicByUserId/:userId").get(academicBackgroundControllers.getAcademicByUserId);

module.exports = router;
