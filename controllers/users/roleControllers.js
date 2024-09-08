const BaseController = require("../../utils/baseControllers");
const Roles = require("../../models/Roles");

const uniqueFields = ["name"];
const roleControllers = new BaseController(Roles, uniqueFields);

module.exports = roleControllers;
