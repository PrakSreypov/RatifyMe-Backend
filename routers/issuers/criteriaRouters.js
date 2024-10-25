const express = require("express");
const router = express.Router();

const criteriaControllers = require("../../controllers/issuers/criteriaControllers");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/")
    .get(authMiddlewares.protect, criteriaControllers.getAll)
    .post(authMiddlewares.protect, criteriaControllers.createOne);

router
    .route("/:id")
    .get(authMiddlewares.protect, criteriaControllers.getOne)
    .patch(authMiddlewares.protect, criteriaControllers.updateOne)
    .delete(authMiddlewares.protect, criteriaControllers.deleteOne);

module.exports = router;
