const { Router } = require("express")
const AudioRoute = Router()

const { GetAudios, GetAudioById, UpdateAudio, DeleteAudio } = require('../Controllers/AudioController')

AudioRoute.get('/get', GetAudios)
AudioRoute.get('/get/:id', GetAudioById)
AudioRoute.put('/update/:id', UpdateAudio)
AudioRoute.delete('/delete/:id', DeleteAudio)

module.exports = AudioRoute
