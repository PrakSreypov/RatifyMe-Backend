const express = require("express");
const router = express.Router();

const inviteUserControllers = require("../../controllers/auth/inviteUserControllers");

router.route("/inviteIssuer/:institutionId").post(inviteUserControllers.inviteIssuer);
router.route("/inviteEarner/:issuerId").post(inviteUserControllers.inviteEarner);
router.route("/invitedUser").get(inviteUserControllers.getAll);
router.route("/invitedUser/:id").delete(inviteUserControllers.deleteOne);
router.route("/resendInviteIssuer/:institutionId").patch(inviteUserControllers.resendInviteIssuer);
router.route("/resendInviteEarner/:issuerId").patch(inviteUserControllers.resendInviteEarner);

module.exports = router;
