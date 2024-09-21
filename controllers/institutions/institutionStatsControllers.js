const Sequelize = require('sequelize');
const Institutions = require("../../models/Institutions");
const Issuers = require("../../models/Issuers");
const BadgeClasses = require("../../models/BadgeClasses");
const catchAsync = require("../../utils/catchAsync");

// this is function is working on sum up total Issuer and total Badge
const getAllInstitutionStats = catchAsync(async (req, res) => {
    const institutions = await Institutions.findAll({
        include: [
            {
                model: Issuers,
                required: false,
                include: [
                    {
                        model: BadgeClasses,
                        required: false,
                    },
                ],
            },
        ],
        attributes: {
            include: [
                [Sequelize.fn('COUNT', Sequelize.col('Issuers.id')), 'totalIssuers'],
                [Sequelize.fn('COUNT', Sequelize.col('Issuers.BadgeClasses.id')), 'totalBadges'],
            ],
        },
        // Group By primarykey
        group: [
            'Institutions.id',            
            'Issuers.id',                 
            'Issuers.BadgeClasses.id',
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
