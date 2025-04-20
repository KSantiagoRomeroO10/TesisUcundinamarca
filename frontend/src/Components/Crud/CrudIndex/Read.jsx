import { useEffect, useState } from "react"
import Styles from "./Read.module.css"

import Delete from "./Delete"
import Update from "./Update"

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

  // Estados para manejar video
  const [videoUrl, setVideoUrl] = useState("")
  const [activeVideoId, setActiveVideoId] = useState(null)

  // Estados para manejar audio
  const [audioUrl, setAudioUrl] = useState("")
  const [activeAudioId, setActiveAudioId] = useState(null)

  // Función para mostrar el video
  const VideoShow = (binaryData, id) => {   
    // Liberar la URL anterior
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl)
    }
    // Crear nueva URL a partir de los bytes recibidos
    const newUrl = URL.createObjectURL(new Blob([Uint8Array.from(binaryData)]))
    setVideoUrl(newUrl)
    setActiveVideoId(id)
  }

  // Función para mostrar el audio
  const AudioShow = (binaryData, id) => {
    // Liberar la URL anterior
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    // Crear nueva URL a partir de los bytes del audio
    const newUrl = URL.createObjectURL(new Blob([Uint8Array.from(binaryData)]))
    setAudioUrl(newUrl)
    setActiveAudioId(id)
  }

  // Función para traer datos de la API
  const ReadData = async () => {
    const response = await fetch(`${endPointRead}`, { method: "GET" })
    const responseRead = await response.json()
    
    // Ajuste para extraer un ID genérico
    const filteredData = responseRead.map((item) => {
      const idKey = Object.keys(item).find((key) =>
        key.toLowerCase().includes("id")
      )
      const { [idKey]: id, ...rest } = item
      return {
        id,
        ...rest,
      }
    })
    filteredData.pop()
    setData(filteredData)
  }

  useEffect(() => {
    ReadData()
    // eslint-disable-next-line
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
            <th colSpan={2} className={Styles.TableHeader}>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                rowIndex % 2 === 0 
                  ? Styles.TableRowEven 
                  : Styles.TableRowOdd
              }
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={Styles.TableCell}>
                  {/* Lógica condicional para las columnas "video" y "audio" */}
                  {column === "video" ? (
                    activeVideoId === row.id ? (
                      <video controls width="250" autoPlay>
                        <source src={videoUrl} type="video/mp4" />
                        Tu navegador no soporta video HTML5.
                      </video>
                    ) : (
                      <button
                        onClick={() => VideoShow(row.videoBlob.data, row.id)}
                      >
                        Ver Video
                      </button>
                    )
                  ) : column === "audio" ? (
                    activeAudioId === row.id ? (
                      <audio controls autoPlay>
                        <source src={audioUrl} type="audio/mp3" />
                        Tu navegador no soporta audio HTML5.
                      </audio>
                    ) : (
                      <button
                        onClick={() => AudioShow(row.audioBlob.data, row.id)}
                      >
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
                  setSuccessEliminate={setSuccessEliminate}
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
