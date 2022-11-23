const Router = require('express').Router
const UserController = require('../Controllers/UserController')
const Auth = require('../Middlewares/CheckAuth')
const router = new Router()

//API-USER
router.get('/user/all', Auth, UserController.getUsers)
router.get('/user/auth', Auth, UserController.checkAuth)
router.get('/user/refresh', UserController.refresh)
router.post('/user/login', UserController.login)
router.post('/user/logout', UserController.logout)
router.post('/user/registration', UserController.registration)
// router.delete('/user/del', UserController.delUser)

module.exports = router
