const Criterias = require("../../models/Criterias");
const baseControllers = require("../../utils/baseControllers");

const criteriaControllers = new baseControllers(Criterias);

module.exports = criteriaControllers;
