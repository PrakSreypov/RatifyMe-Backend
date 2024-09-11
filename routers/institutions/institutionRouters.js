const express = require("express");
const router = express.Router();

const institutionControllers = require("../../controllers/institutions/institutionControllers");

router.route("/").get(institutionControllers.getAll).post(institutionControllers.createOne);

router
    .route("/:id")
    .get(institutionControllers.getOne)
    .patch(institutionControllers.updateOne)
    .delete(institutionControllers.deleteOne);

module.exports = router;
