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

module.exports = { CreateWordRecomended }