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

class BadgeClassControllers extends BaseControllers {
    constructor() {
        super(BadgeClasses, ["name"], associated, "imageUrl");
    }
    deleteOne = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const record = await this.checkRecordExists(id);

        await record.destroy();
        if (!record[this.imageField]) {
            // Extract the key and handle special characters
            const url = record[this.imageField].replace(/\+/g, "%20");
            const key = decodeURIComponent(url.split("/").slice(-2).join("/"));
            // Prepare S3 delete parameters
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key, // Use the extracted key
            };

            // Attempt to delete the image from S3
            await s3
                .deleteObject(params)
                .promise()
                .catch((err) => {
                    return next(new AppError("Failed to delete image from S3", 500, err));
                });
        }
        this.sendResponse(res, 200, null, "Delete badge successfully")
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
                    },
                    {
                        model: Earners,
                        through: {
                            model: EarnerAchievements,
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
