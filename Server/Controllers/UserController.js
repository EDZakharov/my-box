const UserServices = require('../Services/User-services')

const setUser = (user = {}) => {
  return {
    email: user?.email,
    login: user?.login,
    password: user?.password,
  }
}

class ClientRegDTO {
  user
  constructor(user) {
    this.user = setUser(user)
  }
}

class ClientAuthDTO {
  user
  accessToken
  constructor(user, accessToken) {
    this.user = setUser(user)
    this.accessToken = accessToken
  }
}

class UserController {
  async getUsers(req, res, next) {
    try {
      const users = await UserServices.showUsersList()
      res.status(200).json(users)
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
        res.status(201).json(new ClientRegDTO(user.User))
      }
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
        res.cookie('refreshToken', user.Tokens.refreshToken, { httpOnly: true })
        res
          .status(200)
          .json(new ClientAuthDTO(user.User, user.Tokens.accessToken))
      }
    } catch (e) {
      next(e)
    }
  }

  async checkAuth(req, res, next) {
    try {
      res.status(200).json({ auth: true })
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await UserServices.logout(refreshToken)
      if (token.message) {
        res.status(409).json(token)
      } else {
        res.clearCookie('refreshToken')
        res.status(200).json({ logout: true })
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
        res.cookie('refreshToken', user.Tokens.refreshToken, { httpOnly: true })
        res
          .status(200)
          .json(new ClientAuthDTO(user.User, user.Tokens.accessToken))
      }
    } catch (e) {
      next(e)
    }
  }
  // async delUser(req, res, next) {
  //   const { login, password } = req.body
  //   try {
  //     const user = await UserServices.delOne(login, password)
  //     res.status(200).json(user)
  //   } catch (e) {
  //     next(e)
  //   }
  // }
}

module.exports = new UserController()
