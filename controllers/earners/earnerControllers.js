// Import all the required models
const Earners = require("../../models/Earners");
const Users = require("../../models/Users");
const Achievements = require("../../models/Achievements");
const AcademicBackgrounds = require("../../models/AcademicBackgrounds");
const BadgeClasses = require("../../models/BadgeClasses");
const Roles = require("../../models/Roles");
const Genders = require("../../models/Genders");
const BaseControllers = require("../../utils/baseControllers");
const AcademicLevels = require("../../models/AcademicLevels");
const Institutions = require("../../models/Institutions");
const AchievementTypes = require("../../models/AchievementTypes");
const Addresses = require("../../models/Addresses");
const Issuers = require("../../models/Issuers");
const EarnerAchievements = require("../../models/EarnerAchievements");
const catchAsync = require("../../utils/catchAsync");

// Set up the base controller
const earnerControllers = new BaseControllers(
    Earners,
    [],
    [
        {
            model: Users,
            include: [Roles, Genders, Addresses],
        },
        {
            model: AcademicBackgrounds,
            include: [AcademicLevels, Institutions],
        },
        {
            model: Achievements,
            include: [BadgeClasses, AchievementTypes],
        },
        {
            model: Issuers,
            include: [Users, Institutions],
        },
    ],
);

// Update Achievement Status for Earner
earnerControllers.updateAchievementStatus = catchAsync(async (req, res) => {
    const { earnerId } = req.params;
    const { status, achievementIds, badgeClassId } = req.body;

    // Fetch the earners with the associated achievements using the many-to-many relationship
    const earner = await Earners.findByPk(earnerId, {
        include: [
            {
                model: Achievements,
                where: {
                    id: achievementIds,
                    badgeClassId: badgeClassId,
                },
            },
        ],
    });

    if (!earner || earner.Achievements.length === 0) {
        return res.status(404).json({
            status: "fail",
            message:
                "No achievements found for the specified earner, badgeClass, and achievement IDs.",
        });
    }

    // Update the status of all achievements in the EarnerAchievements join table
    for (let achievement of earner.Achievements) {
        // Update the status in the EarnerAchievements join table
        await EarnerAchievements.update(
            { status: status },
            {
                where: {
                    earnerId: earnerId,
                    achievementId: achievement.id,
                },
            },
        );
    }

    res.status(200).json({
        status: "success",
        message: `${earner.Achievements.length} achievement(s) updated successfully.`,
    });
});

module.exports = earnerControllers;
