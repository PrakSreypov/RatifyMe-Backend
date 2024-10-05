const { Institutions, Issuers, Earners, InviteUsers, Roles } = require("../../models");

const CodeInvitationService = require("../../services/codeInvitationServices");
const BaseController = require("../../utils/baseControllers");

const institutionModel = Institutions;
const institutionParamName = "institutionId";
const issuerRoleId = 3;
const signupLinkIssuer = "http://localhost:5173/join-invitation?as=issuer";
const institutionCode = "code";
const institutionName = "institutionName";

const issuerModel = Issuers;
const issuerParamName = "issuerId";
const earnerRoleId = 4;
const signupLinkEarner = "http://localhost:5173/join-invitation?as=earner";
const issuerCode = "code";
const issuerName = "institutionName";
const earnerModel = Earners;

const inviteIssuerService = new CodeInvitationService(
    institutionModel,
    institutionParamName,
    issuerRoleId,
    signupLinkIssuer,
    institutionCode,
    institutionName,
    issuerModel,
);

const inviteEarnerService = new CodeInvitationService(
    issuerModel,
    issuerParamName,
    earnerRoleId,
    signupLinkEarner,
    issuerCode,
    issuerName,
    earnerModel,
);

// // Controller to handle inviting issuers
// exports.inviteIssuer = (req, res, next) => {
//     inviteIssuerService.sendInvitation(req, res, next);
// };

// exports.inviteEarner = (req, res, next) => {
//     inviteEarnerService.sendInvitation(req, res, next);
// };

// exports.verifyInvitation = (req, res, next) => {
//     const { as } = req.query;

//     if (as === "issuer") {
//         inviteIssuerService.verifyInvitation(req, res, next);
//     } else if (as === "earner") {
//         inviteEarnerService.verifyInvitation(req, res, next);
//     } else {
//         return res.status(400).json({
//             message:
//                 "Invalid role. Please specify 'as' query parameter as either 'issuer' or 'earner'.",
//         });
//     }
// };

class InviteUserControllers extends BaseController {
    constructor() {
        super(InviteUsers, [], [Roles]);
    }

    inviteIssuer = async (req, res, next) => {
        try {
            await inviteIssuerService.sendInvitation(req, res, next);
        } catch (error) {
            return res.status(500).json({ message: "Error inviting issuer", error: error.message });
        }
    };

    inviteEarner = async (req, res, next) => {
        try {
            await inviteEarnerService.sendInvitation(req, res, next);
        } catch (error) {
            return res.status(500).json({ message: "Error inviting earner", error: error.message });
        }
    };

    verifyInvitation = (req, res, next) => {
        const { as } = req.query;

        if (as === "issuer") {
            inviteIssuerService.verifyInvitation(req, res, next);
        } else if (as === "earner") {
            inviteEarnerService.verifyInvitation(req, res, next);
        } else {
            return res.status(400).json({
                message:
                    "Invalid role. Please specify 'as' query parameter as either 'issuer' or 'earner'.",
            });
        }
    };
}

module.exports = new InviteUserControllers();
