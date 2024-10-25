const express = require("express");
const router = express.Router();
const { upload } = require("../../app");

const institutionControllers = require("../../controllers/institutions/institutionControllers");
const instituImageControllers = require("../../controllers/institutions/instituImageControllers");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/")
    .get(authMiddlewares.protect, institutionControllers.getAll)
    .post(authMiddlewares.protect, institutionControllers.createOne)
    .delete(authMiddlewares.protect, institutionControllers.deleteAll);

router
    .route("/:id")
    .get(authMiddlewares.protect, institutionControllers.getOne)
    .patch(authMiddlewares.protect, institutionControllers.updateOne)
    .delete(authMiddlewares.protect, institutionControllers.deleteOne);

router.post("/instiImage", upload.single("institutionImg"), instituImageControllers.createOne);

router
    .route("/instiImage/:id")
    .get(authMiddlewares.protect, instituImageControllers.getOne)
    .put(upload.single("institutionImg"), instituImageControllers.updateImage)
    .delete(authMiddlewares.protect, instituImageControllers.deleteImage);

module.exports = router;
