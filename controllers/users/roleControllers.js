const BaseControllers = require("../../utils/baseControllers");
const Roles = require("../../models/Roles");

const uniqueFields = ["name"];
const roleControllers = new BaseControllers(Roles, uniqueFields);

module.exports = roleControllers;
