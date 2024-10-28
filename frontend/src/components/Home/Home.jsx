import micOn from "../../images/micOn.webp"
import micOff from "../../images/micOff.webp"
import { IconButton } from "@mui/material"
import ReactPlayer from 'react-player'

import { useState, useEffect } from "react"

import { Link } from "react-router-dom" 

import Styles from './Home.module.css'

const vidUrl = "https://www.youtube.com/watch?v=qG1CQFiHX6c"

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = "es-ES"

const Home = () => {
  
  const [isListening, setIsListening] = useState(false)
  const [notes, setNotes] = useState(null)

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log("Continuar...")
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log("Parar micrófono")
      }
    }
    mic.onstart = () => {
      console.log("Micrófono activado")
    }
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("")
      setNotes(transcript)
    }
    mic.onerror = (event) => console.log(event.error)
  }

  useEffect(() => { 
    handleListen()
    return () => {
      mic.stop() // Limpiar cuando se desmonte el componente
    }
   }, [isListening])

  console.log(notes)

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
          <ReactPlayer url={vidUrl} playing={false} volume={0.5} width="400px" height="350px" />
        </div>
      </div>
    </div>
  )
}

export default Home
