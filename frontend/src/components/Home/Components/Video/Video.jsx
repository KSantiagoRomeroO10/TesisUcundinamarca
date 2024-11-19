import { useState, useEffect } from "react"
import Styles from "./Video.module.css"

const Video = ({ notes }) => {
  const [videoUrls, setVideoUrls] = useState([]) // URLs de los videos
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0) // Índice del video actual

  // Procesa las palabras importantes a partir de `notes`
  const handleWordImportant = async () => {
    const response = await fetch("http://localhost:8000/djangoaplication/extraer_palabras/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto: notes }),
    })
    const responseCreate = await response.json()
    return responseCreate.palabras_importantes || []
  }

  // Obtiene el video relacionado con una palabra clave
  const handleWordVideo = async (keyWord) => {
    const response = await fetch("http://localhost:3001/keyword/get/word", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyWord }),
    })
    const responseCreate = await response.json()
    return responseCreate?.IdVideoFK ? responseCreate.video.video.data : null
  }

  // Procesa los videos obtenidos a partir de palabras importantes
  const fetchVideos = async () => {
    const words = await handleWordImportant()
    const videos = await Promise.all(
      words.map(async (word) => {
        const videoData = await handleWordVideo(word)
        return videoData ? URL.createObjectURL(new Blob([Uint8Array.from(videoData)], { type: "video/mp4" })) : null
      })
    )
    const validVideos = videos.filter((url) => url !== null)
    setVideoUrls(validVideos)
    setCurrentVideoIndex(0)
  }

  // Cambia al siguiente video al terminar el actual
  const handleVideoEnd = () => {
    if (currentVideoIndex < videoUrls.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1)
    } else {
      console.log("Todos los videos han sido reproducidos.")
    }
  }

  useEffect(() => {
    if (notes) {
      fetchVideos()
    }
    return () => {
      // Limpia las URLs cuando el componente se desmonte
      videoUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [notes])

  return (
    <div className={Styles.videoContainer}>
      {videoUrls.length > 0 ? (
        <video
          controls
          width="400"
          autoPlay
          src={videoUrls[currentVideoIndex]}
          onEnded={handleVideoEnd}
        />
      ) : (
        <h1>Esperando audio...</h1>
      )}
    </div>
  )
}

export default Video
