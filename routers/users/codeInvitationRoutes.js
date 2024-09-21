const express = require("express");
const router = express.Router();
const codeInvitationControllers = require("../../controllers/auth/inviteIssuerControllers");

router.route("/inviteIssuer/:institutionId").post(codeInvitationControllers.inviteIssuer);

module.exports = router;
