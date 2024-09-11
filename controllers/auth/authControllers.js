const crypto = require("crypto");
const { Op } = require("sequelize");

const BaseController = require("../../utils/baseControllers");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const { createSendToken } = require("../../middlewares/auth");
const sendEmail = require("../../services/email");

const Users = require("../../models/Users");
const Genders = require("../../models/Genders");
const Roles = require("../../models/Roles");

const uniqueFields = ["email", "username", "phoneNumber"];
const associations = [Roles, Genders];

class AuthControllers extends BaseController {
    constructor() {
        super(Users, uniqueFields, associations);
    }

    // ============ Start Signup controller ============
    signup = catchAsync(async (req, res, next) => {
        const user = req.body;

        await this.checkUniqueFields(user);

        const newUser = await Users.create(user);
        createSendToken(newUser, 201, res);
    });
    // ============ End Signup controller ============

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
            return next(new AppError("There is no user with that email address.", 404));
        }
        // Generate the random reset token
        const resetToken = user.createPasswordResetToken();
        await user.save({ validate: false }); // Save the reset token and expiry to the DB

        // Send it to user's email
        const resetURL = `${req.protocol}://${req.get(
            "host",
        )}/api/v1/users/resetPassword/${resetToken}`;
        const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email.`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Your password reset token (valid for 10 min)",
                message,
            });

            res.status(200).json({
                status: "success",
                message: "Token sent to email",
            });
        } catch (error) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validate: false }); // Save without the token if email fails

            return next(
                new AppError("There was an error sending the email. Try again later!", 500),
            );
        }
    });
    // ============ End Forgot Password controller   ============

    // ============ Start Reset Password controller   ============
    resetPassword = catchAsync(async (req, res, next) => {
        const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
        const user = await Users.findOne({
            where: {
                passwordResetToken: hashedToken,
                passwordResetExpires: { [Op.gt]: Date.now() },
            },
        });

        if (!user) {
            return next(new AppError("Token is invalid or has expired", 400));
        }
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validate: false });

        createSendToken(user, 200, res);
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

        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        await user.save({ validate: true });

        createSendToken(user, 200, res);
    });
    // ============ End Update Password controller     ============
}

module.exports = new AuthControllers();
