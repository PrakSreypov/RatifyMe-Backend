const sequelize = require("../configs/database");  
const { DataTypes } = require("sequelize");  

const BadgeCriteriaItems = sequelize.define("BadgeCriteriaItems", {  
    id: {  
        type: DataTypes.INTEGER,  
        autoIncrement: true,  
        primaryKey: true,  
    },  
    criteriasId: {  // This is the only criteriaId field  
        type: DataTypes.INTEGER,  
        allowNull: false,  
        references: {  
            model: "Criterias",  // Reference to the Criterias model  
            key: "id",  
        },  
        validate: {  
            isNumeric: {  
                msg: "Criteria ID must be numbers",  
            },  
        },  
        onDelete: "CASCADE",  
        onUpdate: "CASCADE",  
    },  
    achievementsId: {  
        type: DataTypes.INTEGER,  
        allowNull: false,  
        references: {  
            model: "Achievements",  // Reference to Achievements model  
            key: "id",  
        },  
        validate: {  
            isNumeric: {  
                msg: "Achievement ID must be numbers",  
            },  
        },  
        onDelete: "CASCADE",  
        onUpdate: "CASCADE",  
    },  
});  

// Optionally, you can add associations here after model definition if needed  

module.exports = BadgeCriteriaItems;