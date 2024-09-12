const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

// Error handling
const AppError = require("./utils/appError");
const globalErrorHandling = require("./utils/errorControllers");

// Import the dynamic route loader
const routers = require('./routers');

const app = express();

// Global Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());



if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Use the dynamically loaded routes
app.use('/api/v1', routers);
// ejs template engine
app.set("view engine", "ejs");
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

// Handling Unhandled Routes
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

// Global Error Handling Middleware
app.use(globalErrorHandling);

module.exports = app;
