const { Router } = require("express")
const multer = require('multer')
const AudioRoute = Router()

const { CreateAudio, GetAudios, GetAudioById, UpdateAudio, DeleteAudio } = require('../Controllers/AudioController')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

AudioRoute.post('/new', upload.single('audio'), CreateAudio)
AudioRoute.get('/get', GetAudios)
AudioRoute.get('/get/:id', GetAudioById)
AudioRoute.put('/update/:id', UpdateAudio)
AudioRoute.delete('/delete/:id', DeleteAudio)

module.exports = AudioRoute
