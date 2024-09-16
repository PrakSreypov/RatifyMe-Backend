const Institutions = require("../../models/Institutions");
const BaseControllers = require("../../utils/baseControllers");
const Users = require("../../models/Users");

const institutionControllers = new BaseControllers(
    Institutions,
    ["name", "stripeCustomerId"],
    [Users],
);

module.exports = institutionControllers;
