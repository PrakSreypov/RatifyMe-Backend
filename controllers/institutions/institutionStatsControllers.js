const Sequelize = require('sequelize');
const Institutions = require("../../models/Institutions");
const Issuers = require("../../models/Issuers");
const BadgeClasses = require("../../models/BadgeClasses");
const Earners = require("../../models/Earners");
const Achievements = require("../../models/Achievements"); // Import the Achievements model
const Users = require("../../models/Users")
const catchAsync = require("../../utils/catchAsync");

// This function sums up total Issuer, total Badge, and total Earner including total badges by achievementId
const getAllInstitutionStats = catchAsync(async (req, res) => {
    const institutions = await Institutions.findAll({
        include: [
            {
                model: Issuers,
                include: [
                    {
                        model: Users,
                    },
                    {
                        model: BadgeClasses,
                    },
                    {
                        model: Earners,
                        include: [
                            {
                                model: Achievements, 
                                include: [
                                    {
                                        model: BadgeClasses,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
        attributes: {
            include: [
                [Sequelize.fn('COUNT', Sequelize.col('Issuers.id')), 'totalIssuers'],
                [Sequelize.fn('COUNT', Sequelize.col('Issuers.BadgeClasses.id')), 'totalBadges'],
                [Sequelize.fn('COUNT', Sequelize.col('Issuers.Earners.id')), 'totalEarners'],
                [Sequelize.fn('COUNT', Sequelize.col('Issuers.Earners.Achievement.badgeClassId')), 'totalEarnerBadges'],
            ],
        },
        group: [
            'Institutions.id',
            'Issuers.id',
            'Issuers.BadgeClasses.id',
            'Issuers.Earners.id',
            'Issuers.Earners.Achievement.id',
        ],
    });

    res.status(200).json({
        status: "success",
        results: institutions.length,
        data: institutions,
    });
});

module.exports = {
    getAllInstitutionStats,
};

