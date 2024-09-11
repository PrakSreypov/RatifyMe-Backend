const express = require("express");
const router = express.Router();

const authControllers = require("../../controllers/auth/authControllers");

router.route("/signup").post(authControllers.signup);
router.route("/signin").post(authControllers.signin);
router.route("/forgotPassword").post(authControllers.forgotPassword);

module.exports = router;
