import micOn from "../../images/micOn.png"
import micOff from "../../images/micOff.png"
import { IconButton } from "@mui/material"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Styles from "./Home.module.css"

const vidUrl = "https://www.youtube.com/watch?v=qG1CQFiHX6c"

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = "es-ES"

const Home = () => {
  const [isListening, setIsListening] = useState(false)
  const [notes, setNotes] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)

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
        console.log(response)

        const response2 = await Promise.all(
          response.map(async (word) => {
            console.log(word.toLowerCase())
            return await handleWordVideo(word.toLowerCase())
          })
        )

        const result = Array.from(
          new Map(
            response2
              .filter((item) => item.IdVideoFK)
              .map((item) => [item.IdVideoFK, item])
          ).values()
        )

        // Obtener datos del video y mostrarlo usando la lógica de `VideoShow`
        VideoShow(result[0].video.video.data)
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

  const VideoShow = (data) => {
    // Revocar la URL anterior si existe
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl)
    }
    // Crear una nueva URL para el Blob
    const url = URL.createObjectURL(new Blob([Uint8Array.from(data)], { type: "video/mp4" }))
    setVideoUrl(url)
  }

  const handleWordImportant = async () => {
    console.log(notes)
    
    const response = await fetch(`http://localhost:5000/important`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ texto: notes }),
    })
    const responseCreate = await response.json()

    return responseCreate
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

    return responseCreate
  }

  useEffect(() => {
    handleListen()

    return () => {
      mic.stop()
      // Revocar la URL del video cuando el componente se desmonte
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl)
      }
    }
  }, [isListening])

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
          {videoUrl ? (
            <video controls width="400" autoPlay>
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <p>Esperndo audio...</p>
          )}
          {/* <ReactPlayer
            url={videoUrl || vidUrl}
            playing={false}
            volume={0.5}
            width="400px"
            height="350px"
          /> */}
        </div>
      </div>
    </div>
  )
}

export default Home
