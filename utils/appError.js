/**
 *
 *
 * @class AppError - handle all of errors including production and development
 * @param message - throw error message
 * @param statusCode - give a status code
 * @extends {Error}
 * @returns Error Message & Status code when responding
 */
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
