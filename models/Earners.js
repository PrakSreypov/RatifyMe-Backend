const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");
const Users = require("./Users");
const AcademicBackgrounds = require("./AcademicBackgrounds");

const Earners = sequelize.define("Earners", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Users",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        validate: {
            async isValidUser(value) {
                const user = await Users.findByPk(value);
                if (!user) {
                    throw new Error("User not found. Please provide a valid user.");
                }
                if (user.roleId !== 4) {
                    throw new Error("User must be an earner (roleID = 4 ) to be associate as an earner");
                }
            },
        },
    },
    academicBackgroundId: {
        type: DataTypes.INTEGER,
        references: {
            model: "AcademicBackgrounds",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    achievementId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Achievements",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
});

Earners.addHook("beforeCreate", async (earner, options) => {
    const user = await Users.findByPk(earner.userId);
    if (!user) {
        throw new Error("User does not exists. Cannot create earner.");
    }
    if (user.roleId !== 4) {
        throw new Error("User must have the role of an earner (roleID = 4) to be associate as an earner.");
    }

    const academicBackground = await AcademicBackgrounds.findByPk(earner.academicBackgroundId);
    if (!academicBackground) {
        throw new Error("Academic background does not exist.");
    }

    // Ensure that the userId in the Earners table matches the recipientId in the AcademicBackgrounds table
    if (academicBackground.userId !== earner.userId) {
        throw new Error("The userId in the Earner record must match the recipientId in the AcademicBackground record.");
    }
});

module.exports = Earners;
