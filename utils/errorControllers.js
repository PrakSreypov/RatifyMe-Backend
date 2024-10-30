const { Sequelize } = require("sequelize");
const AppError = require("./appError");
const multer = require("multer");

// Error handling functions
const handleForeignKeyConstraintError = (err) => {
    const message = `Invalid reference: The related record with ${err.fields} '${err.value}' does not exist.`;
    return new AppError(message, 400);
};

// Handle unique constraint error (e.g., unique fields)
const handleUniqueConstraintError = (err) => {
    const field = Object.keys(err.fields)[0]; // Get the field name that caused the error
    const value = err.fields[field]; // Get the value of the field
    const message = `Duplicate entry: '${value}' for field '${field}' already exists. Please use a different value.`;
    return new AppError(message, 400);
};

// Handle validation errors from Sequelize
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
};

// Handle casting errors (invalid type provided)
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}. Please provide a valid value.`;
    return new AppError(message, 400);
};

// Handle JWT Error
const handleJWTError = () => new AppError("Invalid token. Please log in again", 401);

// Handle JWT expire error
const handleJWTExpiredError = () => new AppError("Your Token has expired! Please login again!!!", 401);

// Handle Multer errors
const handleMulterError = (err) => {
    if (err instanceof multer.MulterError) {
        switch (err.code) {
            case "LIMIT_FILE_SIZE":
                return new AppError("File is too large. Maximum size is 1MB.", 400);
            default:
                return new AppError("An unknown multer error occurred.", 400);
        }
    }
    return null; // Return null if not a multer error
};


// ========== Start Development environment Error Handler ==========
// Send error in development
const sendErrorDev = (err, req, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
// ========== End Development environment Error Handler ==========

// ========== Start Production environment Error Handler ==========
// Send error in production
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
// ========== End Production environment Error Handler ==========

// ========== Start Centralized Error Middleware ==========
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    // Handle errors based on development environment
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, req, res);
    }

    // Handle errors based on production environment
    else if (process.env.NODE_ENV === "production") {
        // create new instance or shallow copy of err
        let error = Object.create(err);

        // Handle specific Sequelize errors
        if (error instanceof Sequelize.ForeignKeyConstraintError) {
            error = handleForeignKeyConstraintError(err);
        }

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
            const message = "Database operation failed. Please check your input and try again.";
            error = new AppError(message, 400);
        }

        if (error.name === "JsonWebTokenError") error = handleJWTError(error);
        if (error.name === "TokenExpiredError") error = handleJWTExpiredError(error);
        if (error instanceof multer.MulterError) {
            // Handle Multer errors
            error = handleMulterError(error);
        }

        sendErrorProd(error, req, res);
    }
};
// ========== End Centralized Error Middleware ==========
