import Styles from './RateUs.module.css'
import { useState, useEffect } from "react"

const Calification = () => {
  // Estados para las calificaciones
  const [traduccion, setTraduccion] = useState(0)
  const [software, setSoftware] = useState(0)

  // Función para manejar el envío
  const handleSubmit = async () => {
    if (traduccion && software) {
      const payload = { traduccion, software }

      try {
        const response = await fetch("http://localhost:3001/evaluation/new", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        if (response.ok) {
          alert("Calificación realizada con éxito")
          console.log(await response.json())
          window.location.href = "/" // Redirige a la raíz (sin react-router)
        } else {
          alert("Error al enviar la calificación")
        }
      } catch (error) {
        console.error("Error en la solicitud:", error)
        alert("Error de red al enviar la calificación")
      }
    } else {
      alert("Por favor, califica ambas preguntas.")
    }
  }

  // Manejador de selección de calificación manual
  const handleRating = (setter, value) => {
    setter(value)
  }

  useEffect(() => {
    console.log("Traducción:", traduccion)
    console.log("Software:", software)
  }, [traduccion, software])

  // Renderización
  return (
    <div className={Styles.Container}>
      <h1 className={Styles.Title}>Encuesta de Opinión</h1>
      <br />
      <hr />
      <br />

      {/* Calificación del software */}
      <div>
        <h2 className={Styles.Subtitle}>¿Qué te pareció el software?</h2>
        <br />
        <br />
        <div>
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={`software-${num}`}
              onClick={() => handleRating(setSoftware, num)}
              className={`${Styles.Stars} ${software >= num ? Styles.StarsFocus : ''}`}
            >
              {num} ★
            </button>
          ))}
        </div>
      </div>

      {/* Calificación de traducción */}
      <div style={{ marginTop: "20px" }}>
        <h2 className={Styles.Subtitle}>¿Qué te pareció la calidad de interpretación?</h2>
        <br />
        <br />
        <div>
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={`traduccion-${num}`}
              onClick={() => handleRating(setTraduccion, num)}
              className={`${Styles.Stars} ${traduccion >= num ? Styles.StarsFocus : ''}`}
            >
              {num} ★
            </button>
          ))}
        </div>
      </div>

      {/* Botón de envío */}
      <div style={{ marginTop: "30px" }}>
        <button
          onClick={handleSubmit}
          disabled={!traduccion || !software}
          className={`${Styles.Button} ${!traduccion || !software ? Styles.ButtonActive : Styles.ButtonNoActive}`}
        >
          Enviar
        </button>
      </div>
    </div>
  )
}

export default Calification
