const AchievementTypes = require("../../models/AchievementTypes");
const BaseControllers = require("../../utils/baseControllers");

const achievementTypesControllers = new BaseControllers(AchievementTypes);

module.exports = achievementTypesControllers;
