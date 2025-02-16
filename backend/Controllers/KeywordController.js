const KeyWord = require('../Models/Keyword')
const Video = require('../Models/Video')

const CreateKeyWord = async (req, res) => {
  try {
    const { keyWord, IdVideoFK } = req.body
    const newKeyWord = await KeyWord.create({ keyWord, IdVideoFK })
    const keyWordFinal = newKeyWord.toJSON()
    keyWordFinal.Entrega = true
    return res.status(201).json(keyWordFinal)
  }
  catch (error) {
    res.status(500).json({ error: error.message, Entrega: false })
  }
}

const GetKeyWords = async (req, res) => {
  try {
    const keyWords = await KeyWord.findAll({ raw: true })
    res.status(200).json([...keyWords, { Entrega: true }])
  }
  catch (error) {
    res.status(500).json({ error: error.message, Entrega: false })
  }
}

const GetKeyWordById = async (req, res) => {
  try {
    const { id } = req.params
    const keyWord = await KeyWord.findByPk(id)
    if (keyWord) {
      const keyWordFinal = keyWord.toJSON()
      keyWordFinal.Entrega = true
      res.status(200).json(keyWordFinal)
    }
    else {
      res.status(404).json({ error: 'Keyword no encontrada', Entrega: false })
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message, Entrega: false })
  }
}

const GetKeyWordByWord = async (req, res) => {
  try {
    const { keyWord } = req.body
    const keyWordDB = await KeyWord.findOne({ 
      where: { keyWord },
      include: [{ model: Video }] 
    })

    if (keyWordDB) {
      const keyWordFinal = keyWordDB.toJSON()
      keyWordFinal.Entrega = true
      res.status(200).json(keyWordFinal)
    } else {
      res.status(404).json({ error: 'KeyWord no encontrada', Entrega: false })
    }
  } 
  catch (error) {
    res.status(500).json({ error: error.message, Entrega: false })
  }
}

const UpdateKeyWord = async (req, res) => {
  try {
    const { id } = req.params
    const { keyWord, IdAudioFK, IdVideoFK } = req.body
    const existingKeyWord = await KeyWord.findByPk(id)
    if (existingKeyWord) {
      existingKeyWord.keyWord = keyWord
      existingKeyWord.IdAudioFK = IdAudioFK
      existingKeyWord.IdVideoFK = IdVideoFK
      await existingKeyWord.save()
      const keyWordFinal = existingKeyWord.toJSON()
      keyWordFinal.Entrega = true
      res.status(200).json(keyWordFinal)
    }
    else {
      res.status(404).json({ error: 'Keyword no encontrada', Entrega: false })
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message, Entrega: false })
  }
}

const DeleteKeyWord = async (req, res) => {
  try {
    const { id } = req.params
    const keyWord = await KeyWord.findByPk(id)
    if (keyWord) {
      await keyWord.destroy()
      res.status(200).json({ message: 'Keyword eliminada', Entrega: true })
    }
    else {
      res.status(404).json({ error: 'Keyword no encontrada', Entrega: false })
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message, Entrega: false })
  }
}

module.exports = { CreateKeyWord, GetKeyWords, GetKeyWordById, GetKeyWordByWord, UpdateKeyWord, DeleteKeyWord }