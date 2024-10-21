const Achievement = require("../../models/Achievements");
const EarnerAchievements = require("../../models/EarnerAchievements");
const catchAsync = require("../../utils/catchAsync");

exports.assignBadgeToEarners = catchAsync(async (req, res) => {
    const { badgeClass } = req;
    const { earners } = req;

    // Find all achievements related to the badgeClassId
    const achievements = await Achievement.findAll({
        where: { badgeClassId: badgeClass.id },
    });

    // If there are no achievements, return an error
    if (!achievements || achievements.length === 0) {
        return res.status(404).json({ message: "No achievements found for this badge" });
    }

    // Update each earner with the corresponding achievements
    for (const earner of earners) {
        for (const achievement of achievements) {
            // Associate the achievement with the earner
            await achievement.addEarner(earner);
        }
    }

    // Send response with assigned achievements and earners
    res.status(200).json({
        status: "success",
        message: "Badge assigned to all earners successfully",
        data: {
            badgeClass,
            earners,
            achievements,
        },
    });
});

exports.updateIssuedOnForAchievements = catchAsync(async (req, res) => {
    let { achievementId } = req.body;

    if (!achievementId) {
        return res.status(400).json({
            status: "fail",
            message: "achievementId must be provided.",
        });
    }

    // If achievementId is not an array, convert it to an array
    if (!Array.isArray(achievementId)) {
        achievementId = [achievementId];
    }

    // Get the current date
    const currentDate = Date.now();

    // Update issuedOn field for all matching achievement IDs
    const updatedCount = await EarnerAchievements.update(
        { issuedOn: currentDate },
        {
            where: {
                achievementId: achievementId,
                issuedOn: null,
            },
        },
    );

    if (updatedCount[0] === 0) {
        // Sequelize returns an array where the first element is the number of updated rows
        return res.status(404).json({
            status: "fail",
            message: "No achievements found for the specified achievement IDs to update.",
        });
    }

    // Send response indicating success
    res.status(200).json({
        status: "success",
        message: "IssuedOn date updated for specified achievements successfully.",
        data: {
            achievementId,
            issuedOn: currentDate,
        },
    });
});
