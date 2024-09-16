const BadgeClasses = require("../../models/BadgeClasses");
const Issuers = require("../../models/Issuers");
const Institutions = require("../../models/Institutions");

const BaseControllers = require("../../utils/baseControllers");

// Include both Issuers and Institutions in the association
const badgeClassControllers = new BaseControllers(
    BadgeClasses,
    ["name"],
    [
        {
            model: Issuers,
            include: [{ model: Institutions }], // Include Institutions when fetching Issuers
        },
    ],
);

module.exports = badgeClassControllers;
