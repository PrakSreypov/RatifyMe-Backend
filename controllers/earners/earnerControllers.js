const Earners = require("../../models/Earners");
const Users = require("../../models/Users");
const Achievements = require("../../models/Achievements");
const AcademicBackgrounds = require("../../models/AcademicBackgrounds");
const BadgeClasses = require("../../models/BadgeClasses");
const Roles = require("../../models/Roles");
const Genders = require("../../models/Genders");
const BaseControllers = require("../../utils/baseControllers");
const AcademicLevels = require("../../models/AcademicLevels");
const Institutions = require("../../models/Institutions");
const AchievementTypes = require("../../models/AchievementTypes");
const Addresses = require("../../models/Addresses");
const Issuers = require("../../models/Issuers");
const earnerControllers = new BaseControllers(
    Earners,
    [],
    [
        {
            model: Users,
            include: [Roles, Genders, Addresses],
        },
        {
            model: AcademicBackgrounds,
            include: [AcademicLevels, Institutions],
        },
        {
            model: Achievements,
            include: [BadgeClasses, AchievementTypes],
        },
        {
            model: Issuers,
            include: [Users, Institutions]
        }
    ],
);
module.exports = earnerControllers;

// const Earners = require("../../models/Earners");
// const Users = require("../../models/Users");
// const Achievements = require("../../models/Achievements");
// const AcademicBackgrounds = require("../../models/AcademicBackgrounds");
// const BadgeClasses = require("../../models/BadgeClasses");
// const Roles = require("../../models/Roles");
// const Genders = require("../../models/Genders");
// const BaseControllers = require("../../utils/baseControllers");
// const AcademicLevels = require("../../models/AcademicLevels");
// const Institutions = require("../../models/Institutions");
// const AchievementTypes = require("../../models/AchievementTypes");
// const Addresses = require("../../models/Addresses");
// const Issuers = require("../../models");

// const earnerControllers = new BaseControllers(
//     Earners,
//     [],
//     [
//         {
//             model: Users,
//             include: [Roles, Genders, Addresses],
//         },
//         {
//             model: AcademicBackgrounds,
//             include: [AcademicLevels, Institutions],
//         },
//         {
//             model: Achievements,
//             include: [BadgeClasses, AchievementTypes],
//         },
//         {
//             model: Issuers,
//             include: [Users, Institutions],
//         },
//     ],
// );
// module.exports = earnerControllers;
