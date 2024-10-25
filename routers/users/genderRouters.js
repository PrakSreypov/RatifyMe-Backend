const express = require("express");
const router = express.Router();

const genderControllers = require("../../controllers/users/genderControllers");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/")
    .get(authMiddlewares.protect, genderControllers.getAll)
    .post(authMiddlewares.protect, genderControllers.createOne);

router
    .route("/:id")
    .get(authMiddlewares.protect, genderControllers.getOne)
    .patch(authMiddlewares.protect, genderControllers.updateOne)
    .delete(authMiddlewares.protect, genderControllers.deleteOne);

module.exports = router;
