const Video = require('../Models/Video')
const User = require('../Models/User')

const GetVideosForUser = async (req, res) => {
  try {
    // const userVideos = await User.findAll({
    //   include: [{model: Video, as: 'videos'}]
    // })
    // res.status(200).json(userVideos)
    const videosUsers = await Video.findAll({
      include: [{ model: User }] 
    })
    res.status(200).json(videosUsers)
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const GetVideos = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10

  try {
    const offset = (page - 1) * limit
    const videos = await Video.findAll({ 
      limit: limit,
      offset: offset,
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

module.exports = { GetVideos, GetVideoById, DeleteVideo, GetVideosForUser }
