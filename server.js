const app = require("./app");
const sequelize = require("./configs/database");
const models = require("./models/index");

const dotenv = require("dotenv");
dotenv.config({ path: `${process.cwd()}/.env` });

// Sync models with database
const syncDb = async () => {
    try {
        await sequelize.sync({ force: false, logging: false, alter: true });
        console.log("Database synced successfully");
    } catch (err) {
        console.log("Database synced failed", err);
        process.exit(1); // Exit if database sync fails
    }
};
syncDb();

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
