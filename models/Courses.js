const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Courses = sequelize.define(
    "Courses",
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: DataTypes.STRING,
        courseCode: DataTypes.STRING,
        specializationId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "Specializations",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        fieldOfStudyId: {
            type: DataTypes.INTEGER,
            references: {
                model: "FieldOfStudies",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
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

module.exports = Courses;
