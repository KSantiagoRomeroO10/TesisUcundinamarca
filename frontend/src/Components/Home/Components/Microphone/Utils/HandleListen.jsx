const sendAudioToAPI = async (audioBlob) => {
  const formData = new FormData()
  formData.append("audio_file", audioBlob, "audio.wav")

  try {
    console.log("📡 Enviando audio a la API...")
    const response = await fetch("http://127.0.0.1:8000/djangoaplication/subir_audio/", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.statusText}`)
    }

    const data = await response.json()
    console.log("✅ Audio enviado con éxito:", data)
  } catch (error) {
    console.error("❌ Error al enviar audio a la API:", error)
  }
}

const HandleListen = (mic, isListening, setNotes, setIsListening) => {
  if (!mic) {
    console.error("❌ SpeechRecognition no está disponible en este navegador.")
    return
  }

  let mediaRecorder
  let audioChunks = []

  const startMic = async () => {
    try {
      console.log("🎙️ Iniciando micrófono...")
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder = new MediaRecorder(stream)

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
        audioChunks = []
        console.log("🔊 Audio capturado.")

        // Enviar a la API
        await sendAudioToAPI(audioBlob)
      }

      mediaRecorder.start()
      mic.start()
    } catch (error) {
      console.error("Error al iniciar el micrófono:", error)
    }
  }

  const stopMic = () => {
    try {
      console.log("🛑 Micrófono detenido")
      mic.stop()
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop()
      }
    } catch (error) {
      console.error("Error al detener el micrófono:", error)
    }
  }

  const handleOnResult = (event) => {
    if (!event.results) {
      console.warn("⚠ No se encontraron resultados.")
      return
    }

    console.log("🔄 Interpretando datos...")
    const transcript = Array.from(event.results)
      .map((result) => result[0]?.transcript || "")
      .join("")
    console.log("📝 Transcripción:", transcript)
    setNotes(transcript)
  }

  mic.onstart = () => console.log("📡 Grabando audio...")
  mic.onend = () => console.log("🔇 Micrófono apagado")
  mic.onresult = handleOnResult
  mic.onerror = (event) => console.error("❌ Error en SpeechRecognition:", event.error)

  if (isListening) {
    startMic()

    setTimeout(() => {
      stopMic()
      setIsListening(false)
    }, 10000)
  } else {
    stopMic()
  }
}

export default HandleListen
