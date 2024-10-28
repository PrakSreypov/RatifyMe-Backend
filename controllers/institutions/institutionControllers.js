const Institutions = require("../../models/Institutions");
const Users = require("../../models/Users");
const Roles = require("../../models/Roles");
const Genders = require("../../models/Genders");
const Addresses = require("../../models/Addresses");
const BaseControllers = require("../../utils/baseControllers");
const { Issuers, BadgeClasses } = require("../../models");

const institutionControllers = new BaseControllers(
    Institutions,
    ["name", "stripeCustomerId"],
    [
        {
            model: Users,
            include: [Roles, Genders, Addresses],
        },
        {
            model: Issuers,
            include: [
                { model: BadgeClasses, attributes: ["id", "name", "imageUrl"] },
            ],
        },
    ],
);

module.exports = institutionControllers;
