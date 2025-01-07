const WordRecomended = require('../Models/WordRecomended')

const CreateWordRecomended = async (req, res) => {
  try {
    const { word } = req.body
    if (!word) {
      return res.status(400).json({ error: 'No se proporcionó ninguna palabra.' })
    }

    const newWordRecomended = await WordRecomended.create({ word })

    res.status(200).json({newWordRecomended})
  } 
  catch (error) {
    res.status(500).json({ 'Error Message': error.message, Error: error })
  }
}

const GetAllWordRecomended = async (req, res) => {
  try {
    const words = await WordRecomended.findAll() // Recupera todos los registros

    // Agrupa y cuenta las palabras
    const wordCount = words.reduce((acc, wordObj) => {
      const word = wordObj.word
      if (acc[word]) {
        acc[word] += 1
      } else {
        acc[word] = 1
      }
      return acc
    }, {})

    // Formatea el resultado
    const result = {
      words: Object.keys(wordCount),
      count: Object.values(wordCount),
    }

    res.status(200).json(result)
  } 
  catch (error) {
    res.status(500).json({ 'Error Message': error.message, Error: error })
  }
}

module.exports = { CreateWordRecomended, GetAllWordRecomended }