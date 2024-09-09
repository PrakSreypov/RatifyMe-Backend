const express = require("express");
const router = express.Router();

const courseControllers = require("../../controllers/earners/courseControllers");

router.route("/").get(courseControllers.getAll).post(courseControllers.createOne);

router
    .route("/:id")
    .get(courseControllers.getOne)
    .patch(courseControllers.updateOne)
    .delete(courseControllers.deleteOne);

module.exports = router;
