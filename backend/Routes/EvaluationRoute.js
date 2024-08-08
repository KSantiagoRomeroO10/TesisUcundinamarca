const { Router } = require("express")
const EvaluationRoute = Router()

const { CreateEvaluation, GetEvaluations, GetEvaluationById, UpdateEvaluation, DeleteEvaluation } = require('../Controllers/EvaluationController')

EvaluationRoute.post('/new', CreateEvaluation)
EvaluationRoute.get('/get', GetEvaluations)
EvaluationRoute.get('/get/:id', GetEvaluationById)
EvaluationRoute.put('/update/:id', UpdateEvaluation)
EvaluationRoute.delete('/delete/:id', DeleteEvaluation)

module.exports = EvaluationRoute
