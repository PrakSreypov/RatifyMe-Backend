const Earners = require("../../models/Earners");
const Users = require("../../models/Users");
const Achievements = require("../../models/Achievements");
const AcademicBackgrounds = require("../../models/AcademicBackgrounds");
const BadgeClasses = require("../../models/BadgeClasses");
const Roles = require("../../models/Roles");
const BaseControllers = require("../../utils/baseControllers");
const AcademicLevels = require("../../models/AcademicLevels")
const Institutions = require("../../models/Institutions")
const earnerControllers = new BaseControllers(
    Earners,
    [],
    [
        {
            model: Users,
            include: [Roles],
        },
        Achievements,
        {
            model: AcademicBackgrounds,
            include: [AcademicLevels]
        },
        {
            model: AcademicBackgrounds,
            include: [Institutions]
        },
        {
            model: Achievements,
            include: [BadgeClasses],
        },
    ],
);
module.exports = earnerControllers;