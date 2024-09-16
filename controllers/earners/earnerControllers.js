const Earners = require("../../models/Earners");
const Users = require("../../models/Users");
const Achievements = require("../../models/Achievements");
const AcademicBackgrounds = require("../../models/AcademicBackgrounds");

const BaseControllers = require("../../utils/baseControllers");

const earnerControllers = new BaseControllers(Earners, [], [Users, Achievements, AcademicBackgrounds])
module.exports = earnerControllers;
