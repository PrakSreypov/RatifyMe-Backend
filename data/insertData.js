const sequelize = require("../configs/database");

// Generalized function to insert data with optional configuration
const insertData = async (model, data, options = {}) => {
    try {
        // Ensure the database connection is established
        await sequelize.authenticate();
        console.log("Connection to database established successfully.");

        // Use default options or merge with provided options
        const {
            validate = true, // Default to validate data
            returning = true, // Default to return inserted data
        } = options;

        // Insert data into the specified model
        await model.bulkCreate(data, {
            validate, // Validate before insertion
            returning, // Return inserted data
        });
        console.log("Data inserted successfully.");
    } catch (error) {
        console.error("Error inserting data: ", error);
    } finally {
        // Close the connection
        await sequelize.close();
    }
};

module.exports = insertData;
