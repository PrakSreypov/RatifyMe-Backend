const express = require("express");
const institutionControllers = require("../../controllers/institutions/institutionControllers");
const router = express.Router();

router.route("/").get(institutionControllers.getAll).post(institutionControllers.createOne);

router
    .route("/:id")
    .get(institutionControllers.getOne)
    .patch(institutionControllers.updateOne)
    .delete(institutionControllers.deleteOne);

module.exports = router;
