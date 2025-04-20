import { useEffect, useState } from "react"
import Styles from "./Read.module.css"

import Delete from "./Delete"
import Update from "./Update"

let totalVideos = 49 // Constante para el número total de videos
let idVideos = []

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

  // Función para cargar y mostrar el video bajo demanda
  const VideoShow = async (id) => {
    try {
      const response = await fetch(`${endPointRead}${id}`, { method: "GET" })
      const videoData = await response.json()
      
      // Liberar la URL anterior
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl)
      }

      // Crear nueva URL a partir de los bytes recibidos
      const newUrl = URL.createObjectURL(
        new Blob([Uint8Array.from(videoData.videoBlob.data)])
      )
      setVideoUrl(newUrl)
      setActiveVideoId(id)
    } catch (error) {
      console.error(`Error al cargar el video con ID ${id}:`, error)
    }
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

  // Función para inicializar la estructura de datos sin cargar los videos
  const ReadData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/video/getting/usersvideo`, { method: "GET" })
      const videoData = await response.json()
      
      idVideos = videoData.map((video) => video.idVideo)
      totalVideos = idVideos.length   
    }
    catch (error) {
      console.error(`Error al generar los ID:`, error)
    }
    
    const newData = Array.from({ length: totalVideos }, (_, index) => ({
      id: idVideos[index],
      videoBlob: null, // Inicializar sin datos de video
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
                  {/* Lógica condicional para las columnas "video" y "audio" */}
                  {column === "video" ? (
                    activeVideoId === row.id ? (
                      <video controls width="250" autoPlay>
                        <source src={videoUrl} type="video/mp4" />
                        Tu navegador no soporta video HTML5.
                      </video>
                    ) : (
                      <button onClick={() => VideoShow(row.id)}>
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