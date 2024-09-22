// const Sequelize = require('sequelize');
// const Institutions = require("../../models/Institutions");
// const Issuers = require("../../models/Issuers");
// const BadgeClasses = require("../../models/BadgeClasses");
// const catchAsync = require("../../utils/catchAsync");

// // this is function is working on sum up total Issuer and total Badge
// const getAllInstitutionStats = catchAsync(async (req, res) => {
//     const institutions = await Institutions.findAll({
//         include: [
//             {
//                 model: Issuers,
//                 required: false,
//                 include: [
//                     {
//                         model: BadgeClasses,
//                         required: false,
//                     },
//                 ],
//             },
//         ],
//         attributes: {
//             include: [
//                 [Sequelize.fn('COUNT', Sequelize.col('Issuers.id')), 'totalIssuers'],
//                 [Sequelize.fn('COUNT', Sequelize.col('Issuers.BadgeClasses.id')), 'totalBadges'],
//             ],
//         },
//         // Group By primarykey
//         group: [
//             'Institutions.id',            
//             'Issuers.id',                 
//             'Issuers.BadgeClasses.id',
//         ],
//     });

//     res.status(200).json({
//         status: "success",
//         results: institutions.length,
//         data: institutions,
//     });
// });

// module.exports = {
//     getAllInstitutionStats,
// };

// const Sequelize = require("sequelize");


// const Institutions = require("../../models/Institutions");
// const Issuers = require("../../models/Issuers");
// const BadgeClasses = require("../../models/BadgeClasses");
// const Earners = require("../../models/Earners");
// const catchAsync = require("../../utils/catchAsync");

// // Function to sum up total Issuer, total Badge, and total Earner
// const getAllInstitutionStats = catchAsync(async (req, res) => {
//     const institutions = await Institutions.findAll({
//         include: [
//             {
//                 model: Issuers,
//                 include: [
//                     {
//                         model: BadgeClasses,
//                         attributes: [] // Exclude actual data, just count badges
//                     },
//                     {
//                         model: Earners,
//                         attributes: [] // Exclude actual data, just count earners
//                     },
//                 ],
//             },
//         ],
//         attributes: {
//             include: [
//                 [Sequelize.fn("COUNT", Sequelize.fn("DISTINCT", Sequelize.col("Issuers.id"))), "totalIssuers"],
//                 [Sequelize.fn("COUNT", Sequelize.fn("DISTINCT", Sequelize.col("Issuers.BadgeClasses.id"))), "totalBadges"],
//                 [Sequelize.fn("COUNT", Sequelize.fn("DISTINCT", Sequelize.col("Issuers.Earners.id"))), "totalEarners"],
//             ],
//         },
//         group: ["Institutions.id", "Issuers.id"],
//     });

//     res.status(200).json({
//         status: "success",
//         results: institutions.length,
//         data: institutions,
//     });
// });

// module.exports = {
//     getAllInstitutionStats,
// };

const Sequelize = require('sequelize');
const Institutions = require("../../models/Institutions");
const Issuers = require("../../models/Issuers");
const BadgeClasses = require("../../models/BadgeClasses");
const Earners = require("../../models/Earners");
const catchAsync = require("../../utils/catchAsync");

// This function sums up total Issuer, total Badge, and total Earner
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
                    {
                        model: Earners,
                        required: false,
                    },
                ],
            },
        ],
        attributes: {
            include: [
                [Sequelize.fn('COUNT', Sequelize.col('Issuers.id')), 'totalIssuers'],
                [Sequelize.fn('COUNT', Sequelize.col('Issuers.BadgeClasses.id')), 'totalBadges'],
                [Sequelize.fn('COUNT', Sequelize.col('Issuers.Earners.id')), 'totalEarners'],
            ],
        },
        group: [
            'Institutions.id',
            'Issuers.id',
            'Issuers.BadgeClasses.id',
            'Issuers.Earners.id',
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
