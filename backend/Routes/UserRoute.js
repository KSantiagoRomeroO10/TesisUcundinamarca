const { Router } = require("express")
const UserRoute = Router()

const { CreateUser, GetUsers, GetUserById, GetUserByName, UpdateUser, DeleteUser } = require('../Controllers/UserController')

UserRoute.post('/new', CreateUser)
UserRoute.get('/get', GetUsers)
UserRoute.get('/get/id/:id', GetUserById)
UserRoute.get('/get/name/:name', GetUserByName)
UserRoute.put('/update/:id', UpdateUser)
UserRoute.delete('/delete/:id', DeleteUser)

module.exports = UserRoute
