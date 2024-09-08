const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Courses = sequelize.define("Courses", {
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
    specificationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Specifications",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    fieldOfStudyId: {
        type: DataTypes.INTEGER,
        references: {
            model: "FieldOfStudies",
            key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
});

module.exports = Courses;
