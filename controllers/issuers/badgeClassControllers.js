const BadgeClasses = require("../../models/BadgeClasses");
const Issuers = require("../../models/Issuers");

const BaseControllers = require("../../utils/baseControllers");

const badgeClassControllers = new BaseControllers(BadgeClasses, ["name"], [Issuers]);

module.exports = badgeClassControllers;
