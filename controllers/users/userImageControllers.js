const BaseController = require("../../utils/baseControllers");
const Users = require("../../models/Users");

const imageController = new BaseController(Users, [], [], "profileImage");
module.exports = imageController;
