const Institutions = require("../../models/Institutions");
const Users = require("../../models/Users");

const BaseControllers = require("../../utils/baseControllers");

const institutionControllers = new BaseControllers(
    Institutions,
    ["name", "stripeCustomerId"],
    [Users],
);

module.exports = institutionControllers;
