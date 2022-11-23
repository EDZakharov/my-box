module.exports = class ErrorHandler extends Error {
  status
  errors

  constructor(status, message, errors = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ErrorHandler(401, 'Unauthorized')
  }
  static BadRequest(message, errors = []) {
    return new ErrorHandler(409, message, errors)
  }
}
