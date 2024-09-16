const Specializations = require("../../models/Specializations");
const FieldOfStudies = require("../../models/FieldOfStudies");

const BaseControllers = require("../../utils/baseControllers");

const specializationsControllers = new BaseControllers(Specializations,["name"], [FieldOfStudies])
module.exports = specializationsControllers;
