
const AcademicLevels = require("../../models/AcademicLevels");

const BaseControllers = require("../../utils/baseControllers");
const academicLevelControllers = new BaseControllers(AcademicLevels, ["name"]);

module.exports = academicLevelControllers;
