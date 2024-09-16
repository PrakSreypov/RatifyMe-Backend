const AchievementTypes = require("../../models/AchievementTypes");
const BaseControllers = require("../../utils/baseControllers");

const achievementTypesControllers = new BaseControllers(AchievementTypes, ["name"]);

module.exports = achievementTypesControllers;
