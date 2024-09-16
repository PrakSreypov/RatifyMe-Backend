const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const BadgeCriteriaItems = sequelize.define("BadgeCriteriaItems", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    achievementsId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Achievements",
            key: "id",
        },
    },
    criteriasId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Criterias",
            key: "id",
        },
    },
});

module.exports = BadgeCriteriaItems;
