const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

// Error handling
const AppError = require('./utils/appError')
const catchAsync = require('./utils/catchAsync')
const globalErrorHandling = require('./controllers/errorControllers')

const app = express();

// Global Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Routes

// Handling Unhandled Routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`))
})

// Global Error Handling Middleware
app.use(globalErrorHandling)

module.exports = app;
