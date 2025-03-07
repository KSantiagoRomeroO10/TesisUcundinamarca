const { Router } = require("express")
const VideoRoute = Router()

const { GetVideos, GetVideoById, DeleteVideo, GetVideosForUser } = require('../Controllers/VideoController')

VideoRoute.get('/get', GetVideos)
VideoRoute.get('/get/:id', GetVideoById)
VideoRoute.delete('/delete/:id', DeleteVideo)
VideoRoute.get('/getting/usersvideo', GetVideosForUser)

module.exports = VideoRoute
