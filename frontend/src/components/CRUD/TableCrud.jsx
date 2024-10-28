import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Button } from '@mui/material'
import { useState } from 'react'

const TableCrud = ({ rowsTitle, rows, onEdit, onDelete }) => {
  const [videoUrl, setVideoUrl] = useState('')
  const [activeVideoId, setActiveVideoId] = useState(null)

  const VideoShow = (data, id) => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl)
    }
    const url = URL.createObjectURL(new Blob([Uint8Array.from(data)]))
    setVideoUrl(url)
    setActiveVideoId(id)
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {rowsTitle.map((title, index) => (
              <TableCell key={index}>
                <TableSortLabel>{title.charAt(0).toUpperCase() + title.slice(1)}</TableSortLabel>
              </TableCell>
            ))}
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {rowsTitle.map((title, cellIndex) => (
                <TableCell key={cellIndex}>
                  {title === 'video' ? (
                    activeVideoId === row.idVideo ? (
                      <video controls width="400" autoPlay loop>
                        <source src={videoUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <Button variant="contained" onClick={() => VideoShow(row.video, row.idVideo)}>
                        Ver Video
                      </Button>
                    )
                  ) : (
                    row[title]
                  )}
                </TableCell>
              ))}
              <TableCell>
                <Button onClick={() => onEdit(row)}>Editar</Button>
                <Button onClick={() => onDelete(rowIndex)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableCrud
