const BadgeCriteriaItems = require("../../models/BadgeCriteriaItems");
const Achievements = require("../../models/Achievements");
const Criterias = require("../../models/Criterias");
const BadgeClasses = require("../../models/BadgeClasses");
const AchievementTypes = require("../../models/AchievementTypes");
const BaseControllers = require("../../utils/baseControllers");

const badgeCriteriaItemControllers = new BaseControllers(
    BadgeCriteriaItems,
    [],
    [
        {
            model: Achievements,
            include: [BadgeClasses, AchievementTypes],
        },
        {
            model: Criterias,
            include: [BadgeClasses],
        },
    ],
);

module.exports = badgeCriteriaItemControllers;
