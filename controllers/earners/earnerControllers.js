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
const EarnerAchievements = require("../../models/EarnerAchievements"); // Make sure this model is uncommented and correctly defined

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
earnerControllers.updateAchievementStatus = async (req, res) => {
    let transaction;

    try {
        const { badgeClassId, status } = req.body;
        const { earnerId } = req.params;

        // Validate that all required fields are provided
        if (!earnerId || !badgeClassId || typeof status === "undefined") {
            return res
                .status(400)
                .json({ message: "earnerId, badgeClassId, and status are required" });
        }

        // Start a transaction to ensure atomicity
        transaction = await Earners.sequelize.transaction();

        // Find the achievement with the specified badgeClassId
        const achievement = await Achievements.findOne({
            where: { badgeClassId: badgeClassId },
            transaction,
        });

        // If no achievement is found, return a 404 response
        if (!achievement) {
            await transaction.rollback();
            return res
                .status(404)
                .json({ message: "No achievement found for the given badgeClassId" });
        }

        // Find the pivot table entry for the specific earner and achievement
        const earnerAchievement = await EarnerAchievements.findOne({
            where: {
                EarnerId: earnerId,
                AchievementId: achievement.id, // Use achievement.id from the found achievement
            },
            transaction,
        });

        // If no entry is found, return a 404 response
        if (!earnerAchievement) {
            await transaction.rollback();
            return res
                .status(404)
                .json({ message: "No achievement found for the given earnerId and badgeClassId" });
        }

        // Update the status for this specific earner's achievement
        earnerAchievement.status = status; // Set the new status
        await earnerAchievement.save({ transaction }); // Save the update within the transaction

        // Commit the transaction if everything is successful
        await transaction.commit();

        res.status(200).json({
            status: "success",
            message: "Achievement status updated successfully",
            data: earnerAchievement,
        });
    } catch (error) {
        if (transaction) await transaction.rollback();
        console.error("Error updating achievement status:", error); // Log the error for debugging
        res.status(500).json({
            status: "error",
            message: "An error occurred while updating the achievement status.",
        });
    }
};

module.exports = earnerControllers;
