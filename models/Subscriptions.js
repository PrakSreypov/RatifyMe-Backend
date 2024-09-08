const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Subscriptions = sequelize.define("Subscriptions", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    institutionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Institutions",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        validate: {
            notEmpty: {
                msg: "Institution ID is required.",
            },
            isInt: {
                msg: "Institution ID must be an integer.",
            },
        },
    },
    servicePlanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "ServicePlans",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        validate: {
            notEmpty: {
                msg: "Institution ID is required.",
            },
            isInt: {
                msg: "Institution ID must be an integer.",
            },
        },
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            notNull: {
                msg: "Status is required.",
            },
            isIn: {
                args: [[true, false]],
                msg: "Status must be either true (active) or false (inactive).",
            },
        },
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Start date is required.",
            },
            isDate: {
                msg: "Start date must be a valid date.",
            },
            isBeforeCurrentDate(value) {
                if (new Date(value) > new Date()) {
                    throw new Error("Start Date cannot be in the future.");
                }
            },
        },
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "End Date is required.",
            },
            isDate: {
                msg: "End date must be a valid date.",
            },
            isAfterStartDate(value) {
                if (new Date(value) <= new Date(this.startDate)) {
                    throw new Error("End date must be after the start date.");
                }
            },
        },
    },
});

module.exports = Subscriptions;
