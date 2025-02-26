const { Router } = require("express")
const VideoRoute = Router()

const { GetVideos, GetVideoById, DeleteVideo } = require('../Controllers/VideoController')

VideoRoute.get('/get', GetVideos)
VideoRoute.get('/get/:id', GetVideoById)
VideoRoute.delete('/delete/:id', DeleteVideo)

module.exports = VideoRoute
