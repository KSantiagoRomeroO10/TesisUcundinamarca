const WordRecomended = require('../Models/WordRecomended')

const CreateWordRecomended = async (req, res) => {
  try {
    const { word } = req.body
    if (!word) {
      return res.status(400).json({ error: 'No se proporcionó ninguna palabra.', Entrega: false })
    }

    const newWordRecomended = await WordRecomended.create({ word })
    const wordFinal = newWordRecomended.toJSON()
    wordFinal.Entrega = true

    res.status(200).json(wordFinal)
  } 
  catch (error) {
    res.status(500).json({ 'Error Message': error.message, Error: error, Entrega: false })
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
      Entrega: true // Indica que la operación fue exitosa
    }

    res.status(200).json(result)
  } 
  catch (error) {
    res.status(500).json({ 'Error Message': error.message, Error: error, Entrega: false })
  }
}

module.exports = { CreateWordRecomended, GetAllWordRecomended }