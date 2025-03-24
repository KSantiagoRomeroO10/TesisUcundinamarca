import { useEffect, useState } from "react"
import Styles from "./Read.module.css"

import Delete from "./Delete"
import Update from "./Update"

let totalAudios = 49 // Constante para el número total de audios
let idAudios = []

const Read = ({
  data,
  setData,
  columns,
  endPointUpdate,
  endPointRead,
  endPointDelete,
  setSuccessMessage,
  setSuccessEliminate
}) => {
  // Estados para manejar audio
  const [audioUrl, setAudioUrl] = useState("")
  const [activeAudioId, setActiveAudioId] = useState(null)

  // Función para cargar y mostrar el audio bajo demanda
  const AudioShow = async (id) => {
    try {
      const response = await fetch(`${endPointRead}${id}`, { method: "GET" })
      const audioData = await response.json()
      
      // Liberar la URL anterior
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }

      // Crear nueva URL a partir de los bytes recibidos
      const newUrl = URL.createObjectURL(
        new Blob([Uint8Array.from(audioData.audioBlob.data)])
      )
      setAudioUrl(newUrl)
      setActiveAudioId(id)
    } catch (error) {
      console.error(`Error al cargar el audio con ID ${id}:`, error)
    }
  }

  // Función para inicializar la estructura de datos sin cargar los audios
  const ReadData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/audio/getting/usersaudio`, { method: "GET" })
      const audioData = await response.json()
      
      idAudios = audioData.map((audio) => audio.idAudio)
      totalAudios = idAudios.length   
    }
    catch (error) {
      console.error(`Error al generar los ID:`, error)
    }
    
    const newData = Array.from({ length: totalAudios }, (_, index) => ({
      id: idAudios[index],
      audioBlob: null, // Inicializar sin datos de audio
    }))
    setData(newData)
  }

  // Cargar la estructura de datos al montar el componente
  useEffect(() => {
    ReadData()
  }, [])

  return (
    <div className={Styles.TableContainer}>
      <table className={Styles.CustomTable}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={Styles.TableHeader}>
                {column.toUpperCase()}
              </th>
            ))}
            <th colSpan={2} className={Styles.TableHeader}>
              ACCIONES
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                rowIndex % 2 === 0 ? Styles.TableRowEven : Styles.TableRowOdd
              }
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={Styles.TableCell}>
                  {/* Lógica condicional para la columna "audio" */}
                  {column === "audio" ? (
                    activeAudioId === row.id ? (
                      <audio controls autoPlay>
                        <source src={audioUrl} type="audio/mp3" />
                        Tu navegador no soporta audio HTML5.
                      </audio>
                    ) : (
                      <button onClick={() => AudioShow(row.id)}>
                        Escuchar Audio
                      </button>
                    )
                  ) : (
                    // Cualquier otra columna se muestra tal cual
                    row[column]
                  )}
                </td>
              ))}
              <td className={Styles.TableCell}>
                <Delete
                  endPointDelete={endPointDelete}
                  id={row.id}
                  data={data}
                  setData={setData}
                  setSuccessEliminate={setSuccessMessage}
                />
              </td>
              <td className={Styles.TableCell}>
                <Update
                  endPointUpdate={endPointUpdate}
                  columns={columns}
                  id={row.id}
                  data={data}
                  setData={setData}
                  setSuccessMessage={setSuccessMessage}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Read