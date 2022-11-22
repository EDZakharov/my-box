const JWT = require('jsonwebtoken')
const TokenModel = require('../Models/Token-model')

const phrase1 = 'admin'
const phrase2 = 'admin2'

class TokenService {
  generateTokens(payload) {
    const accessToken = JWT.sign(payload, phrase1, {
      expiresIn: '2m',
    })
    const refreshToken = JWT.sign(payload, phrase2, {
      expiresIn: '30d',
    })
    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userID, refreshToken) {
    const tokenData = await TokenModel.findOne({ userID })

    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await TokenModel.create({ user: userID, refreshToken })
    return token
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenModel.deleteOne({ refreshToken })
    return tokenData
  }

  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ refreshToken })
    return tokenData
  }

  async validateAccessToken(accessToken) {
    try {
      const data = JWT.verify(accessToken, phrase1)
      return data
    } catch (e) {
      return null
    }
  }

  async validateRefreshToken(refreshToken) {
    try {
      const data = JWT.verify(refreshToken, phrase2)
      return data
    } catch (e) {
      return null
    }
  }
}

module.exports = new TokenService()
