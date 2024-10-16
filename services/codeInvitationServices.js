const EmailService = require("./mailServices");
const { inviteCodeTemplate } = require("../public/templates/inviteCodeTemplate");
const { InviteUsers, Users } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { Op, where } = require("sequelize");
const { generateVerificationCode } = require("../utils/auth/generateVerificationCode");

class CodeInvitationService {
    constructor(
        inviterModel,
        inviterParamName,
        roleId,
        signupLink,
        inviterCode,
        inviterName,
        guestModel,
    ) {
        this.inviterModel = inviterModel;
        this.inviterParamName = inviterParamName;
        this.roleId = roleId;
        this.signupLink = signupLink;
        this.inviterCode = inviterCode;
        this.inviterName = inviterName;
        this.guestModel = guestModel;
    }

    sendInvitation = catchAsync(async (req, res, next) => {
        const { email } = req.body;
        const inviterId = req.params[this.inviterParamName];

        // Find institution by ID
        const inviter = await this.inviterModel.findByPk(inviterId);

        if (!inviter) {
            return next(new AppError("Inviter not found", 404));
        }

        const inviterCodeValues = inviter[this.inviterCode];
        const inviterNameValue = inviter[this.inviterName];

        // Check if the inviteEmail exists and if the invite has not yet expired
        const existGuest = await InviteUsers.findOne({
            where: {
                inviteEmail: email,
                inviteExpires: { [Op.gt]: Date.now() },
                inviterCode: inviterCodeValues,
            },
        });

        if (existGuest) {
            return next(new AppError("This email has already been invited."));
        }

        const existAccount = await Users.findOne({ where: { email: email } });

        if (existAccount) {
            let errorMessage;

            // Determine the error message based on the roleId
            switch (existAccount.roleId) {
                case 3:
                    errorMessage = "Account already an issuer";
                    break;
                case 4:
                    errorMessage = "Account already an earner";
                    break;
                default:
                    errorMessage = "Account already has a specific role";
            }

            return next(new AppError(errorMessage));
        }

        // Create an invitation in the database
        const guest = await InviteUsers.create({
            inviteEmail: email,
            roleId: this.roleId,
            inviterCode: inviterCodeValues,
        });

        // Prepare the invite email template dynamically
        const emailTemplate = inviteCodeTemplate
            .replace(/\[Institution Name\]/g, inviterNameValue)
            .replace("[Badge Platform]", "RatifyMe")
            .replace("[INVITE CODE]", inviterCodeValues)
            .replace("[SIGNUP_LINK]", this.signupLink)
            .replace("[Badge Platform Name]", "RatifyMe");

        // Send the email using the email service
        const emailService = new EmailService();
        await emailService.sendInviteCode(email, emailTemplate);

        // Return success response
        res.status(200).json({
            message: `Invitation sent to ${email} successfully!`,
            guest,
            inviter,
        });
    });

    verifyInvitation = catchAsync(async (req, res, next) => {
        const { inviteEmail, inviterCode } = req.body;

        const guest = await InviteUsers.findOne({
            where: {
                inviterCode,
                inviteEmail,
                inviteExpires: { [Op.gt]: Date.now() },
            },
        });

        // Check if the invite email exists
        if (!guest) {
            const codeExists = await InviteUsers.findOne({ where: { inviterCode } });
            const emailExists = await InviteUsers.findOne({ where: { inviteEmail } });

            // Handle the case where both inviter code and email are invalid
            if (!codeExists && !emailExists) {
                return next(
                    new AppError(
                        `Both inviter code '${inviterCode}' and email '${inviteEmail}' are invalid.`,
                        400,
                    ),
                );
            }

            // Handle case where only the inviter code is invalid
            if (!codeExists) {
                return next(new AppError(`The inviter code '${inviterCode}' is invalid.`, 400));
            }

            // Handle case where only the invite email is invalid or expired
            if (!emailExists) {
                return next(
                    new AppError(`The invitation for email '${inviteEmail}' is invalid.`, 400),
                );
            }

            return next(
                new AppError(`The invitation for email '${inviteEmail}' has expired.`, 400),
            );
        }

        // Retrieve inviter's info from Institutions based on the valid inviterCode
        const inviter = await this.inviterModel.findOne({
            where: { code: inviterCode },
        });

        // Check if inviter info is found
        if (!inviter) {
            return next(new AppError(`No inviter found for code '${inviterCode}'.`, 404));
        }

        const existingUser = await Users.findOne({
            where: { email: guest.inviteEmail },
        });

        if (existingUser) {
            if (existingUser.roleId === 4) {
                const existingIssuer = await this.guestModel.findOne({
                    where: { issuerId: inviter.id },
                });

                if (existingIssuer) {
                    return next(
                        new AppError(
                            "Your account already exists in this institution. Go to login to join your new issuer invitation.",
                            400,
                        ),
                    );
                }
                await this.guestModel.create({
                    userId: existingUser.id,
                    issuerId: inviter.id,
                });
            } else if (existingUser.roleId === 3) {
                const existingIssuer = await this.guestModel.findOne({
                    where: { institutionId: inviter.id },
                });

                if (existingIssuer) {
                    return next(
                        new AppError(
                            "Your account already exists in this institution. Go to login to join your new institution invitation.",
                            400,
                        ),
                    );
                }
                await this.guestModel.create({
                    userId: existingUser.id,
                    institutionId: inviter.id,
                    code: generateVerificationCode(),
                });
            }
        }

        // Mark the invitation as verified
        guest.status = true;
        guest.updatedAt = new Date();
        await guest.save({ validate: false });

        res.status(200).json({
            message: `Invitation verified successfully`,
            inviter: inviter,
            guest: guest,
            user: existingUser,
        });
    });
}

module.exports = CodeInvitationService;
