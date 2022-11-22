const UserServices = require('../Services/User-services')

class UserController {
  async getUsers(req, res, next) {
    try {
      const users = await UserServices.findAll()
      res.status(200).json(users)
    } catch (e) {
      next(e)
    }
  }
  async login(req, res, next) {
    const { login, password } = req.body
    try {
      const user = await UserServices.login(login, password)
      if (user.message) {
        res.status(409).json(user)
      } else {
        res.cookie('refreshToken', user[0].refreshToken, { httpOnly: true })
        res.status(200).json(user)
      }
    } catch (e) {
      next(e)
    }
  }
  async delUser(req, res, next) {
    const { login, password } = req.body
    try {
      const user = await UserServices.delOne(login, password)
      res.status(200).json(user)
    } catch (e) {
      next(e)
    }
  }
  async registration(req, res, next) {
    const { email, login, password } = req.body
    try {
      const user = await UserServices.registration(email, login, password)
      if (user.message) {
        res.status(409).json(user)
      } else {
        res.cookie('refreshToken', user[0].refreshToken, { httpOnly: true })
        res.status(201).json(user)
      }
    } catch (e) {
      next(e)
    }
  }
  async refresh(req, res, next) {
    const { refreshToken } = req.cookies
    try {
      const user = await UserServices.refresh(refreshToken)
      if (user.message) {
        res.status(401).json(user)
      } else {
        res.cookie('refreshToken', user[0].refreshToken, { httpOnly: true })
        res.status(200).json(user)
      }
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()
