const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Specifications = sequelize.define(
    "Specifications",
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
                isAlpha: {
                    msg: "Specification must contain only letters.",
                },
            },
        },
        description: DataTypes.STRING,
        fieldOfStudyId: {
            type: DataTypes.INTEGER,
            references: {
                model: "FieldOfStudies",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
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

module.exports = Specifications;
