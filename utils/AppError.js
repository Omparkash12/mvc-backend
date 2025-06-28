class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.isOperational = true; // distinguish from programming errors
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
