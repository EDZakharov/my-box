const ErrorHandler = require('./ErrorHandler')
const TokenService = require('../Services/Token-services')

module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return next(ErrorHandler.UnauthorizedError())
    }

    const accessToken = authHeader.split(' ')[1]
    if (!accessToken) {
      return next(ErrorHandler.UnauthorizedError())
    }

    const userData = await TokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(ErrorHandler.UnauthorizedError())
    }
    req.user = userData
    next()
  } catch (e) {
    return next(ErrorHandler.UnauthorizedError())
  }
}
