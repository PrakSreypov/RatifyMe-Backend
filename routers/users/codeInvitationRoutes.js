const express = require("express");
const router = express.Router();

const inviteUserControllers = require("../../controllers/auth/inviteUserControllers");
const authMiddleware = require("../../middlewares/auth");

router.route("/inviteIssuer/:institutionId").post(authMiddleware.protect, inviteUserControllers.inviteIssuer);
router.route("/inviteEarner/:issuerId").post(authMiddleware.protect, inviteUserControllers.inviteEarner);
router.route("/invitedUser").get(authMiddleware.protect, inviteUserControllers.getAll);
router.route("/invitedUser/:id").delete(authMiddleware.protect, inviteUserControllers.deleteOne);
router.route("/resendInviteIssuer/:institutionId").patch(authMiddleware.protect, inviteUserControllers.resendInviteIssuer);
router.route("/resendInviteEarner/:issuerId").patch(authMiddleware.protect, inviteUserControllers.resendInviteEarner);

module.exports = router;
