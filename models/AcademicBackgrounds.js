const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");
const Users = require("./Users");

const AcademicBackgrounds = sequelize.define("AcademicBackgrounds", {
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
            async isRecipient(value) {
                const user = await Users.findByPk(value);
                if (!user) {
                    throw new Error("User not found.");
                }
                if (user.roleId !== 4) {
                    throw new Error(
                        "User must be a recipient (roleId = 4) to be the earner.",
                    );
                }
            },
        },
    },
    institutionId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Institutions',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    fieldOfStudyId: {
        type: DataTypes.INTEGER,
        references: {
            model: "FieldOfStudies",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    academicLevelId: {
        type: DataTypes.INTEGER,
        references: {
            model: "AcademicLevels",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    academicYear: {
        type: DataTypes.DATE,
    },
});

module.exports = AcademicBackgrounds;
