const Issuers = require("../../models/Issuers");
const Users = require("../../models/Users");
const Institutions = require("../../models/Institutions");
const Roles = require("../../models/Roles");
const Genders = require("../../models/Genders");
const Addresses = require("../../models/Addresses");
const BaseControllers = require("../../utils/baseControllers");
const BadgeClasses = require("../../models/BadgeClasses");

const issuerControllers = new BaseControllers(
    Issuers,
    [],
    [
        {
            model: Users,
            include: [Roles, Genders, Addresses],
        },
        {
            model: Institutions,
            include: [Users],
        },
        { model: BadgeClasses },
    ],
);

module.exports = issuerControllers;
