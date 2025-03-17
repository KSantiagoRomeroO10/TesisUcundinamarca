const HandleListen = (mic, isListening, setNotes, setIsListening) => {
  if (!mic) {
    console.error("❌ SpeechRecognition no está disponible en este navegador.")
    return
  }

  const startMic = () => {
    try {
      console.log("🎙️ Capturar el audio: Iniciando micrófono...")
      mic.start()
    } 
    catch (error) {
      console.error("Error al intentar iniciar el micrófono:", error)
    }
  }

  const stopMic = () => {
    try {
      console.log("🛑 Micrófono detenido")
      mic.stop()
    } 
    catch (error) {
      console.error("Error al intentar detener el micrófono:", error)
    }
  }

  const handleOnEnd = () => {
    if(isListening){
      console.log("🔄 Reiniciando captura del audio...")
      mic.start()
    }
    else{
      console.log("🔇 Micrófono apagado")
    }
  }

  const handleOnResult = (event) => {
    if (!event.results) {
      console.warn("⚠ No se encontraron resultados en el evento.")
      return
    }

    console.log("🔄 Procesar el audio ingresado: Interpretando datos...")

    const transcript = Array.from(event.results)
      .map((result) => result[0]?.transcript || "")
      .join("")
      console.log("📝 Reconociendo información del audio.")
    setNotes(transcript)    
  }

  const handleOnError = (event) => {
    console.error("❌ Error en SpeechRecognition:", event.error)
  }

  mic.onstart = () => console.log("📡 Lectura del audio en curso...")
  mic.onend = handleOnEnd
  mic.onresult = handleOnResult
  mic.onerror = handleOnError

  if (isListening) {
    startMic()

    setTimeout(() => {
      stopMic()
      setIsListening(false)
    }, 10000)
  }
  else {
    stopMic()
  }
}

export default HandleListen
