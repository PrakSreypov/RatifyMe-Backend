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
const s3 = require("../../configs/s3")

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
    });

    if (!badgeClasses || badgeClasses.length === 0) {
        return res.status(404).json({ message: "No BadgeClasses found for this earner" });
    }

    res.json({ status: "success", badgeClasses });
});

module.exports = badgeClassControllers;
