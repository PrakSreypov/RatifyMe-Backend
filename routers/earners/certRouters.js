const { upload } = require("../../app");
const express = require("express");
const router = express.Router();

const certContollers = require("../../controllers/earners/certControllers");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/:achievementId/earner/:earnerId")
    .post(authMiddlewares.protect, upload.single("certFile"), certContollers.uploadCerti);

module.exports = router;
