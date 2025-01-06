const { Router } = require("express")
const WordRecomendedRoute = Router()

const { CreateWordRecomended } = require('../Controllers/WordRecomendedController')

WordRecomendedRoute.post('/new', CreateWordRecomended)

module.exports = WordRecomendedRoute
