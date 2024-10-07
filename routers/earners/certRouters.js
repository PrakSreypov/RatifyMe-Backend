const { upload } = require("../../app");
const express = require("express");
const router = express.Router();
const { uploadCerti } = require("../../controllers/earners/certControllers");

router.route("/").post(upload.single("certFile"), uploadCerti);

module.exports = router
