const express = require("express");
const router = express.Router();

const specializationControllers = require("../../controllers/earners/specializationControllers");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/")
    .get(authMiddlewares.protect, specializationControllers.getAll)
    .post(authMiddlewares.protect, specializationControllers.createOne);

router
    .route("/:id")
    .get(authMiddlewares.protect, specializationControllers.getOne)
    .patch(authMiddlewares.protect, specializationControllers.updateOne)
    .delete(authMiddlewares.protect, specializationControllers.deleteOne);

module.exports = router;
