const { Router } = require("express")
const KeywordRoute = Router()

const { CreateKeyWord, GetKeyWords, GetKeyWordById, GetKeyWordByWord, UpdateKeyWord, DeleteKeyWord } = require('../Controllers/KeywordController')

KeywordRoute.post('/new', CreateKeyWord)
KeywordRoute.get('/get', GetKeyWords)
KeywordRoute.post('/get/word', GetKeyWordByWord)
KeywordRoute.get('/get/:id', GetKeyWordById)
KeywordRoute.put('/update/:id', UpdateKeyWord)
KeywordRoute.delete('/delete/:id', DeleteKeyWord)

module.exports = KeywordRoute
