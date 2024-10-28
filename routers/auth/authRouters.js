const express = require("express");
const router = express.Router();

const authControllers = require("../../controllers/auth/authControllers");
const authMiddlewares = require("../../middlewares/auth");

router.route("/checkAuth").get(authMiddlewares.isLoggedIn, authControllers.checkAuth);

router.route("/signup").post(authControllers.signup);
router.route("/verifyEmail").post(authControllers.verifyEmail);
router.route("/resendVerification").post(authControllers.resendVerificationEmail);
router.route("/signin").post(authControllers.signin);
router.route("/forgotPassword").post(authControllers.forgotPassword);
router.route("/verifyResetToken/:token").get(authControllers.verifyResetToken);
router.route("/resetPassword/:token").patch(authControllers.resetPassword);
router.route("/updatePassword").patch(authMiddlewares.protect, authControllers.updatePassword);
router.route("/logout").post(authControllers.logout);

module.exports = router;
