const express = require("express");
const router = express.Router();

const authControllers = require("../../controllers/auth/authControllers");

router.route("/signup").post(authControllers.signup);

module.exports = router;
