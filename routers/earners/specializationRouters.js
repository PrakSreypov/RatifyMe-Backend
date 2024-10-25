const express = require("express");
const router = express.Router();

const specializationControllers = require("../../controllers/earners/specializationControllers");

router.route("/").get(specializationControllers.getAll).post(specializationControllers.createOne);

router
    .route("/:id")
    .get(specializationControllers.getOne)
    .patch(specializationControllers.updateOne)
    .delete(specializationControllers.deleteOne);

module.exports = router;
