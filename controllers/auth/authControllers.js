const BaseController = require("../../utils/baseControllers");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const { createSendToken } = require("../../middlewares/auth");

const Users = require("../../models/Users");
const Genders = require("../../models/Genders");
const Roles = require("../../models/Roles");
const sequelize = require("../../configs/database");
const Addresses = require("../../models/Addresses");
const Institutions = require("../../models/Institutions");
const { generateVerificationCode } = require("../../utils/auth/generateVerificationCode");
const { Issuers, Earners } = require("../../models");
const EmailService = require("../../services/mailServices");
const { getUserFromToken } = require("../../utils/auth/getUserFromToken");
const { Op } = require("sequelize");

const uniqueFields = ["email", "username", "phoneNumber"];
const associations = [Roles, Genders];
const emailService = new EmailService();

class AuthControllers extends BaseController {
    constructor() {
        super(Users, uniqueFields, associations);
    }

    // ============ Start Signup controller ============
    signup = catchAsync(async (req, res, next) => {
        const {
            userData,
            addressData,
            institutionData,
            institutionAddressData,
            issuerData,
            earnerData,
        } = req.body;

        const transaction = await sequelize.transaction();

        try {
            // Check for unique fields
            await this.checkUniqueFields(userData);
            const verifyDigitNum = generateVerificationCode();

            // Create the user
            const newUser = await Users.create(
                {
                    ...userData,
                    verifyDigitNum,
                    verifyDigitNumExpires: Date.now() + 15 * 60 * 1000, // 10mn
                },
                { transaction },
            );

            if (!newUser || !newUser.id) {
                return next(new AppError("User creation failed.", 500));
            }

            const role = newUser.roleId;

            // Create address if address data exists
            if (addressData) {
                await Addresses.create({ ...addressData, userId: newUser.id }, { transaction });
            }

            // Handle different roles
            if (role === 2) {
                // If institution data exists, create the institution with userId
                const institutionCode = generateVerificationCode();
                const newInstitution = await Institutions.create(
                    { ...institutionData, userId: newUser.id, code: institutionCode },
                    { transaction },
                );

                // If institution address data exists, create institution address
                if (institutionAddressData) {
                    await Addresses.create(
                        { ...institutionAddressData, institutionId: newInstitution.id },
                        { transaction },
                    );
                }
            } else if (role === 3) {
                const { institutionId } = issuerData;
                const issuerCode = generateVerificationCode();

                // Check that institutionId is provided for the Issuer role
                if (!issuerData || !institutionId) {
                    return next(new AppError("Institution ID or Issuer data is missing.", 400));
                }

                // Verify that the institution exists using the institutionId
                const institution = await Institutions.findByPk(institutionId, { transaction });
                if (!institution) {
                    return next(
                        new AppError(`Institution with ID ${institutionId} not found.`, 404),
                    );
                }

                // Create the issuer with the userId and institutionId
                await Issuers.create(
                    {
                        ...issuerData,
                        userId: newUser.id,
                        institutionId: institution.id,
                        code: issuerCode,
                    },
                    { transaction },
                );
            } else if (role === 4) {
                const { issuerId } = earnerData;

                // Check that institutionId is provided for the Issuer role
                if (!earnerData || !issuerId) {
                    return next(new AppError("Issuer ID or Issuer data is missing.", 400));
                }

                // Verify that the issuer exists using the issuerId
                const issuer = await Issuers.findByPk(issuerId, { transaction });
                if (!issuer) {
                    return next(new AppError(`Issuer with ID ${issuerId} not found.`, 404));
                }

                // Create the earner with the userId and issuerId
                await Earners.create(
                    {
                        ...earnerData,
                        userId: newUser.id,
                        issuerId,
                    },
                    { transaction },
                );
            }

            // Commit the transaction once all operations are successful
            await transaction.commit();

            try {
                await emailService.sendVerificationEmail(userData.email, verifyDigitNum);
            } catch (emailError) {
                return next(new AppError("Failed to send verification email.", 500));
            }

            // Send the response with full user data
            res.status(201).json({
                status: "Account Created.",
                data: {
                    userData,
                    addressData,
                    institutionData,
                    issuerData,
                    earnerData,
                },
            });
        } catch (error) {
            // Rollback transaction if it hasn't been committed yet
            if (!transaction.finished) {
                await transaction.rollback();
            }
            return next(error);
        }
    });

