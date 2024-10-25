const express = require("express");
const router = express.Router();

const inviteUserControllers = require("../../controllers/auth/inviteUserControllers");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/inviteIssuer/:institutionId")
    .post(authMiddlewares.protect, inviteUserControllers.inviteIssuer);
router
    .route("/inviteEarner/:issuerId")
    .post(authMiddlewares.protect, inviteUserControllers.inviteEarner);
router.route("/invitedUser").get(authMiddlewares.protect, inviteUserControllers.getAll);
router.route("/invitedUser/:id").delete(authMiddlewares.protect, inviteUserControllers.deleteOne);
router
    .route("/resendInviteIssuer/:institutionId")
    .patch(authMiddlewares.protect, inviteUserControllers.resendInviteIssuer);
router
    .route("/resendInviteEarner/:issuerId")
    .patch(authMiddlewares.protect, inviteUserControllers.resendInviteEarner);

module.exports = router;
