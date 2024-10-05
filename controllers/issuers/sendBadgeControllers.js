const Earner = require("../../models/Earners");
const Achievement = require("../../models/Achievements");
const catchAsync = require("../../utils/catchAsync");

exports.sendBadges = catchAsync(async (req, res) => {
    const { id } = req.params; // ID of the earner
    const { badgeClassId } = req.body; // badgeClassId to associate achievements

    // Fetch the achievement that has the matching badgeClassId
    const achievement = await Achievement.findOne({
        where: { badgeClassId }, // Assuming each badgeClassId maps to one achievement
    });

    if (!achievement) {
        return res.status(404).json({
            status: "fail",
            message: "No achievement found for this badge class",
        });
    }

    // Check if the earner exists
    const earner = await Earner.findByPk(id);
    if (!earner) {
        return res.status(404).json({
            status: "fail",
            message: "Earner not found",
        });
    }

    // Update the earner's achievementId with the corresponding achievement's ID
    earner.achievementId = achievement.id; // Update to the corresponding achievement ID

    // Save the updated earner
    await earner.save();

    // Optionally fetch the updated earner record
    const updatedEarner = await Earner.findByPk(id, {
        include: Achievement, // Include associated achievements
    });

    // Send the updated earner with the associated achievements
    res.status(200).json({
        status: "success",
        data: {
            earner: updatedEarner,
            achievement, // Include the achievement that was associated
        },
    });
});
