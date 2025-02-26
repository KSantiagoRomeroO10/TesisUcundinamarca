import Styles from "./Create.module.css"
import { useState } from "react"

const Create = ({ columns, endPointNew, setData, data }) => {
  const [formData, setFormData] = useState({})
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorEmpty, setErrorEmpty] = useState(false)

  const handleOpen = () => {
    console.log(columns)
    
    setOpen(!open)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const { name } = e.target
    const file = e.target.files[0]
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLoading) return
  
    // Validación de campos vacíos
    const hasEmptyFields = columns
      .filter((col) => !/id/i.test(col) || col === "IdVideoFK")
      .some((col) => !formData[col])
    if (hasEmptyFields) {
      setErrorEmpty(true)
      return
    }
    setErrorEmpty(false)
    setIsLoading(true)
  
    try {
      let response
      // Si el endpoint es para Django se envían los datos en FormData
      if (endPointNew.toLowerCase().includes("djangoaplication")) {
        const formDataToSend = new FormData()
        columns.forEach((col) => {
          // Para campos de audio o video se envía el archivo con una clave personalizada
          if (
            (col.toLowerCase() === "video" || col.toLowerCase() === "audio") &&
            formData[col] instanceof File
          ) {
            if (col.toLowerCase() === "video") {
              formDataToSend.append("video_file", formData[col])
            } else if (col.toLowerCase() === "audio") {
              formDataToSend.append("audio_file", formData[col])
            }
          } else {
            // Para los demás campos se envían como texto
            formDataToSend.append(col, formData[col])
          }
        })
  
        response = await fetch(endPointNew, {
          method: "POST",
          body: formDataToSend,
        })
      } else {
        // Si no se requieren archivos, se envían los datos en JSON
        response = await fetch(endPointNew, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
      }
  
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("No puede repetir")
        } else {
          throw new Error("Error al crear el elemento.")
        }
      }
  
      const newItem = await response.json()
  
      // Asignar un nuevo id si es necesario
      function getNextId(arr) {
        if (!Array.isArray(arr) || arr.length === 0) return 1
        let maxId = 0
        arr.forEach((obj) => {
          Object.keys(obj).forEach((key) => {
            if (key.toLowerCase().includes("id") && typeof obj[key] === "number") {
              maxId = Math.max(maxId, obj[key])
            }
          })
        })
        return maxId + 1
      }
  
      newItem.id = getNextId(data)
      setData([...data, newItem])
      handleOpen()
    } catch (error) {
      console.error("Error al crear el elemento:", error)
      // Mostrar el mensaje de error cuando la respuesta es 400
      if (error.message === "No puede repetir") {
        alert(error.message)  // Muestra el error con un alert o cualquier otro mecanismo de UI
      }
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div>
      <button className={`${Styles.Create} ${Styles.Button1}`} onClick={handleOpen}>
        Crear Nuevo
      </button>
      {open && (
        <div className={Styles.Container}>
          <div className={Styles.SubContainer}>
            <h1>Crear Nuevo</h1>
            <form className={Styles.Formulario} onSubmit={handleSubmit}>
              {columns
                .filter((col) => !/id/i.test(col) || col === "IdVideoFK")
                .map((col, index) => (
                  <div key={index}>
                    <label htmlFor={col}>
                      {col.charAt(0).toUpperCase() + col.slice(1)}
                    </label>
                    {(col.toLowerCase() === "video" || col.toLowerCase() === "audio") ? (
                      <input
                        type="file"
                        id={col}
                        name={col}
                        onChange={handleFileChange}
                        disabled={isLoading}
                      />
                    ) : (
                      <input
                        type="text"
                        id={col}
                        name={col}
                        value={formData[col] || ""}
                        onChange={handleChange}
                        placeholder={col}
                        disabled={isLoading}
                      />
                    )}
                  </div>
                ))}
              {errorEmpty && (
                <p className={Styles.Error}>Todos los campos son obligatorios.</p>
              )}
              <button className={`${Styles.Acept} ${Styles.Button1}`} type="submit" disabled={isLoading}>
                {isLoading ? "Creando..." : "Aceptar"}
              </button>
              <button
                className={`${Styles.Cancel} ${Styles.Button1}`}
                type="button"
                onClick={handleOpen}
                disabled={isLoading}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Create
