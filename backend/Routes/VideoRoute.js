const { Router } = require("express")
const VideoRoute = Router()

const { GetVideos, GetVideoById, UpdateVideo, DeleteVideo } = require('../Controllers/VideoController')

VideoRoute.get('/get', GetVideos)
VideoRoute.get('/get/:id', GetVideoById)
VideoRoute.put('/update/:id', UpdateVideo)
VideoRoute.delete('/delete/:id', DeleteVideo)

module.exports = VideoRoute
