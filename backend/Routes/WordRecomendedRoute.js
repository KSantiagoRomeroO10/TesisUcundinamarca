const { Router } = require("express")
const WordRecomendedRoute = Router()

const { CreateWordRecomended, GetAllWordRecomended, GetAllWR } = require('../Controllers/WordRecomendedController')

WordRecomendedRoute.post('/new', CreateWordRecomended)
WordRecomendedRoute.get('/get', GetAllWordRecomended)
WordRecomendedRoute.get('/getall', GetAllWR)

module.exports = WordRecomendedRoute
