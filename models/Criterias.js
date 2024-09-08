const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Criterias = sequelize.define("Criterias", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    narrative: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: {
                args: [10, 255],
                msg: "Narrative must be between 10 and 255 characters long",
            },
        },
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
});

module.exports = Criterias;
