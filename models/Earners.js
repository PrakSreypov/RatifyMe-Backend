const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");
const Users = require("./Users");
const Issuers = require("./Issuers");

const Earners = sequelize.define("Earners", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
    },
    institutionId: {
        type: DataTypes.INTEGER,
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
    academicBackgroundId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "AcademicBackgrounds",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    achievementId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Achievements",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    issuerId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Issuers",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
});

//Before creating a new Earner, set the name based on the associated user's firstName and lastName
Earners.addHook("beforeCreate", async (earner, options) => {
    // Fetch the issuer to get the institutionId
    const issuer = await Issuers.findByPk(earner.issuerId);
    if (!issuer) {
        throw new Error("Issuer does not exist. Cannot set institutionId.");
    }

    // Set the institutionId on the earner record
    earner.institutionId = issuer.institutionId;
});

// After syncing the database, update all existing earners' names based on the Users model
Earners.addHook("afterSync", async (options) => {
    const earners = await Earners.findAll({
        include: {
            model: Users,
            as: "User",
        },
    });

    // Iterate over each earner and update the name field
    for (const earner of earners) {
        if (earner.User && `${earner.User.firstName} ${earner.User.lastName}` !== earner.name) {
            earner.name = `${earner.User.firstName} ${earner.User.lastName}`;

            await earner.save();
        }
    }
});

Earners.addHook("afterSync", async (options) => {
    const earners = await Earners.findAll({
        include: {
            model: Issuers,
            as: "Issuer",
        },
    });

    // Iterate over each earner and update the institutionId if needed
    for (const earner of earners) {
        if (earner.Issuer && earner.institutionId !== earner.Issuer.institutionId) {
            earner.institutionId = earner.Issuer.institutionId;
            await earner.save();
        }
    }
});

module.exports = Earners;
