const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth/authControllers");

router.route("/signup").post(authController.signup);

module.exports = router;
