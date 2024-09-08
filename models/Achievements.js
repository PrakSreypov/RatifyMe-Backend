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

});

module.exports = Achievements
