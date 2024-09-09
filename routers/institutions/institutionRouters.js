const express = require("express");
const institutionController = require("../../controllers/institution/institutionControllers");
const router = express.Router();

router.route("/").get(institutionController.getAll).post(institutionController.createOne);

router
    .route("/:id")
    .get(institutionController.getOne)
    .patch(institutionController.updateOne)
    .delete(institutionController.deleteOne);

module.exports = router;
