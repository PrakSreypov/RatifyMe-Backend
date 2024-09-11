const Genders = require("../../models/Genders");
const Roles = require("../../models/Roles");
const BaseController = require("../../utils/baseControllers");
const catchAsync = require("../../utils/catchAsync");
const { createSendToken } = require("../../middlewares/auth");

const Users = require("../../models/Users");
const AppError = require("../../utils/appError");
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
}

module.exports = new AuthControllers();
