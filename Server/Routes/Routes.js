const Router = require('express').Router
const UserController = require('../Controllers/UserController')
const router = new Router()

//API-USER
router.get('/user/all', UserController.getUsers)
router.post('/user/one', UserController.getUser)
router.post('/user/reg', UserController.regUser)
router.delete('/user/del', UserController.delUser)

module.exports = router
