const express = require('express')
const Router = express.Router()

const UserRoute = require('./UserRoute')
const EvaluationRoute = require('./EvaluationRoute')
const AudioRoute = require('./AudioRoute')
const KeywordRoute = require('./KeywordRoute')
const VideoRoute = require('./VideoRoute')

Router.use('/user', UserRoute)
Router.use('/evaluation', EvaluationRoute)
Router.use('/audio', AudioRoute)
Router.use('/keyword', KeywordRoute)
Router.use('/video', VideoRoute)

module.exports = Router
