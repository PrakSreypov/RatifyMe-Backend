const express = require("express");
const router = express.Router();
const { upload } = require("../../app");

const institutionControllers = require("../../controllers/institutions/institutionControllers");
const instituImageControllers = require("../../controllers/institutions/instituImageControllers");

router
    .route("/")
    .get(institutionControllers.getAll)
    .post(institutionControllers.createOne)
    .delete(institutionControllers.deleteAll);

router
    .route("/:id")
    .get(institutionControllers.getOne)
    .patch(institutionControllers.updateOne)
    .delete(institutionControllers.deleteOne);

router.post("/instiImage", upload.single("institutionImg"), instituImageControllers.createOne);

router
    .route("/instiImage/:id")
    .get(instituImageControllers.getOne)
    .put(upload.single("institutionImg"), instituImageControllers.updateImage)
    .delete(instituImageControllers.deleteImage);

module.exports = router;