    // ============ End Signup controller ============

    // ============ Start Verify Email controller ============
    verifyEmail = catchAsync(async (req, res, next) => {
        const { verifyCode } = req.body;

        const user = await Users.findOne({
            where: {
                verifyDigitNum: verifyCode,
                verifyDigitNumExpires: { [Op.gt]: Date.now() },
            },
        });

        if (!user) {
            return next(new AppError("Verification code is invalid or has expired."));
        }

        user.isVerified = true;
        user.active = true;
        user.verifyDigitNum = undefined;
        user.verifyDigitNumExpires = undefined;
        await user.save();

        res.status(200).json({
            status: "Account Verified.",
            data: user,
        });
    });
    // ============ End Verify Email controller   ============

    // ============ Start Signin controller ============
    signin = catchAsync(async (req, res, next) => {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return next(new AppError("Please provide both email and password", 400));
        }

        const user = await Users.scope("withPassword").findOne({
            where: { email },
        });

        // Check if the user exists and if the provided password is correct
        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError("Incorrect email or password", 401));
        }

        createSendToken(user, 200, res);
    });
    // ============ End Signin controller ============

    // ============ Start Forgot Password controller ============
    forgotPassword = catchAsync(async (req, res, next) => {
        // Get User based on POST email
        const user = await Users.findOne({
            where: { email: req.body.email },
        });

        if (!user) {
            return next(
                new AppError(
                    "Account not found. Please check the email or register for a new account.",
                    404,
                ),
            );
        }
        // Generate the random reset token
        const resetToken = user.createPasswordResetToken();
        await user.save({ validate: false });

        // Send to user's email
        const resetURL = `${process.env.CLIENT_BASE_URL}/reset-password/${resetToken}`;

        try {
            await emailService.sendPasswordResetEmail(user.email, resetURL);

            res.status(200).json({
                status: "success",
                message: "Token sent to email",
            });
        } catch (error) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validate: false });

            return next(
                new AppError("There was an error sending the email. Try again later!", 500),
            );
        }
    });
    // ============ End Forgot Password controller   ============

    // ============ Start Verify Reset token controller ============
    verifyResetToken = catchAsync(async (req, res, next) => {
        const user = await getUserFromToken(req.params.token);

        if (!user) {
            return next(new AppError("Token is invalid or has expired", 400));
        }

        // If token is valid, respond with success
        res.status(200).json({
            status: "success",
            message: "Token is valid",
            data: user,
        });
    });
    // ============ End  Verify Reset token controller  ============

    // ============ Start Reset Password controller   ============
    resetPassword = catchAsync(async (req, res, next) => {
        const user = await getUserFromToken(req.params.token);

        if (!user) {
            return next(new AppError("Token is invalid or has expired", 400));
        }

        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validate: false });

        res.status(200).json({
            status: "Reset password successfully",
            data: user,
        });
    });

    // ============ End Reset Password controller     ============

    // ============ Start Update Password controller   ============
    updatePassword = catchAsync(async (req, res, next) => {
        const user = await Users.scope("withPassword").findByPk(req.user.id);

        if (!user) {
            return next(new AppError("User not found", 404));
        }

        if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
            return next(new AppError("Your current password is wrong.", 401));
        }

        user.password = req.body.newPassword;
        user.passwordConfirm = req.body.passwordConfirm;
        await user.save({ validate: true });

        createSendToken(user, 200, res);
    });
    // ============ End Update Password controller     ============

    // ============ Start Logout controller ============
    logout = (req, res, next) => {
        res.cookie("jwt", "loggedout", {
            expires: new Date(Date.now() - 10 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/",
        });
        res.status(200).json({
            status: "success",
            message: "Successfully logged out",
        });
    };
    // ============ End Logout controller   ============

    // ============ Start Check Auth controller   ============
    checkAuth = catchAsync(async (req, res, next) => {
        const user = res.locals.user;

        // const user = await Users.findByPk(req.body.id)
        if (!user) {
            return next(new AppError("User not found!", 404));
        }

        res.status(200).json({ user });
    });
    // ============ End Check Auth controller     ============
}

module.exports = new AuthControllers();
