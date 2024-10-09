const { v4 } = require("uuid");
const {
    BadgeClasses,
    Issuers,
    Institutions,
    Achievements: AchievementModel,
    AchievementTypes,
    Criterias: CriteriaModel,
} = require("../../models");
const AWS = require("aws-sdk");
const sequelize = require("../../configs/database");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION,
});

// Upload PDF to S3
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

exports.addBadgeClass = catchAsync(async (req, res, next) => {
    // Check if file buffer exists
    const { buffer: badgeBuffer, originalname, mimetype } = req.file;
    if (!badgeBuffer || badgeBuffer.length === 0) {
        return next(new AppError("There is no buffer", 405));
    }

    // Upload to S3
    const badgeImg = await uploadToS3(badgeBuffer, originalname, mimetype);

    if (!badgeImg) {
        return next(new AppError("Upload badge image failed", 405));
    }

    const {
        name,
        description,
        tags,
        startedDate,
        expiredDate,
        issuerId,
        Issuer,
        Achievements,
        Criterias,
    } = req.body;

    // Add the image URL from S3 to the badge data
    req.body.imageUrl = badgeImg;

    // Start transaction
    const transaction = await sequelize.transaction();
    try {
        // 1. Create BadgeClass

        const newBadgeClass = await BadgeClasses.create(
            {
                name,
                description,
                imageUrl: badgeImg,
                tags,
                startedDate,
                expiredDate,
                issuerId,
            },
            { transaction },
        );

        // 2. Create Issuer (if applicable)
        if (Issuer) {
            const newIssuer = await Issuers.create(
                {
                    ...Issuer,
                    badgeClassId: newBadgeClass.id,
                },
                { transaction },
            );

            // Create institution (if provided)
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

        // 3. Create Achievements (if applicable)
        if (Achievements && Achievements.length > 0) {
            for (const achievement of Achievements) {
                const newAchievement = await AchievementModel.create(
                    {
                        ...achievement,
                        badgeClassId: newBadgeClass.id,
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

        // 4. Create Criterias (if applicable)
        if (Criterias && Criterias.length > 0) {
            for (const criteria of Criterias) {
                await CriteriaModel.create(
                    {
                        ...criteria,
                        badgeClassId: newBadgeClass.id,
                    },
                    { transaction },
                );
            }
        }

        // Commit transaction
        await transaction.commit();

        // Fetch the newly created BadgeClass
        const createdBadgeClass = await BadgeClasses.findOne({
            where: { id: newBadgeClass.id },
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

        res.status(201).json({
            status: "success",
            data: createdBadgeClass,
        });
    } catch (error) {
        // Rollback the transaction in case of errors
        console.error("Error during transaction:", error);
        await transaction.rollback();
        return next(new AppError("Error creating BadgeClass", 500));
    }
});
