const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const EarnerAchievements = sequelize.define("EarnerAchievement", {
    achievementId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Achievements', // Assuming you have an Achievements model
            key: 'id', // The key in the referenced model
        },
        // You can add additional validation if needed
    },
    earnerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Earners', // Assuming you have an Earners model
            key: 'id', // The key in the referenced model
        },
        // You can add additional validation if needed
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// You can also define associations if needed, for example:
EarnerAchievements.associate = (models) => {
    EarnerAchievements.belongsTo(models.Achievements, {
        foreignKey: 'achievementId',
        as: 'achievement', // Alias for easy referencing
    });
    EarnerAchievements.belongsTo(models.Earners, {
        foreignKey: 'earnerId',
        as: 'earner', // Alias for easy referencing
    });
};

module.exports = EarnerAchievements;
