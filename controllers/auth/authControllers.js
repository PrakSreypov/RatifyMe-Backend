const Genders = require("../../models/Genders");
const Roles = require("../../models/Roles");
const BaseController = require("../../utils/baseControllers");
const catchAsync = require("../../utils/catchAsync");
const { createSendToken } = require("../../middlewares/auth");

const Users = require("../../models/Users");
const uniqueFields = ["email", "username", "phoneNumber"];
const associations = [Roles, Genders];

class AuthControllers extends BaseController {
    constructor() {
        super(Users, uniqueFields, associations);
    }

    signup = catchAsync(async (req, res, next) => {
        const user = req.body;

        await this.checkUniqueFields(user);

        const newUser = await Users.create(user);
        createSendToken(newUser, 201, res);
    });
}

module.exports = new AuthControllers();
