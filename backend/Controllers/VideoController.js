const Video = require('../Models/Video')

const GetVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({ 
      raw: true 
    })
    res.status(200).json([ ...videos, {'Entrega': true} ])
  }
  catch (error) {
    res.status(500).json({ error: error.message, 'Entrega': false })
  }
}

const GetVideoById = async (req, res) => {
  try {
    const { id } = req.params
    const video = await Video.findByPk(id)
    if (video) {
      videoFinal = video.toJSON()
      videoFinal.Entrega = true
      res.status(200).json(videoFinal)
    } else {
      res.status(404).json({ error: 'Video no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const DeleteVideo = async (req, res) => {
  try {
    const { id } = req.params
    const video = await Video.findByPk(id)
    if (video) {
      await video.destroy()
      res.status(200).json({ message: 'Video eliminado' })
    } else {
      res.status(404).json({ error: 'Video no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { GetVideos, GetVideoById, DeleteVideo }
