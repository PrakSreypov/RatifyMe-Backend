const { v4 } = require("uuid");
const {
    BadgeClasses,
    Issuers,
    Institutions,
    Achievements: AchievementModel,
    AchievementTypes,
    Criterias: CriteriaModel,
} = require("../../models");
const sequelize = require("../../configs/database");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const s3 = require("../../configs/s3");

// Function to upload to S3 (same as in the add controller)
const uploadToS3 = async (fileBuffer, fileName, mimetype) => {
    const uniqueFileName = `${v4()}_${fileName}`;
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `Badge/${uniqueFileName}`,
        Body: fileBuffer,
        ContentType: mimetype,
    };

    try {
        const data = await s3.upload(uploadParams).promise();
        return data.Location;
    } catch (error) {
        console.error("Error uploading to S3:", error);
        throw error;
    }
};

exports.editBadgeClass = catchAsync(async (req, res, next) => {
    const { badgeId } = req.params;

    // Check if the badge exists
    const badgeClass = await BadgeClasses.findByPk(badgeId, {
        include: [Issuers, AchievementModel, CriteriaModel],
    });
    if (!badgeClass) {
        return next(new AppError("BadgeClass not found", 404));
    }

    // Handle file upload if a new badge image is provided
    let badgeImg = badgeClass.imageUrl; // Keep existing image by default
    if (req.file) {
        const { buffer: badgeBuffer, originalname, mimetype } = req.file;
        badgeImg = await uploadToS3(badgeBuffer, originalname, mimetype);
    }

    const {
        name,
        description,
        tags,
        startedDate,
        endDate,
        issuerId,
        Issuer,
        Achievements,
        Criterias,
        expiredDate
    } = req.body;

    // Start transaction for the update operation
    const transaction = await sequelize.transaction();
    try {
        // Update BadgeClass
        await badgeClass.update(
            {
                name,
                description,
                imageUrl: badgeImg,
                tags,
                startedDate,
                endDate,
                issuerId,
                expiredDate
            },
            { transaction },
        );

        // Update Issuer (if applicable)
        if (Issuer) {
            let existingIssuer = await Issuers.findOne({ where: { badgeClassId: badgeClass.id } });
            if (existingIssuer) {
                await existingIssuer.update(Issuer, { transaction });

                // Update Institution (if applicable)
                if (Issuer.institution) {
                    const existingInstitution = await Institutions.findOne({
                        where: { issuerId: existingIssuer.id },
                    });
                    if (existingInstitution) {
                        await existingInstitution.update(Issuer.institution, { transaction });
                    } else {
                        const newInstitution = await Institutions.create(
                            {
                                ...Issuer.institution,
                                issuerId: existingIssuer.id,
                            },
                            { transaction },
                        );
                    }
                }
            } else {
                const newIssuer = await Issuers.create(
                    {
                        ...Issuer,
                        badgeClassId: badgeClass.id,
                    },
                    { transaction },
                );
                if (Issuer.institution) {
                    await Institutions.create(
                        {
                            ...Issuer.institution,
                            issuerId: newIssuer.id,
                        },
                        { transaction },
                    );
                }
            }
        }

        // Update Achievements (if applicable)
        if (Achievements && Achievements.length > 0) {
            await AchievementModel.destroy({ where: { badgeClassId: badgeClass.id }, transaction });

            for (const achievement of Achievements) {
                const newAchievement = await AchievementModel.create(
                    {
                        ...achievement,
                        badgeClassId: badgeClass.id,
                    },
                    { transaction },
                );

                if (achievement.achievementTypeId) {
                    await newAchievement.setAchievementType(achievement.achievementTypeId, {
                        transaction,
                    });
                }

                if (achievement.AchievementType) {
                    const [achievementType] = await AchievementTypes.findOrCreate({
                        where: { name: achievement.AchievementType.name },
                        defaults: achievement.AchievementType,
                        transaction,
                    });
                    await newAchievement.setAchievementType(achievementType.id, { transaction });
                }
            }
        }

        // Update Criterias (if applicable)
        if (Criterias && Criterias.length > 0) {
            await CriteriaModel.destroy({ where: { badgeClassId: badgeClass.id }, transaction });

            for (const criteria of Criterias) {
                await CriteriaModel.create(
                    {
                        ...criteria,
                        badgeClassId: badgeClass.id,
                    },
                    { transaction },
                );
            }
        }

        // Commit the transaction
        await transaction.commit();

        // Fetch the updated BadgeClass
        const updatedBadgeClass = await BadgeClasses.findOne({
            where: { id: badgeClass.id },
            include: [
                {
                    model: Issuers,
                    include: [Institutions],
                },
                {
                    model: AchievementModel,
                    include: [AchievementTypes],
                },
                {
                    model: CriteriaModel,
                },
            ],
        });

        res.status(200).json({
            status: "success",
            data: updatedBadgeClass,
        });
    } catch (error) {
        console.error("Error during transaction:", error);
        await transaction.rollback();
        return next(new AppError("Error updating BadgeClass", 500));
    }
});
