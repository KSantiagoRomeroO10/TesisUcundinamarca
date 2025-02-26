const { Router } = require("express")
const AudioRoute = Router()

const { GetAudios, GetAudioById, DeleteAudio } = require('../Controllers/AudioController')

AudioRoute.get('/get', GetAudios)
AudioRoute.get('/get/:id', GetAudioById)
AudioRoute.delete('/delete/:id', DeleteAudio)

module.exports = AudioRoute
