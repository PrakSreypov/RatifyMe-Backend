const express = require("express");
const router = express.Router();

const fieldOfStudyControllers = require("../../controllers/earners/fieldOfStudyControllers");

router.route("/").get(fieldOfStudyControllers.getAll).post(fieldOfStudyControllers.createOne);

router
    .route("/:id").get(fieldOfStudyControllers.getOne)
    .patch(fieldOfStudyControllers.updateOne)
    .delete(fieldOfStudyControllers.deleteOne);

module.exports = router;
