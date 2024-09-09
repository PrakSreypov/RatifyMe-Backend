const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const FieldOfStudies = sequelize.define("FieldOfStudies", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: "Field of Study is Required.",
            },
        },
    },
    description: {
        type: DataTypes.STRING,
    },
});

module.exports = FieldOfStudies;
