const Genders = require("../../models/Genders");

const BaseControllers = require("../../utils/baseControllers");

const genderControllers = new BaseControllers(Genders, ["name"]);

module.exports = genderControllers;
