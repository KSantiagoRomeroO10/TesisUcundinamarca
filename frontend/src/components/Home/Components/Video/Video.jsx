import { useState, useEffect } from "react"
import Styles from "./Video.module.css"

const Video = ({ notes }) => {
  const [videoUrls, setVideoUrls] = useState([]) // URLs de los videos
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0) // Índice del video actual
  const [notFoundWords, setNotFoundWords] = useState([]) // Palabras que no tienen video
  const [currentNotFoundIndex, setCurrentNotFoundIndex] = useState(0) // Índice de la palabra no encontrada actual

  // Procesa las palabras importantes a partir de notes
  const handleWordImportant = async () => {
    const response = await fetch("http://127.0.0.1:8000/djangoaplication/extraer_palabras/", {
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
    const videos = []
    const notFound = []

    for (const word of words) {
      const videoData = await handleWordVideo(word)
      if (videoData) {
        const videoUrl = URL.createObjectURL(new Blob([Uint8Array.from(videoData)], { type: "video/mp4" }))
        videos.push(videoUrl)
      } else {
        notFound.push(word) // Guarda las palabras sin video
      }
    }

    setVideoUrls(videos)
    setNotFoundWords(notFound)
    setCurrentVideoIndex(0)
    setCurrentNotFoundIndex(0) // Reiniciar índice de palabras no encontradas
  }

  // Cambia al siguiente video al terminar el actual
  const handleVideoEnd = () => {
    if (currentVideoIndex < videoUrls.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1)
    } else {
      console.log("Todos los videos han sido reproducidos.")
    }
  }

  // Manejo de transición entre palabras no encontradas
  useEffect(() => {
    let timer
    if (notFoundWords.length > 0 && currentNotFoundIndex < notFoundWords.length) {
      timer = setTimeout(() => {
        setCurrentNotFoundIndex((prevIndex) => prevIndex + 1)
      }, 2500)
    }
    return () => clearTimeout(timer)
  }, [currentNotFoundIndex, notFoundWords])

  useEffect(() => {
    if (notes) {
      fetchVideos()
    }
    return () => {
      videoUrls.forEach((url) => URL.revokeObjectURL(url)) // Limpia las URLs
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
        <div>
          {notFoundWords.length > 0 && currentNotFoundIndex < notFoundWords.length ? (
            <div>
              <h1>La palabra <span className={Styles.Palabra}>{notFoundWords[currentNotFoundIndex]}</span> no encontrada</h1>
              <br />
              <button className={Styles.ButtonRecomendar}>Recomendar Palabra</button>
            </div>
          ) : (
            <h1>Esperando audio...</h1>
          )}
        </div>
      )}
    </div>
  )
}

export default Video
