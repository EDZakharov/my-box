const UserModel = require('../Models/User-model')
// const TokenModel = require('../models/token-model')
// const tokenService = require('../service/token-service')
// const userDTO = require('../dtos/user-dtos')
// const bcrypt = require('bcrypt')
// const ErrorHandler = require('../exeptions/errorHandler')

class UserService {
  async findAll() {
    const candidate = await UserModel.find()
    if (!candidate) {
      throw new Error('Not Found')
    } else {
      return candidate
    }
  }
  async findOne(login) {
    const candidate = await UserModel.findOne({ login })
    if (!candidate) {
      throw new Error('Not Found')
    } else {
      return candidate
    }
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
  async regUser(email, login, password) {
    const findDuplicateEmail = await UserModel.findOne({ email })
    const findDuplicateLogin = await UserModel.findOne({ login })
    if (findDuplicateEmail) {
      return { message: 'Email already exists' }
    }
    if (findDuplicateLogin) {
      return { message: 'Login already exists' }
    }
    const candidate = await UserModel.create({
      email,
      login,
      password,
    })
    candidate.save()
    return UserModel.findOne({ email })
  }
}

module.exports = new UserService()
