const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/database");

const AchievementTypes = sequelize.define(
    "AchievementTypes",
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Achievement Type Name is required.",
                },
            },
        },
        description: {
            type: DataTypes.STRING,
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["name"],
            },
        ],
    },
);

module.exports = AchievementTypes;
