import { useState, useEffect } from "react"

import HandleListen from "./Utils/HandleListen"
import useSpeechRecognition from "./Utils/useSpeechRecognition"

import Styles from "./Microphone.module.css"

import micOn from "/Images/Microphone/MicOn.png"
import micOff from "/Images/Microphone/MicOff.png"

const { mic, isSupported } = useSpeechRecognition({ lang: "es-ES" })

const Microphone = ({ notes, setNotes }) => {
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    if (isSupported) HandleListen(mic, isListening, setNotes, setIsListening)
    return () => mic && mic.stop()
  }, [isListening, mic])

  if (!isSupported) {
    return <p>Tu navegador no soporta SpeechRecognition.</p>
  }

  return (
    <div className={Styles.micContainer}>
      <div onClick={() => setIsListening(!isListening)} className={Styles.micButton}>
        <img className={Styles.micIcon} src={isListening ? micOn : micOff} alt="microfono" />
      </div>
      <p className={Styles.status}>
        {isListening ? "Escuchando..." : "Micrófono apagado"}
      </p>
      <section className={Styles.notes}>
        <h2>Transcripción</h2>
          {notes
            ? typeof notes === "string"
              ? notes
              : JSON.stringify(notes)
            : "Sin transcripción disponible."}
      </section>
    </div>
  )
}

export default Microphone
