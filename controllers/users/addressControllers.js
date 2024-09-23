const Addresses = require("../../models/Addresses");
const Institutions = require("../../models/Institutions");
const Users = require("../../models/Users");
const Roles = require("../../models/Roles");
const Genders = require("../../models/Genders");

const BaseControllers = require("../../utils/baseControllers");

const addressControllers = new BaseControllers(
    Addresses,
    [],
    [
        {
            model: Users,
            include: [Roles, Genders, Addresses],
        },
        ,
        {
            model: Institutions,
            include: [Users],
        },
    ],
);

module.exports = addressControllers;
