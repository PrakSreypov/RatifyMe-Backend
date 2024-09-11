const express = require("express");
const router = express.Router();

const authControllers = require("../../controllers/auth/authControllers");
const authMiddlewares = require("../../middlewares/auth");

router.route("/signup").post(authControllers.signup);
router.route("/signin").post(authControllers.signin);
router.route("/forgotPassword").post(authControllers.forgotPassword);
router.route("/resetPassword/:token").patch(authControllers.resetPassword);
router.route('/updatePassword').patch(authMiddlewares.protect, authControllers.updatePassword)

module.exports = router;
