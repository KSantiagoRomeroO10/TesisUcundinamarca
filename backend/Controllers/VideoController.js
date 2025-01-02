const Video = require('../Models/Video')

const CreateVideo = async (req, res) => {
  try {
    const { url } = req.body
    if (!url) {
      return res.status(400).json({ error: "No se recibió ninguna URL. Asegúrate de incluir 'url' en el cuerpo de la solicitud." })
    }

    const newVideo = await Video.create({
      url: url
    })

    res.status(201).json({ newVideo })
  } catch (error) {
    res.status(500).json({ "Error creando el video": error.message })
  }
}

const GetVideos = async (req, res) => {
  try {
    const videos = await Video.findAll()
    res.status(200).json(videos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const GetVideoById = async (req, res) => {
  try {
    const { id } = req.params
    const video = await Video.findByPk(id)
    if (video) {
      res.status(200).json(video)
    } else {
      res.status(404).json({ error: 'Video no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const UpdateVideo = async (req, res) => {
  try {
    const { id } = req.params
    const { url } = req.body
    if (!url) {
      return res.status(400).json({ error: "No se recibió ninguna URL. Asegúrate de incluir 'url' en el cuerpo de la solicitud." })
    }

    const existingVideo = await Video.findByPk(id)
    if (existingVideo) {
      existingVideo.url = url
      await existingVideo.save()
      res.status(200).json(existingVideo)
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

module.exports = { CreateVideo, GetVideos, GetVideoById, UpdateVideo, DeleteVideo }
