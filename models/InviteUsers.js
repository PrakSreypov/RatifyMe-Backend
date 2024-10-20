const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const InviteUsers = sequelize.define("InviteUsers", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Roles",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    inviteEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Please provide a valid email.",
            },
        },
    },
    inviterCode: {
        type: DataTypes.STRING(6),
        allowNull: true,
        validate: {
            isNumeric: {
                msg: "Verification code must contain only numbers.",
            },
            len: {
                args: [6, 6],
                msg: "Verification code must be exactly 6 digits.",
            },
        },
    },
    inviteExpires: {
        type: DataTypes.DATE,
        defaultValue: () => {
            // Calculate 10mn from now
            const currentDate = new Date();
            return new Date(currentDate.setDate(currentDate.getDate() + 7)); // 7 days
            // return new Date(currentDate.getTime() + 1 * 60 * 1000);
        },
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isAccountCreated: DataTypes.BOOLEAN,
});

module.exports = InviteUsers;
