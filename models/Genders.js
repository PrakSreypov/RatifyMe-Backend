const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Genders = sequelize.define(
    "Genders",
    {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Gender cannot be empty",
                },
                isIn: {
                    args: [["Male", "Female", "Prefer not to say"]],
                    msg: 'Gender must be Male, Female or Prefer not to say.'
                },
            },
        },
    },
    {
        timestamps: false,
    },
);

module.exports = Genders;
