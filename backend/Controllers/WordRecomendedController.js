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

const GetAllWR = async (req, res) => {
  try {
    const words = await WordRecomended.findAll() // Recupera todos los registros

    // Agrupa y cuenta las recomendaciones por usuario y palabra
    const userWordCount = words.reduce((acc, wordObj) => {
      const userId = wordObj.idUserFKWR
      const word = wordObj.word

      if (!acc[userId]) {
        acc[userId] = {} // Inicializa el objeto para el usuario si no existe
      }

      if (acc[userId][word]) {
        acc[userId][word] += 1 // Incrementa el conteo si la palabra ya existe para el usuario
      } else {
        acc[userId][word] = 1 // Inicializa el conteo si la palabra no existe para el usuario
      }

      return acc
    }, {})

    // Formatea el resultado
    const result = {
      userWordCount,
      Entrega: true // Indica que la operación fue exitosa
    }

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ 'Error Message': error.message, Error: error, Entrega: false })
  }
}

module.exports = { CreateWordRecomended, GetAllWordRecomended, GetAllWR}