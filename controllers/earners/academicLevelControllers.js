const AcademicLevels = require("../../models/AcademicLevels");
const BaseController = require("../../utils/baseControllers");

const academicLevelControllers = new BaseController(AcademicLevels);

module.exports = academicLevelControllers;
