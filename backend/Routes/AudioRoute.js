const { Router } = require("express")
const AudioRoute = Router()

const { CreateAudio, GetAudios, GetAudioById, UpdateAudio, DeleteAudio } = require('../Controllers/AudioController')

AudioRoute.post('/new', CreateAudio)
AudioRoute.get('/get', GetAudios)
AudioRoute.get('/get/:id', GetAudioById)
AudioRoute.put('/update/:id', UpdateAudio)
AudioRoute.delete('/delete/:id', DeleteAudio)

module.exports = AudioRoute
