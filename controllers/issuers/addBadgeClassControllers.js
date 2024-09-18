const {
    BadgeClasses,
    Issuers,
    Institutions,
    Achievements,
    AchievementTypes,
    Criterias,
} = require("../../models");
const sequelize = require("../../configs/database"); // Assuming you have sequelize initialized here
const catchAsync = require("../../utils/catchAsync"); // Assuming you're using a catchAsync utility for error handling

exports.addBadgeClass = catchAsync(async (req, res, next) => {
    const { badgeClassData, issuerData, institutionData, achievementsData, criteriasData } =
        req.body;

    // Start a transaction for atomicity
    const transaction = await sequelize.transaction();

    try {
        // Create BadgeClass
        const newBadgeClass = await BadgeClasses.create(badgeClassData, { transaction });

        // Create Issuer with associated Institution
        const newIssuer = await Issuers.create(
            {
                ...issuerData,
                badgeClassId: newBadgeClass.id, // Assuming Issuers have badgeClassId as foreign key
            },
            { transaction },
        );

        if (institutionData) {
            await Institutions.create(
                {
                    ...institutionData,
                    issuerId: newIssuer.id, // Assuming Institutions have issuerId as foreign key
                },
                { transaction },
            );
        }

        // Create Achievements with associated AchievementTypes
        if (achievementsData && achievementsData.length > 0) {
            for (const achievement of achievementsData) {
                const newAchievement = await Achievements.create(
                    {
                        ...achievement,
                        badgeClassId: newBadgeClass.id,
                    },
                    { transaction },
                );

                // If AchievementTypes exist, associate them
                if (achievement.achievementTypeId) {
                    await AchievementTypes.create(
                        {
                            ...achievement.achievementType,
                            achievementId: newAchievement.id,
                        },
                        { transaction },
                    );
                }
            }
        }

        // Create Criterias associated with the BadgeClass
        if (criteriasData && criteriasData.length > 0) {
            for (const criteria of criteriasData) {
                await Criterias.create(
                    {
                        ...criteria,
                        badgeClassId: newBadgeClass.id, // Assuming Criterias have badgeClassId as foreign key
                    },
                    { transaction },
                );
            }
        }

        // Commit the transaction once all operations are successfully completed
        await transaction.commit();

        // Fetch the created BadgeClass with its associations to match the desired response structure
        const createdBadgeClass = await BadgeClasses.findOne({
            where: { id: newBadgeClass.id },
            include: [
                {
                    model: Issuers,
                    include: [{ model: Institutions }],
                },
                {
                    model: Achievements,
                    include: [{ model: AchievementTypes }],
                },
                {
                    model: Criterias,
                },
            ],
        });

        // Return the newly created BadgeClass with associations
        res.status(201).json({
            status: "success",
            data: createdBadgeClass,
        });
    } catch (error) {
        // Rollback transaction only if it hasn't been committed yet
        if (!transaction.finished) {
            await transaction.rollback();
        }
        return next(error);
    }
});
