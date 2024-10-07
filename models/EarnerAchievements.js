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
    },
    {
        timestamps: true,
    },
);

module.exports = EarnerAchievements;
