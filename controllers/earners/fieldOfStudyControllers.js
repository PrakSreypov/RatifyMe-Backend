const FieldOfStudies = require("../../models/FieldOfStudies");
const BaseControllers = require("../../utils/baseControllers");

const FieldOfStudyControllers = new BaseControllers(FieldOfStudies);

module.exports = FieldOfStudyControllers;
