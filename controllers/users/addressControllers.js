const Addresses = require("../../models/Addresses");
const Institutions = require("../../models/Institutions");
const Users = require("../../models/Users");

const BaseControllers = require("../../utils/baseControllers");

const addressControllers = new BaseControllers(Addresses, [], [Users, Institutions]);

module.exports = addressControllers;
