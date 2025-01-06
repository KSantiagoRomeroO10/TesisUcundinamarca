const { Router } = require("express")
const multer = require('multer')
const VideoRoute = Router()

const { CreateVideo, GetVideos, GetVideoById, UpdateVideo, DeleteVideo } = require('../Controllers/VideoController')

const storage = multer.memoryStorage()
const upload = multer({ storage })

VideoRoute.post('/new', upload.single('video'), CreateVideo)
VideoRoute.get('/get', GetVideos)
VideoRoute.get('/get/:id', GetVideoById)
VideoRoute.put('/update/:id', UpdateVideo)
VideoRoute.delete('/delete/:id', DeleteVideo)

module.exports = VideoRoute
