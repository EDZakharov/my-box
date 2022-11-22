const Router = require('express').Router
const UserController = require('../Controllers/UserController')
const router = new Router()

//API-USER
router.get('/user/all', UserController.getUsers)
router.get('/user/refresh', UserController.refresh)
router.post('/user/login', UserController.login)
router.post('/user/registration', UserController.registration)
router.delete('/user/del', UserController.delUser)

module.exports = router
