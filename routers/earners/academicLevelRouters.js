const express = require("express");
const router = express.Router();

const academicLevelControllers = require("../../controllers/earners/academicLevelControllers");

router.route("/").get(academicLevelControllers.getAll).post(academicLevelControllers.createOne);

router
    .route("/:id")
    .get(academicLevelControllers.getOne)
    .patch(academicLevelControllers.updateOne)
    .delete(academicLevelControllers.deleteOne);

module.exports = router;
