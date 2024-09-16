const BadgeClasses = require("../../models/BadgeClasses");
const Achievements = require("../../models/Achievements");
const AchievementTypes = require("../../models/AchievementTypes");

const BaseControllers = require("../../utils/baseControllers");

const achievementControllers = new BaseControllers(
    Achievements,
    [],
    [BadgeClasses, AchievementTypes],
);

module.exports = achievementControllers;
