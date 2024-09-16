const BadgeCriteriaItems = require("../../models/BadgeCriteriaItems");
const Achievements = require("../../models/Achievements");
const Criterias = require("../../models/Criterias");
const BaseControllers = require("../../utils/baseControllers");

const badgeCriteriaItemController = new BaseControllers(
    BadgeCriteriaItems,
    [],
    [Achievements, Criterias],
);

module.exports = badgeCriteriaItemController;
