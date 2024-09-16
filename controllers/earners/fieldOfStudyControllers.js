const FieldOfStudies = require("../../models/FieldOfStudies");
const BaseControllers = require("../../utils/baseControllers");

const fieldOfStudyControllers = new BaseControllers(FieldOfStudies, ["name"]);

module.exports = fieldOfStudyControllers;
