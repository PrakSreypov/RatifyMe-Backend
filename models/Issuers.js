const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");
const Users = require("./Users");

const Issuers = sequelize.define("Issuers", {
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
            async isIssuer(value) {
                const user = await Users.findByPk(value);
                if (!user) {
                    throw new Error("User not found.");
                }
                if (user.roleId !== 3) {
                    throw new Error("User must be an Issuer");
                }
            },
        },
    },
    institutionId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Institutions",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    endorsmentId: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Issuers;
