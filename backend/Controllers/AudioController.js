const Audio = require('../Models/Audio')

const GetAudios = async (req, res) => {
  try {
    const audios = await Audio.findAll({ raw: true })
    res.status(200).json([...audios, { 'Entrega': true }])
  } catch (error) {
    res.status(500).json({ error: error.message, 'Entrega': false })
  }
}

const GetAudioById = async (req, res) => {
  try {
    const { id } = req.params
    const audio = await Audio.findByPk(id)
    if (audio) {
      const audioFinal = audio.toJSON() // Convertir a JSON
      audioFinal.Entrega = true
      res.status(200).json(audioFinal)
    } else {
      res.status(404).json({ error: 'Audio no encontrado', 'Entrega': false })
    }
  } catch (error) {
    res.status(500).json({ error: error.message, 'Entrega': false })
  }
}

const UpdateAudio = async (req, res) => {
  try {
    const { id } = req.params
    const { audio } = req.body
    const existingAudio = await Audio.findByPk(id)
    if (existingAudio) {
      existingAudio.audio = audio
      await existingAudio.save()
      const updatedAudio = existingAudio.toJSON()
      updatedAudio.Entrega = true
      res.status(200).json(updatedAudio)
    } else {
      res.status(404).json({ error: 'Audio no encontrado', 'Entrega': false })
    }
  } catch (error) {
    res.status(500).json({ error: error.message, 'Entrega': false })
  }
}

const DeleteAudio = async (req, res) => {
  try {
    const { id } = req.params
    const audio = await Audio.findByPk(id)
    if (audio) {
      await audio.destroy()
      res.status(200).json({ message: 'Audio eliminado', 'Entrega': true })
    } else {
      res.status(404).json({ error: 'Audio no encontrado', 'Entrega': false })
    }
  } catch (error) {
    res.status(500).json({ error: error.message, 'Entrega': false })
  }
}

module.exports = { GetAudios, GetAudioById, UpdateAudio, DeleteAudio }