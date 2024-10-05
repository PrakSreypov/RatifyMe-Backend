const Achievement = require("../../models/Achievements");
const catchAsync = require("../../utils/catchAsync");

exports.assignBadgeToEarners = catchAsync(async (req, res) => {
    const { badgeClass } = req; // BadgeClass object from middleware
    const { earners } = req; // Array of Earner objects from middleware

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
            await achievement.addEarner(earner); // Ensure 'addEarner' is defined in the Achievement model
        }
    }

    // Send response with assigned achievements and earners
    res.status(200).json({
        status: "success",
        message: "Badge assigned to all earners successfully",
        data: {
            badgeClass, // Return badge class info
            earners, // Return earners info
            achievements, // Return the achievements that were assigned
        },
    });
});
