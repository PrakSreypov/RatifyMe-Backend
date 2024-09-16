const AcademicBackgrounds = require("../../models/AcademicBackgrounds");
const Institutions = require("../../models/Institutions");
const FieldOfStudies = require("../../models/FieldOfStudies");
const AcademicLevels = require("../../models/AcademicLevels");
const Users = require("../../models/Users");

const BaseControllers = require("../../utils/baseControllers");

const academicBackgroundsControllers = new BaseControllers(AcademicBackgrounds, [], [Institutions, FieldOfStudies, AcademicLevels, Users])
module.exports = academicBackgroundsControllers;
