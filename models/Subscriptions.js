const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");
const ServicePlans = require("./ServicePlans");
const Institutions = require("./Institutions");

const Subscriptions = sequelize.define(
    "Subscriptions",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        subscriptionName: {
            type: DataTypes.STRING,
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
                    msg: "Service Plan ID is required.",
                },
                isInt: {
                    msg: "Service Plan ID must be an integer.",
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
            defaultValue: DataTypes.NOW,
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
            allowNull: true,
            validate: {
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
        stripeSubscriptionId: {
            type: DataTypes.STRING,
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["stripeSubscriptionId"],
            },
        ],
        hooks: {
            beforeCreate: async (subscription) => {
                // Fetch the associated ServicePlan
                const servicePlan = await ServicePlans.findByPk(subscription.servicePlanId);
                if (servicePlan) {
                    // Calculate endDate based on startDate and duration
                    const startDate = new Date(subscription.startDate);
                    const endDate = new Date(
                        startDate.setMonth(startDate.getMonth() + servicePlan.duration),
                    );
                    subscription.endDate = endDate;
                }
            },
        },
    },
);

Subscriptions.addHook("beforeCreate", async (subscriptions, options) => {
    const institution = await Institutions.findByPk(subscriptions.institutionId);
    if (!institution) {
        throw new Error("User does not exist. Cannot create institution.");
    }

    // Properly format the name by adding a space between firstName and lastName
    subscriptions.subscriptionName = institution.institutionName;
});

// After syncing the database, update all existing earners' names based on the Users model
Subscriptions.addHook("afterSync", async (options) => {
    const subscriptions = await Subscriptions.findAll({
        include: {
            model: Institutions,
            as: "Institution",
        },
    });

    // Iterate over each subscription and update the name field
    for (const subscription of subscriptions) {
        if (
            subscription.Institution &&
            subscription.subscriptionName !== subscription.Institution.institutionName
        ) {
            subscription.subscriptionName = subscription.Institution.institutionName;
            await subscription.save();
        }
    }
});

Subscriptions.addHook("beforeFind", (options) => {
    // Check if there's a specific option to skip the status filter
    if (!options.where) {
        options.where = {};
    }

    // Allow a flag to bypass the status check for certain queries
    if (!options.skipStatusCheck) {
        options.where.status = true;
    }
});

module.exports = Subscriptions;
