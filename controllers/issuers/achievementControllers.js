const BadgeClasses = require("../../models/BadgeClasses");
const Achievements = require("../../models/Achievements");
const AchievementTypes = require("../../models/AchievementTypes");
const Issuers = require("../../models/Issuers");
const BaseControllers = require("../../utils/baseControllers");

const achievementControllers = new BaseControllers(
    Achievements,
    [],
    [
        {
            model: BadgeClasses,
            include: Issuers,
        },
        AchievementTypes,
    ],
);

module.exports = achievementControllers;
