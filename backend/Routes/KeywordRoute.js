const { Router } = require("express")
const KeywordRoute = Router()

const { CreateKeyWord, GetKeyWords, GetKeyWordById, UpdateKeyWord, DeleteKeyWord } = require('../Controllers/KeywordController')

KeywordRoute.post('/new', CreateKeyWord)
KeywordRoute.get('/get', GetKeyWords)
KeywordRoute.get('/get/:id', GetKeyWordById)
KeywordRoute.put('/update/:id', UpdateKeyWord)
KeywordRoute.delete('/delete/:id', DeleteKeyWord)

module.exports = KeywordRoute
