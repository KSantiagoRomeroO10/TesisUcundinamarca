import micOn from "../../images/micOn.png"
import micOff from "../../images/micOff.png"
import { IconButton } from "@mui/material"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Styles from "./Home.module.css"

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = "es-ES"

const Home = () => {
  const [isListening, setIsListening] = useState(false)
  const [notes, setNotes] = useState(null)
  const [videoUrls, setVideoUrls] = useState([]) // Almacena URLs de todos los videos válidos
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0) // Índice del video actual en reproducción

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log("Continuar...")
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = async () => {
        console.log("Parar micrófono")

        const response = await handleWordImportant()

        // Obtiene los videos y omite los que no existen
        const response2 = await Promise.all(
          response.map(async (word) => {
            const result = await handleWordVideo(word)
            return result?.IdVideoFK ? result.video.video.data : null // Solo devuelve datos si existen
          })
        )

        // Filtrar y procesar solo videos válidos
        const videoData = response2.filter((data) => data !== null)

        VideoShow(videoData) // Pasar solo videos válidos a VideoShow
      }
    }
    mic.onstart = () => {
      console.log("Micrófono activado")
    }
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("")      
      setNotes(transcript)
    }
    mic.onerror = (event) => console.log(event.error)
  }

  const VideoShow = (videos) => {
    // Revocar todas las URL anteriores si existen
    videoUrls.forEach(url => URL.revokeObjectURL(url))
    
    // Crear una nueva URL para cada Blob de video y almacenarlas en el estado
    const urls = videos.map((data) => URL.createObjectURL(new Blob([Uint8Array.from(data)], { type: "video/mp4" })))
    setVideoUrls(urls)
    setCurrentVideoIndex(0) // Iniciar desde el primer video
  }

  const handleWordImportant = async () => {    
    const response = await fetch(`http://localhost:8000/djangoaplication/extraer_palabras/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ texto: notes }),
    })
    const responseCreate = await response.json()
    console.log(responseCreate)
    
    return responseCreate.palabras_importantes
  }

  const handleWordVideo = async (keyWord) => {
    const response = await fetch("http://localhost:3001/keyword/get/word", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyWord: keyWord }),
    })
    const responseCreate = await response.json()

    // Devuelve el objeto si tiene video; en caso contrario, null
    return responseCreate?.IdVideoFK ? responseCreate : null
  }

  useEffect(() => {
    handleListen()

    return () => {
      mic.stop()
      // Revocar las URL de los videos cuando el componente se desmonte
      videoUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [isListening])

  useEffect(() => {
    console.log(notes)    
  }, [notes])

  // Manejar el cambio de video cuando el actual termina
  const handleVideoEnd = () => {
    if (currentVideoIndex < videoUrls.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1) // Cambia al siguiente video
    } else {
      console.log("Se acabaron los videos.")
    }
  }

  return (
    <div className={Styles.home}>
      <nav className={Styles.navbar}>
        <div className={Styles.navbarLogo}>
          <h1 className={Styles.titulo}>Lengua de Señas Colombiana</h1>
        </div>
        <div className={Styles.navbarButtons}>
          <button className={`${Styles.btn} ${Styles.instruccion}`}>Instrucciones</button>
          <Link to="/login">
            <button className={`${Styles.btn} ${Styles.entrar}`}>Entrar</button>
          </Link>
        </div>
      </nav>

      <div className={Styles.contenedor}>
        <div className={Styles.microfono}>
          <IconButton onClick={() => setIsListening(!isListening)}>
            <img className={Styles.micIcon} src={isListening ? micOn : micOff} alt="microfono" />
          </IconButton>
        </div>
        <div className={Styles.video}>
          {videoUrls.length > 0 ? (
            <video
              controls
              width="400"
              autoPlay
              src={videoUrls[currentVideoIndex]}
              onEnded={handleVideoEnd} // Llamar a handleVideoEnd cuando el video termine
            />
          ) : (
            <p>Esperando audio...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home

