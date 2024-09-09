const express = require("express");
const router = express.Router();

const SpecificationControllers = require("../../controllers/earners/specificationControllers");

router.route("/").get(SpecificationControllers.getAll).post(SpecificationControllers.createOne);

router
    .route("/:id")
    .get(SpecificationControllers.getOne)
    .patch(SpecificationControllers.updateOne)
    .delete(SpecificationControllers.deleteOne);

module.exports = router;
