const BadgeClasses = require("../../models/BadgeClasses");
const Issuers = require("../../models/Issuers");
const Institutions = require("../../models/Institutions");
const Criterias = require("../../models/Criterias");
const Achievements = require("../../models/Achievements");
const AchievementTypes = require("../../models/AchievementTypes");
const Users = require("../../models/Users");
const Earners = require("../../models/Earners");
const BaseControllers = require("../../utils/baseControllers");
const EarnerAchievements = require("../../models/EarnerAchievements");
const catchAsync = require("../../utils/catchAsync");

// Define the associated models
const associated = [
    {
        model: Issuers,
        include: [Institutions, Users],
    },
    {
        model: Achievements,
        include: [AchievementTypes, Earners],
        required: true,
    },
    Criterias,
];

// Create an instance of BaseControllers with BadgeClasses
const badgeClassControllers = new BaseControllers(BadgeClasses, ["name"], associated);

// Custom method to get BadgeClasses by earnerId
badgeClassControllers.getBadgeClassesByEarnerId = catchAsync(async (req, res) => {
    const { earnerId } = req.params;

    // Find all BadgeClasses that are associated with Achievements for the specified earnerId
    const badgeClasses = await BadgeClasses.findAll({
        include: [
            {
                model: Achievements,
                include: [
                    {
                        model: Earners,
                        where: { id: earnerId },
                        required: true,
                    },
                    {
                        model: Earners,
                        through: {
                            model: EarnerAchievements,
                            where: { status: false },
                        },
                    },
                    AchievementTypes,
                ],
                required: true,
            },
            {
                model: Issuers,
                include: [Institutions, Users],
            },
            Criterias,
        ],
    });

    if (!badgeClasses || badgeClasses.length === 0) {
        return res.status(404).json({ message: "No BadgeClasses found for this earner" });
    }

    res.json({ status: "success", badgeClasses });
});

badgeClassControllers.getBadgeClaimByEarner = catchAsync(async (req, res) => {
    const { earnerId } = req.params;

    // Find all BadgeClasses that are associated with Achievements for the specified earnerId
    const badgeClasses = await BadgeClasses.findAll({
        include: [
            {
                model: Achievements,
                include: [
                    {
                        model: Earners,
                        where: { id: earnerId },
                        required: true,
                    },
                    {
                        model: Earners,
                        through: {
                            model: EarnerAchievements,
                            where: { status: true },
                        },
                    },
                    AchievementTypes,
                ],
                required: true,
            },
            {
                model: Issuers,
                include: [Institutions, Users],
            },
            Criterias,
        ],
    });

    if (!badgeClasses || badgeClasses.length === 0) {
        return res.status(404).json({ message: "No BadgeClasses found for this earner" });
    }

    res.json({ status: "success", badgeClasses });
});

module.exports = badgeClassControllers;
