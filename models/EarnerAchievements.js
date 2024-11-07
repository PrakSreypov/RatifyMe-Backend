const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");
const Earners = require("./Earners");
const Users = require("./Users");
const EarnerAchievements = sequelize.define(
    "EarnerAchievements",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        earnerName: {
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
    earnerAchievements.earnerName = earner.name
});

// After syncing the database, update all existing earners' names based on the Users model
EarnerAchievements.addHook("afterSync", async (options) => {
    const earnerAchievements = await EarnerAchievements.findAll({
        include: {
            model: Earners,
            as: 'Earner', 
            include : {
                model: Users,
                as: 'User',
            }
        },
    });

    // Iterate over each subscription and update the name field
    for (const earnerAchievement of earnerAchievements) {
        if (earnerAchievement.Earner && earnerAchievement.earnerName !== `${earnerAchievement.Earner.User.firstName} ${earnerAchievement.Earner.User.lastName}`) {
            earnerAchievement.earnerName = `${earnerAchievement.Earner.User.firstName} ${earnerAchievement.Earner.User.lastName}`;
            await earnerAchievement.save();  
        }
    }
});

module.exports = EarnerAchievements;
