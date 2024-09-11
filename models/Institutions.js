const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Institutions = sequelize.define(
    "Institutions",
    {
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
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Institution name cannot be empty.",
                },
            },
        },
        bio: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 500],
                    msg: "Bio must be 500 characters or less.",
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                msg: "This email is already in use.",
            },
            validate: {
                isEmail: {
                    msg: "Please provide a valid email address.",
                },
                notEmpty: {
                    msg: "Email cannot be empty.",
                },
            },
        },
        phoneNumber: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Phone number cannot be empty.",
                },
                isNumeric: {
                    msg: "Phone number must contain only numbers.",
                },
                len: {
                    args: [10, 20],
                    msg: "Phone number must be between 10 and 15 digits.",
                },
            },
        },
        websiteUrl: {
            type: DataTypes.STRING,
            validate: {
                isUrl: {
                    msg: "Please provide a valid URL.",
                },
            },
        },
        profileImage: {
            type: DataTypes.STRING,
        },
        stripeCustomerId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["name", "stripeCustomerId"],
            },
        ],
    },
);

module.exports = Institutions;
