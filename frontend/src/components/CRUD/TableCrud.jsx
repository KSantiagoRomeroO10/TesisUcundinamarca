import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material'
import { useState } from 'react'

const TableCrud = ({ rowsTitle, rows, onEdit, onDelete }) => {
  const [videoUrl, setVideoUrl] = useState('')
  const [activeVideoId, setActiveVideoId] = useState(null)
  const [audioUrl, setAudioUrl] = useState('')
  const [activeAudioId, setActiveAudioId] = useState(null)

  const VideoShow = (data, id) => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl)
    }
    const url = URL.createObjectURL(new Blob([Uint8Array.from(data)]))
    setVideoUrl(url)
    setActiveVideoId(id)
  }

  const AudioShow = (data, id) => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    const url = URL.createObjectURL(new Blob([Uint8Array.from(data)]))
    setAudioUrl(url)
    setActiveAudioId(id)
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {rowsTitle.map((title, index) => (
              <TableCell key={index}>
                {title.charAt(0).toUpperCase() + title.slice(1)}
              </TableCell>
            ))}
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rows).map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {rowsTitle.map((title, cellIndex) => (
                <TableCell key={cellIndex}>
                  {title === 'video' ? (
                    activeVideoId === row.idVideo ? (
                      <video controls width="400" autoPlay>
                        <source src={videoUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <Button variant="contained" onClick={() => VideoShow(row.video, row.idVideo)}>
                        Ver Video
                      </Button>
                    )
                  ) : title === 'audio' ? (
                    activeAudioId === row.idAudio ? (
                      <audio controls autoPlay>
                        <source src={audioUrl} type="audio/mp3" />
                      </audio>
                    ) : (
                      <Button variant="contained" onClick={() => AudioShow(row.audio, row.idAudio)}>
                        Escuchar Audio
                      </Button>
                    )
                  ) : (
                    row[title]
                  )}
                </TableCell>
              ))}
              <TableCell>
                <Button onClick={() => onEdit(row, rowIndex)}>Editar</Button>
                <Button onClick={() => onDelete(row[rowsTitle[0]], rowIndex)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableCrud
