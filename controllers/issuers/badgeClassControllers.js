const BadgeClasses = require("../../models/BadgeClasses");
const Issuers = require("../../models/Issuers");
const Institutions = require("../../models/Institutions");
const Criterias = require("../../models/Criterias");
const Achievements = require("../../models/Achievements");
const AchievementTypes = require("../../models/AchievementTypes");
const Earners = require("../../models/Earners");

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
        {
            model: Achievements,
            include: [
                {
                    model: AchievementTypes,
                },
            ],
        },
        {
            model: Criterias, // Use the alias defined in your association
        },
    ],
);

module.exports = badgeClassControllers;
