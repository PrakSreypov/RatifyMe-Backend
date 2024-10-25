const express = require("express");
const router = express.Router();

const criteriaControllers = require("../../controllers/issuers/criteriaControllers");

router.route("/").get(criteriaControllers.getAll).post(criteriaControllers.createOne);

router
    .route("/:id")
    .get(criteriaControllers.getOne)
    .patch(criteriaControllers.updateOne)
    .delete(criteriaControllers.deleteOne);

module.exports = router;
