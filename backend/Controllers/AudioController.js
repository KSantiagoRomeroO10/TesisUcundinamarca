const Audio = require('../Models/Audio')

const CreateAudio = async (req, res) => {
  try {
    const { audio } = req.body
    const newAudio = await Audio.create({ audio })
    res.status(201).json(newAudio)  // 201 Created
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const GetAudios = async (req, res) => {
  try {
    const audios = await Audio.findAll()
    res.status(200).json(audios)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const GetAudioById = async (req, res) => {
  try {
    const { id } = req.params
    const audio = await Audio.findByPk(id)
    if (audio) {
      res.status(200).json(audio)
    } else {
      res.status(404).json({ error: 'Audio no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
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
      res.status(200).json(existingAudio)
    } else {
      res.status(404).json({ error: 'Audio no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const DeleteAudio = async (req, res) => {
  try {
    const { id } = req.params
    const audio = await Audio.findByPk(id)
    if (audio) {
      await audio.destroy()
      res.status(200).json({ message: 'Audio eliminado' })
    } else {
      res.status(404).json({ error: 'Audio no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { CreateAudio, GetAudios, GetAudioById, UpdateAudio, DeleteAudio }
