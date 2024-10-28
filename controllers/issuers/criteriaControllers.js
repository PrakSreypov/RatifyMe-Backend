const Criterias = require("../../models/Criterias");
const BadgeClass = require("../../models/BadgeClasses");
const Issuers = require("../../models/Issuers");

const BaseControllers = require("../../utils/baseControllers");

const criteriaControllers = new BaseControllers(
    Criterias,
    [],
    [
        {
            model: BadgeClass,
            include: [Issuers],
        },
    ],
);

module.exports = criteriaControllers;
