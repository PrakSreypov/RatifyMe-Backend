const EarnerAchievements = require("../../models/EarnerAchievements");
const BaseControllers = require("../../utils/baseControllers");

const badgeClassControllers = new BaseControllers(EarnerAchievements, []);

module.exports = badgeClassControllers;
