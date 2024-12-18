const useSpeechRecognition = ({ lang = "es-ES" } = {}) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    console.error("SpeechRecognition no está disponible en este navegador.")
    return { mic: null, isSupported: false }
  }

  const mic = new SpeechRecognition()
  mic.continuous = true
  mic.interimResults = true
  mic.lang = lang

  return { mic, isSupported: true }
}

export default useSpeechRecognition
