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
      const user = await UserServices.findOne(login, password)
      if (user.message) {
        res.status(409).json(user)
      } else {
        console.log('', user)
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
  async regUser(req, res, next) {
    const { email, login, password } = req.body
    try {
      const user = await UserServices.regUser(email, login, password)
      if (user.message) {
        res.status(409).json(user)
      } else {
        res.status(201).json(user)
      }
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()
