import { useState, useEffect } from "react"
import Styles from "./Video.module.css"
import Loading from './Loading/Loading'

const Video = ({ notes }) => {
  const [videoUrls, setVideoUrls] = useState([]) // URLs de los videos y palabras no encontradas
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0) // Índice del video actual
  const [wordRecomended, setWordRecomended] = useState(true) // Palabra recomendada

  const handleWordRecomended = async () => { 
    const response = await fetch("http://localhost:3001/word/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: videoUrls[currentVideoIndex].word }),
    })
    const responseCreate = await response.json()
    setWordRecomended(false)
    console.log(responseCreate)
  }

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

    return responseCreate?.IdVideoFK ? responseCreate.Video.videoBlob.data : null
  }

  // Procesa los videos obtenidos a partir de palabras importantes
  const fetchVideos = async () => {
    const words = await handleWordImportant()
    const videosAndWords = []

    for (const word of words) {
      const videoData = await handleWordVideo(word)
      if (videoData) {
        const titleUppercase = word.charAt(0).toUpperCase() + word.slice(1)
        const videoUrl = URL.createObjectURL(new Blob([Uint8Array.from(videoData)], { type: "video/mp4" }))
        videosAndWords.push({ type: "video", url: videoUrl, title: titleUppercase })
      } else {
        videosAndWords.push({ type: "word", word })
      }
    }

    setVideoUrls(videosAndWords)
    setCurrentVideoIndex(0) // Reinicia el índice
  }

  // Cambia al siguiente video o palabra al terminar el actual
  const handleNext = (back) => {
    setWordRecomended(true)

    if(back){
      if (currentVideoIndex < videoUrls.length - 1) {
        setCurrentVideoIndex((prevIndex) => prevIndex + 1)
      } else {
        console.log("Todos los elementos han sido mostrados.")
        setVideoUrls([]) // Limpia la lista de videos y palabras
        setCurrentVideoIndex(0) // Reinicia el índice
      }
    }
    else{
      if (currentVideoIndex > 0) { // Verifica que el índice no sea menor que 0
        setCurrentVideoIndex((prevIndex) => prevIndex - 1) // Retrocede el índice
      } else {
        console.log("Ya estás en el primer elemento.")
      }  
    }
  }

  useEffect(() => {
    if (notes) {
      fetchVideos()
    }
    return () => {
      videoUrls
        .filter((item) => item.type === "video")
        .forEach((item) => URL.revokeObjectURL(item.url)) // Limpia las URLs
    }
  }, [notes])

  return (
    <div className={Styles.videoContainer}>
      {videoUrls.length > 0 ? (
        <>
          {videoUrls[currentVideoIndex].type === "video" ? (
            <div>
              <h1>{videoUrls[currentVideoIndex].title}</h1>
              <video
                controls
                width="400"
                autoPlay
                src={videoUrls[currentVideoIndex].url}
                // onEnded={handleNext}
              />
              <button onClick={() => handleNext(false)} className={Styles.ButtonRecomendar}>
                Atras
              </button>
              <button onClick={() => handleNext(true)} className={Styles.ButtonRecomendar}>
                Siguiente
              </button>
            </div>
          ) : (
            <div>
              <h1>
                La palabra <span className={Styles.Palabra}>{videoUrls[currentVideoIndex].word}</span> no tiene video.
              </h1>
              <br />
              {
                wordRecomended 
                  ? 
                  <button className={Styles.ButtonRecomendar} onClick={handleWordRecomended}>Recomendar Palabra</button> 
                  : 
                  <p>Palabra Recomendada</p>
              }
              <button onClick={() => handleNext(false)} className={Styles.ButtonRecomendar}>
                Atras
              </button>
              <button onClick={() => handleNext(true)} className={Styles.ButtonRecomendar}>
                Siguiente
              </button>
            </div>
          )}
        </>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  )
}

export default Video
