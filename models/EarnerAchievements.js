const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const EarnerAchievements = sequelize.define(
    "EarnerAchievements",
    {
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        achievementId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Achievements",
                key: "id",
            },
        },
        earnerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Earners",
                key: "id",
            },
        },
        isssuedOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        claimedOn: {
            type: DataTypes.DATE,
        },
        certUrl: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
    },
);

// Adding a beforeSave hook to check the status and set claimedOn
EarnerAchievements.beforeSave(async (earnerAchievement) => {
    // Check if the status is true and claimedOn is not already set
    if (earnerAchievement.status === true && !earnerAchievement.claimedOn) {
        // Set claimedOn to the current date
        earnerAchievement.claimedOn = new Date.now();
    }
});

module.exports = EarnerAchievements;
