const { Router } = require("express")
const WordRecomendedRoute = Router()

const { CreateWordRecomended, GetAllWordRecomended } = require('../Controllers/WordRecomendedController')

WordRecomendedRoute.post('/new', CreateWordRecomended)
WordRecomendedRoute.get('/get', GetAllWordRecomended)

module.exports = WordRecomendedRoute
