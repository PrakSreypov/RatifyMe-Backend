const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Achievements = sequelize.define("Achievements", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    badgeClassId: {
        type: DataTypes.INTEGER,
        references: {
            model: "BadgeClasses",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    achievementTypeId: {
        type: DataTypes.INTEGER,
        references: {
            model: "AchievementTypes",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    status: {
        type: DataTypes.STRING,
        validate: {
            isAlpha: {
                msg: "Status must be string only.",
            },
            notEmpty: {
                msg: "Status must not be empty",
            },
            isIn: {
                args: [["ToDo", "Doing", "Done"]],
                msg: "status in must be ToDo, Doing, or Done",
            },
        },
    },
});

module.exports = Achievements;
