const jwt = require("jsonwebtoken");
const Genders = require("../../models/Genders");
const Roles = require("../../models/Roles");
const BaseController = require("../../utils/baseControllers");
const catchAsync = require("../../utils/catchAsync");

const Users = require("../../models/Users");
const uniqueFields = ["email", "username", "phoneNumber"];
const associations = [Roles, Genders];

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

class AuthController extends BaseController {
    constructor() {
        super(Users, uniqueFields, associations);
    }

    signup = catchAsync(async (req, res, next) => {
        const user = req.body;

        await this.checkUniqueFields(user)

        const newUser = await Users.create({ ...user });
        const token = signToken(newUser.id);

        res.status(201).json({
            status: "success",
            token,
            newUser,
        });
    });
}

module.exports = new AuthController();
