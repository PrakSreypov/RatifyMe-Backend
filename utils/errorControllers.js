const { Sequelize } = require("sequelize");
const AppError = require("./appError");

// Error handling func
const handleUniqueConstraintError = (err) => {
    const field = Object.keys(err.fields)[0]; // Get the field name that caused the error
    const value = err.fields[field]; // Get the value of the field
    const message = `Duplicate entry: '${value}' for field '${field}' already exists. Please use a different value.`;
    return new AppError(message, 400);
};

// Error validation func
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
};

// Error cast func
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}. Please provide a valid value.`;
    return new AppError(message, 400);
};

// Development Error Handler
const sendErrorDev = (err, req, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

// Production Error Handler
const sendErrorProd = (err, req, res) => {
    if (req.originalUrl.startsWith("/api")) {
        // API responses
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
        // Programming or other unknown error
        console.error("ERROR 💥", err);
        return res.status(500).json({
            status: "error",
            message: "Something went very wrong!",
        });
    } else {
        // Rendered website responses
        if (err.isOperational) {
            return res.status(err.statusCode).render("error", {
                title: "Something went wrong!",
                msg: err.message,
            });
        }
        console.error("ERROR 💥", err);
        return res.status(err.statusCode).render("error", {
            title: "Something went wrong!",
            msg: "Please try again later.",
        });
    }
};

// Handle JWT Error func
const handleJWTError = () =>
    new AppError("Invalid token. Please log in again", 401);

// handle JWT expire error func
const handleJWTExpiredError = () =>
    new AppError("Your Token has expired! Please login again!!!", 401);

// Centralized Error Middleware
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    // Handle errors based on environment
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === "production") {
        // create new instance or shallow copy of err
        let error = Object.create(err);

        // Check for specific Sequelize errors
        if (err instanceof Sequelize.UniqueConstraintError) {
            error = handleUniqueConstraintError(err);
        }
        if (error.name === "SequelizeValidationError") {
            error = handleValidationErrorDB(error);
        }
        if (error.name === "handleCastErrorDB") {
            error = handleCastErrorDB(error);
        }
        if (
            error instanceof Sequelize.DatabaseError &&
            error.original &&
            error.original.code === "ER_TRUNCATED_WRONG_VALUE"
        ) {
            error = handleCastErrorDB(error);
        }
        if (error instanceof Sequelize.DatabaseError) {
            // Handle other SequelizeDatabaseError cases
            const message =
                "Database operation failed. Please check your input and try again.";
            error = new AppError(message, 400);
        }

        if (error.name === "JsonWebTokenError") error = handleJWTError(error);
        if (error.name === "TokenExpiredError")
            error = handleJWTExpiredError(error);

        sendErrorProd(error, req, res);
    }
};
