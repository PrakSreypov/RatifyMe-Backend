const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const AcademicLevels = sequelize.define(
    "AcademicLevels",
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
                    msg: "Academic Name is required.",
                },
            },
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

module.exports = AcademicLevels;
