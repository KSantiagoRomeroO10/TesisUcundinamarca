import Styles from './Update.module.css'
import { useEffect, useState, useCallback } from 'react'

const Update = ({ endPointUpdate, columns, id, data, setData, setSuccessMessage }) => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({})
  const [errorEmpty, setErrorEmpty] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleForm = async (event) => {
    event.preventDefault()
    if (isLoading) return

    const hasEmptyFields = columns
      .filter((column) => column !== 'id')
      .some((column) => !formData[column])

    if (hasEmptyFields) {
      setErrorEmpty(true)
      return
    }

    setErrorEmpty(false)
    setIsLoading(true)

    try {
      let response
      if (endPointUpdate.toLowerCase().includes('djangoaplication')) {
        const formDataToSend = new FormData()

        // Recorremos las columnas y añadimos los datos al FormData
        columns.forEach((column) => {
          if (column.toLowerCase() === 'video' && formData[column] instanceof File) {
            formDataToSend.append('video_file', formData[column]) // Usamos 'video_file' para videos
          } else if (column.toLowerCase() === 'audio' && formData[column] instanceof File) {
            formDataToSend.append('audio_file', formData[column]) // Usamos 'audio_file' para audios
          }
        })

        response = await fetch(`${endPointUpdate}/${id}/`, {
          method: 'POST',
          body: formDataToSend,
        })
      } else {
        response = await fetch(`${endPointUpdate}/${id}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      }

      const updatedData = data.map((item) =>
        item.id === id ? { ...item, ...formData } : item
      )
      setSuccessMessage('¡Datos actualizados con éxito!')

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => setSuccessMessage(''), 5000)
      setData(updatedData)
      setOpen(false)
      console.log('Datos actualizados con éxito', formData)
    } catch (error) {
      console.error('Error en la actualización:', error)
      alert('Hubo un problema al actualizar los datos. Inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpen = useCallback(() => setOpen((prev) => !prev), [])
  const handleChange = useCallback((key, value) => {
    setFormData((prevState) => ({ ...prevState, [key]: value }))
  }, [])

  const handleFileChange = useCallback((key, file) => {
    setFormData((prevState) => ({ ...prevState, [key]: file }))
  }, [])

  useEffect(() => {
    const updateData = data.find((item) => item.id === id) || {}
    const initialFormData = columns.reduce((acc, column) => {
      acc[column] = updateData[column] || ''
      return acc
    }, {})
    setFormData(initialFormData)
  }, [columns, data, id])

  return (
    <div>
      <button className={Styles.Update} onClick={handleOpen}>
        {open ? 'Cerrar' : 'Actualizar'}
      </button>
      {open && (
        <div className={Styles.Container}>
          <div className={Styles.SubContainer}>
            <h1>Actualizar Datos</h1>
            <form className={Styles.Formulario} onSubmit={handleForm}>
              {columns
                .filter((column) => column !== 'id')
                .map((column) => (
                  <div key={column}>
                    <label htmlFor={column}>
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                    </label>
                    {column.toLowerCase() === 'video' || column.toLowerCase() === 'audio' ? (
                      <input
                        id={column}
                        type="file"
                        onChange={(e) => handleFileChange(column, e.target.files[0])}
                        disabled={isLoading}
                      />
                    ) : (
                      <input
                        id={column}
                        type="text"
                        value={formData[column] || ''}
                        onChange={(e) => handleChange(column, e.target.value)}
                        placeholder={column}
                        disabled={isLoading}
                      />
                    )}
                  </div>
                ))}
              <button
                className={`${Styles.Update} ${Styles.Button1}`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Actualizando...' : 'Actualizar'}
              </button>
              <button
                className={`${Styles.Cancel} ${Styles.Button1}`}
                type="button"
                onClick={handleOpen}
                disabled={isLoading}
              >
                Cancelar
              </button>
              {errorEmpty && (
                <p className={Styles.Error}>Todos los campos son obligatorios.</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Update