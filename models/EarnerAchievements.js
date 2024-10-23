const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");
const Earners = require("./Earners")
const EarnerAchievements = sequelize.define(
    "EarnerAchievements",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        },
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
        issuedOn: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
        claimedOn: {
            type: DataTypes.DATE,
        },
        credId: {
            type : DataTypes.STRING
        },
        certUrlPdf: {
            type: DataTypes.STRING,
        },
        certUrlJpeg: {
            type: DataTypes.STRING,
        },
        credUrl: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
        indexes : [
            {
                unique: true,
                fields: ["credId"],
            },
        ],
    },
);


EarnerAchievements.addHook("beforeCreate", async (earnerAchievements, options) => {
    const earner = await Earners.findByPk(earnerAchievements.earnerId);
    if (!earner) {
        throw new Error("Earner does not exist. Cannot create EarnerAchievements.");
    }

    // Properly format the name by adding a space between firstName and lastName
    earnerAchievements.name = earner.name
});

// After syncing the database, update all existing earners' names based on the Users model
EarnerAchievements.addHook("afterSync", async (options) => {
    const earnerAchievements = await EarnerAchievements.findAll({
        include: {
            model: Earners,
            as: 'Earner', 
        },
    });

    // Iterate over each subscription and update the name field
    for (const earnerAchievement of earnerAchievements) {
        if (earnerAchievement.Earner && earnerAchievement.name !== earnerAchievement.Earner.name) {
            earnerAchievement.name = earnerAchievement.Earner.name;
            await earnerAchievement.save();  
        }
    }
});

module.exports = EarnerAchievements;
