const { Router } = require("express")
const AudioRoute = Router()

const { GetAudios, GetAudioById, DeleteAudio, GetAudiosForUser } = require('../Controllers/AudioController')

AudioRoute.get('/get', GetAudios)
AudioRoute.get('/get/:id', GetAudioById)
AudioRoute.delete('/delete/:id', DeleteAudio)
AudioRoute.get('/getting/usersaudio', GetAudiosForUser)

module.exports = AudioRoute
