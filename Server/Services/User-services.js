const UserModel = require('../Models/User-model')
const TokenModel = require('../Models/Token-model')
const TokenService = require('../Services/Token-services')
const bcrypt = require('bcrypt')

class UserDTO {
  email
  login
  password
  constructor(email, login, password) {
    this.email = email
    this.login = login
    this.password = password
  }
}

class UserService {
  async showUsersList() {
    const candidate = await UserModel.find()
    if (!candidate) {
      throw new Error('Not Found')
    } else {
      return candidate
    }
  }

  async registration(email, login, password) {
    const findDuplicateEmail = await UserModel.findOne({ email })
    const findDuplicateLogin = await UserModel.findOne({ login })
    if (findDuplicateEmail) {
      return { message: 'Email already exists' }
    }
    if (findDuplicateLogin) {
      return { message: 'Login already exists' }
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const User = await UserModel.create({
      email,
      login,
      password: hashPassword,
    })
    User.save()
    return { User }
  }

  async login(login, password) {
    const User = await UserModel.findOne({ login })
    if (!User) {
      return { message: 'Wrong login' }
    }
    const comparePass = bcrypt.compareSync(password, User.password)
    if (!comparePass) {
      return { message: 'Wrong password' }
    }
    const tokens = TokenService.generateTokens({ ...User })
    await TokenService.saveToken(User._id, tokens.refreshToken)

    return { Tokens: { ...tokens }, User }
  }

  async logout(refreshToken) {
    if (!refreshToken) {
      return { message: 'Bad token!' }
    }
    const token = await TokenService.removeToken(refreshToken)
    console.log(token)
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      return { message: 'wrong token' }
    }
    const userData = await TokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await TokenService.findToken(refreshToken)
    console.log('', userData)
    if (!userData || !tokenFromDB) {
      return { message: 'wrong token' }
    }
    const candidate = await UserModel.findOne({ id: userData.id })
    const User = new UserDTO(
      candidate.email,
      candidate.login,
      candidate.password
    )
    const tokens = TokenService.generateTokens({ ...User })
    await TokenService.saveToken(candidate._id, tokens.refreshToken)

    return { Tokens: { ...tokens }, User }
  }

  // async delOne(login, password) {
  //   const candidate = await UserModel.findOne({ login })
  //   if (!candidate) {
  //     throw new Error('Not Found')
  //   }
  //   if (candidate.password === password) {
  //     await UserModel.deleteOne({ login })
  //   }
  //   return UserModel.find()
  // }
}

module.exports = new UserService()
