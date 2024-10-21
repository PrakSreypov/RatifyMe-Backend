const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const EarnerAchievements = sequelize.define(
    "EarnerAchievements",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
            defaultValue: DataTypes.NOW,
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

module.exports = EarnerAchievements;
