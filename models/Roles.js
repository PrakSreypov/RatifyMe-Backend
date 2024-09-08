const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Roles = sequelize.define(
    "Roles",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "This role is already in use.",
            },
            validate: {
                notNull: {
                    msg: "Role title is required.",
                },
                notEmpty: {
                    msg: "Role title cannot be empty",
                },
                len: {
                    args: [3, 50],
                    msg: "Role title must be between 3 and 50 characters long.",
                },
                isAlpha: {
                    msg: "Role title must contain only letters",
                },
                isIn: {
                    args: ['admin', 'institutionOwner, issuer, earner'],
                    msg: 'Role in must admin, institutionOwner, issuer or earner.'
                }
            },
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['name'],
            }
        ],
        timestamps: false,
    },
);

module.exports = Roles;
