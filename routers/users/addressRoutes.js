const express = require("express");
const router = express.Router();

const addressControllers = require("../../controllers/users/addressControllers");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/")
    .post(authMiddlewares.protect, addressControllers.createOne)
    .get(authMiddlewares.protect, addressControllers.getAll);

router
    .route("/:id")
    .get(authMiddlewares.protect, addressControllers.getOne)
    .patch(authMiddlewares.protect, addressControllers.updateOne)
    .delete(authMiddlewares.protect, addressControllers.deleteOne);

module.exports = router;
