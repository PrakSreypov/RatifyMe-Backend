const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");
const Users = require("./Users");

const Earners = sequelize.define("Earners", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING
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

// Before creating a new Earner, set the name based on the associated user's firstName and lastName
Earners.addHook("beforeCreate", async (earner, options) => {
    const user = await Users.findByPk(earner.userId);
    if (!user) {
        throw new Error("User does not exist. Cannot create earner.");
    }

    // Properly format the name by adding a space between firstName and lastName
    earner.name = `${user.firstName} ${user.lastName}`;
});

// After syncing the database, update all existing earners' names based on the Users model
Earners.addHook("afterSync", async (options) => {
    const earners = await Earners.findAll({
        include: {
            model: Users,
            as: 'User', 
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


module.exports = Earners;
