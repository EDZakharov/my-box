const UserModel = require('../Models/User-model')
const TokenModel = require('../Models/Token-model')
const TokenService = require('../Services/Token-services')
const bcrypt = require('bcrypt')

class UserService {
  async findAll() {
    const candidate = await UserModel.find()
    if (!candidate) {
      throw new Error('Not Found')
    } else {
      return candidate
    }
  }

  async login(login, password) {
    const candidate = await UserModel.findOne({ login })
    if (!candidate) {
      return { message: 'Wrong login' }
    }
    const comparePass = bcrypt.compareSync(password, candidate.password)
    if (!comparePass) {
      return { message: 'Wrong password' }
    }
    const tokens = TokenService.generateTokens({ ...candidate })
    await TokenService.saveToken(candidate._id, tokens.refreshToken)

    return [tokens, candidate]
  }

  async delOne(login, password) {
    const candidate = await UserModel.findOne({ login })
    if (!candidate) {
      throw new Error('Not Found')
    }
    if (candidate.password === password) {
      await UserModel.deleteOne({ login })
    }
    return UserModel.find()
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
    const candidate = await UserModel.create({
      email,
      login,
      password: hashPassword,
    })
    candidate.save()
    const tokens = TokenService.generateTokens({ ...candidate })
    await TokenService.saveToken(candidate._id, tokens.refreshToken)

    return [tokens, candidate]
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

    const tokens = TokenService.generateTokens({ ...candidate })
    await TokenService.saveToken(candidate._id, tokens.refreshToken)

    return [tokens, candidate]
  }
}

module.exports = new UserService()
