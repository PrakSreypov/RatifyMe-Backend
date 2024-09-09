const AcademicLevels = require("../../models/AcademicLevels");
const BaseControllers = require("../../utils/baseControllers");

const academicLevelControllers = new BaseControllers(AcademicLevels);

module.exports = academicLevelControllers;
