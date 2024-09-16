const Criterias = require("../../models/Criterias");
const BadgeClass = require("../../models/BadgeClasses");
const BaseControllers = require("../../utils/baseControllers");

const criteriaControllers = new BaseControllers(Criterias, [], [BadgeClass]);

module.exports = criteriaControllers;
