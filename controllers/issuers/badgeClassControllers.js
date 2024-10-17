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
const ApiFeatures = require("../../utils/apiFeature");

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION,
});

// Define the associated models
const associated = [
    {
        model: Issuers,
        include: [{ model: Users, attributes: ["firstName", "lastName"] }],
    },
    {
        model: Achievements,
        include: [AchievementTypes, Earners],
        required: true,
    },
    { model: Criterias },
    { model: Institutions, attributes: ["institutionName"] },
];

class BadgeClassControllers extends BaseControllers {
    constructor() {
        super(BadgeClasses, ["name"], associated, "imageUrl");
    }
    deleteOne = catchAsync(async (req, res, next) => {
        const { id } = req.params;

        // Find and check if the record exists
        const record = await this.checkRecordExists(id);

        // Extract the image URL before deleting the record
        const imageUrl = record[this.imageField];

        // Delete the record from the database first
        const deletedBadge = await record.destroy();

        // Ensure the record is deleted from the database
        if (!deletedBadge) {
            return next(new AppError("Failed to delete badge from the database", 500));
        }

        // If imageUrl exists, proceed to delete the image from S3
        if (imageUrl) {
            // Extract the key and handle special characters
            const url = imageUrl.replace(/\+/g, "%20");
            const key = decodeURIComponent(url.split("/").slice(-2).join("/"));

            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key,
            };

            // Delete the image from S3
            await s3
                .deleteObject(params)
                .promise()
                .catch((err) => {
                    return next(new AppError("Failed to delete image from S3", 500, err));
                });
        }
        // Send a successful response after the badge has been deleted from the database
        this.sendResponse(res, 200, null, "Badge deleted successfully");
    });
}

// Create an instance of BaseControllers with BadgeClasses
const badgeClassControllers = new BadgeClassControllers();

// Custom method to get BadgeClasses by earnerId
badgeClassControllers.getBadgeClassesByEarnerId = catchAsync(async (req, res) => {
    const { earnerId } = req.params;

    // Initialize ApiFeatures with query parameters and the BadgeClasses model
    const apiFeature = new ApiFeatures(req.query, BadgeClasses)
        .filtering()
        .sorting()
        .limitFields()
        .pagination()
        .search();

    // Log where conditions to debug
    console.log("Where conditions for totalRecords:", apiFeature.query.where);

    // Count total records based on filters applied (without pagination)
    const totalRecords = await BadgeClasses.findAll({
        include: [
            {
                model: Achievements,
                include: [
                    {
                        model: Earners,
                        where: { id: earnerId },
                        required: true,
                        through: {
                            model: EarnerAchievements,
                        },
                    },
                ],
                required: true,
            },
        ],
    });

    // Build the query for fetching BadgeClasses with pagination (limit & offset applied)
    const badgeClasses = await BadgeClasses.findAll({
        include: [
            {
                model: Achievements,
                include: [
                    {
                        model: Earners,
                        where: { id: earnerId },
                        required: true,
                        through: {
                            model: EarnerAchievements,
                        },
                    },
                ],
                required: true,
            },
            {
                model: Issuers,
                include: [{ model: Users, attributes: ["firstName", "lastName"] }],
            },
            { model: Institutions, attributes: ["institutionName"] },
        ],
        ...apiFeature.query,
    });

    // Log the fetched badgeClasses for debugging
    console.log("Fetched badgeClasses:", badgeClasses.length, badgeClasses);

    if (!badgeClasses || badgeClasses.length === 0) {
        return res.status(404).json({ message: "No BadgeClasses found for this earner" });
    }

    // Send a successful response with the results and totalRecords (not affected by pagination)
    res.json({
        status: "success",
        totalRecords: totalRecords.length,
        results: badgeClasses.length,
        badgeClasses,
    });
});

badgeClassControllers.getBadgeClaimByEarner = catchAsync(async (req, res) => {
    const { earnerId } = req.params;

    // Initialize ApiFeatures with the model and query parameters
    const apiFeature = new ApiFeatures(req.query, BadgeClasses)
        .filtering()
        .sorting()
        .limitFields()
        .pagination()
        .search();

    // Count total records based on filters applied
    const totalRecords = await BadgeClasses.count({
        include: [
            {
                model: Achievements,
                include: [
                    {
                        model: Earners,
                        where: { id: earnerId },
                        required: true,
                        through: {
                            model: EarnerAchievements,
                            where: { status: true },
                        },
                    },
                ],
                required: true,
            },
        ],
    });

    // Build the final query with necessary includes
    const finalQuery = {
        ...apiFeature.query,
        include: [
            {
                model: Achievements,
                include: [
                    {
                        model: Earners,
                        where: { id: earnerId },
                        required: true,
                        through: {
                            model: EarnerAchievements,
                            where: { status: true },
                        },
                    },
                ],
                required: true,
            },
            {
                model: Issuers,
                include: [{ model: Users, attributes: ["firstName", "lastName"] }],
            },
            { model: Institutions, attributes: ["institutionName"] },
        ],
    };

    // Find all BadgeClasses based on the final query
    const badgeClasses = await BadgeClasses.findAll(finalQuery);

    if (!badgeClasses || badgeClasses.length === 0) {
        return res.status(404).json({ message: "No BadgeClasses found for this earner" });
    }

    // Send a successful response with the results
    res.json({
        status: "success",
        totalRecords,
        results: badgeClasses.length,
        badgeClasses,
    });
});

module.exports = badgeClassControllers;
