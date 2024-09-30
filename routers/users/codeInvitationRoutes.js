const express = require("express");
const router = express.Router();
const inviteUserControllers = require("../../controllers/auth/inviteUserControllers");

router.route("/inviteIssuer/:institutionId").post(inviteUserControllers.inviteIssuer);
router.route("/inviteEarner/:issuerId").post(inviteUserControllers.inviteEarner);
// router.route("/invitedUser").get(inviteUserControllers.getAll);

module.exports = router;
