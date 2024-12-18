const HandleListen = (mic, isListening, setNotes, setIsListening) => {
  if (!mic) {
    console.error("SpeechRecognition no está disponible en este navegador.")
    return
  }

  const startMic = () => {
    try {
      mic.start()
    } 
    catch (error) {
      console.error("Error al intentar iniciar el micrófono:", error)
    }
  }

  const stopMic = () => {
    try {
      mic.stop()
      console.log("Micrófono detenido")
    } 
    catch (error) {
      console.error("Error al intentar detener el micrófono:", error)
    }
  }

  const handleOnEnd = () => {
    if(isListening){
      console.log("Continuar...")
      mic.start()
    }
    else{
      console.log('Microfono apagado')      
    }
  }

  const handleOnResult = (event) => {
    if (!event.results) {
      console.warn("No se encontraron resultados en el evento.")
      return
    }

    const transcript = Array.from(event.results)
      .map((result) => result[0]?.transcript || "")
      .join("")
    setNotes(transcript)    
  }

  const handleOnError = (event) => {
    console.error("Error en SpeechRecognition:", event.error)
  }

  mic.onstart = () => console.log("Micrófono activado (evento onstart)")
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
