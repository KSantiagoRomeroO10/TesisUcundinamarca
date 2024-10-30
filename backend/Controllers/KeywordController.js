const KeyWord = require('../Models/Keyword')
const Video = require('../Models/Video')

const CreateKeyWord = async (req, res) => {
  try {
    const { keyWord, IdVideoFK } = req.body
    const newKeyWord = await KeyWord.create({ keyWord, IdVideoFK })
    res.status(201).json({newKeyWord})
  }
  catch (error) {
    res.status(500).json({ error: error })
  }
}

const GetKeyWords = async (req, res) => {
  try {
    const keyWords = await KeyWord.findAll()
    res.status(200).json(keyWords)
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const GetKeyWordById = async (req, res) => {
  try {
    const { id } = req.params
    const keyWord = await KeyWord.findByPk(id)
    if (keyWord) {
      res.status(200).json(keyWord)
    }
    else {
      res.status(404).json({ error: 'Keyword no encontrada' })
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message })
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
      res.status(200).json(keyWordDB)
    } else {
      res.status(404).json({ error: 'KeyWord no encontrada' })
    }
  } 
  catch (error) {
    res.status(500).json({ error: error.message })
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
      res.status(200).json(existingKeyWord)
    }
    else {
      res.status(404).json({ error: 'Keyword no encontrada' })
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const DeleteKeyWord = async (req, res) => {
  try {
    const { id } = req.params
    const keyWord = await KeyWord.findByPk(id)
    if (keyWord) {
      await keyWord.destroy()
      res.status(200).json({ message: 'Keyword eliminada' })
    }
    else {
      res.status(404).json({ error: 'Keyword no encontrada' })
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { CreateKeyWord, GetKeyWords, GetKeyWordById, GetKeyWordByWord, UpdateKeyWord, DeleteKeyWord }
