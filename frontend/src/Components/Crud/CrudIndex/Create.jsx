import Styles from "./Create.module.css"
import { useState } from "react"

const Create = ({ columns, endPointNew, setData, data }) => {
  console.log(data)
  
  const [formData, setFormData] = useState({})
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(endPointNew, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Error al crear el elemento.")
      }

      const newDate = await response.json()

      // // Acceder al objeto anidado sin conocer la clave dinámica
      // const getNestedObject = (response) => {
      //   for (const key in response) {
      //     if (typeof response[key] === "object" && !Array.isArray(response[key])) {
      //       console.log("Clave dinámica encontrada:", key)
      //       console.log("Objeto anidado:", response[key])
      //       return response[key]
      //     }
      //   }
      //   return null
      // }

      function getNextId(arr) {
        if (!Array.isArray(arr) || arr.length === 0) return 1 // Si el array está vacío, empieza desde 1
    
        let maxId = 0
    
        arr.forEach(obj => {
          Object.keys(obj).forEach(key => {           
            console.log(key)
            
            if (key.toLowerCase().includes("id") && typeof obj[key] === "number") {
              maxId = Math.max(maxId, obj[key])
            }
          })
        })
    
        return maxId + 1
      }

      // const result = getNestedObject(newDate)

      newDate.id = getNextId(data)

      setData([...data, newDate])

      handleOpen()
    } catch (error) {
      console.error("Error al crear el elemento:", error)
    }
  }
  //&& key === 'IdVideoFK' 
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
                .filter((col) => !/id/i.test(col) || col === "IdVideoFK") // Ignorar columnas que contengan "id"
                .map((col, index) => (
                  <div key={index}>
                    <label htmlFor={col}>{col}</label>
                    <input
                      type="text"
                      id={col}
                      name={col}
                      value={formData[col] || ""}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              <button className={`${Styles.Acept} ${Styles.Button1}`} type="submit">
                Aceptar
              </button>
              <button className={`${Styles.Cancel} ${Styles.Button1}`} type="button" onClick={handleOpen}>
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
