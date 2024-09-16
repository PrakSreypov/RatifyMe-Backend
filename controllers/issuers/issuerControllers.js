const Issuers = require("../../models/Issuers");
const Users = require("../../models/Users");
const Institutions = require("../../models/Institutions");

const BaseControllers = require("../../utils/baseControllers");

const issuerControllers = new BaseControllers(Issuers, [], [Users, Institutions]);

module.exports = issuerControllers;
