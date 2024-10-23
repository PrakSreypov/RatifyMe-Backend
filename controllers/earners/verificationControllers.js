const {
    Earners,
    Achievements,
    BadgeClasses,
    Issuers,
    Users,
} = require("../../models"); // Assuming Sequelize models
const EarnerAchievements = require('../../models/EarnerAchievements')
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

// POST route to verify the credential data
exports.verifyCredential = catchAsync(async (req, res, next) => {
    const { credId } = req.params;
    const { earnerName, issuerName, issuedOn, claimedOn } = req.body;
    // Convert the payload dates to ISO strings
    const payloadIssuedOn = new Date(issuedOn).toISOString();
    const payloadClaimedOn = new Date(claimedOn).toISOString();

    // Fetch the achievement associated with the given credId from the database
    const achievement = await EarnerAchievements.findOne({
        where: { credId },
        include: [
            {
                model: Earners,
                include: [{ model: Users, attributes: ["firstName", "lastName"] }],
            },
            {
                model: Achievements,
                include: [
                    {
                        model: BadgeClasses,
                        include: [
                            {
                                model: Issuers,
                                include: [{ model: Users, attributes: ["firstName", "lastName"] }],
                            },
                        ],
                    },
                ],
            },
        ],
    });

    // If no achievement is found with the provided credId
    if (!achievement) {
        return next(new AppError("Credential not found or invalid", 404));
    }

    // Extract stored data for comparison
    const storedEarnerName = `${achievement.Earner.User.firstName} ${achievement.Earner.User.lastName}`;
    const storedIssuerName = `${achievement.Achievement.BadgeClass.Issuer.User.firstName} ${achievement.Achievement.BadgeClass.Issuer.User.lastName}`;
    const storedIssuedOn = new Date(achievement.issuedOn).toISOString();
    // Normalize the date values to ISO strings for comparison
    const storedClaimedOn = new Date(achievement.claimedOn).toISOString();
    const ObjectStore = {
      storedEarnerName,
      storedIssuerName,
      storedIssuedOn,
      storedClaimedOn
    }
    console.log("This is the store data to verify💥🤬", ObjectStore)
    console.log("This is from payload", issuedOn, claimedOn)


    

    
    // Compare the provided data with the stored data
    if (
        earnerName === storedEarnerName &&
        issuerName === storedIssuerName &&
        payloadIssuedOn === storedIssuedOn &&
        payloadClaimedOn === storedClaimedOn
    ) {
        return res.status(200).json({
            status: "success",
            message: "Credential verified successfully",
            data: {
                credId,
                earnerName,
                issuerName,
                issuedOn,
                claimedOn,
            },
        });
    } else {
        // If any of the data does not match
        return next(new AppError("Credential data does not match", 400));
    }
});
