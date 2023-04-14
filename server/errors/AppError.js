class AppError extends Error {
  constructor(statusCode, errorMessage) {
    super(errorMessage)

    this.statusCode = statusCode || 500
    this.status = `${this.statusCode}`.startsWith('4') ? "fail" : "error"
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError