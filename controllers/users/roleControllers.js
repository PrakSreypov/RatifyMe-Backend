const Roles = require("../../models/Roles");

const BaseControllers = require("../../utils/baseControllers");

const uniqueFields = ["name"];
const roleControllers = new BaseControllers(Roles, uniqueFields);

module.exports = roleControllers;
