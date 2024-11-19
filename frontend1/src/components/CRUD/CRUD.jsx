import { useState, useEffect } from 'react'
import AddButton from './AddButton'
import TableCrud from './TableCrud'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'

const CRUD = ({ rowsTitle, data, titleButton, deleteData, createData, updateData }) => {
  // Filtrar los títulos de las columnas no válidas
  let invalidArray = ["idAudio", "idEvaluation", "idKeyWord", "iduser", "idVideo", "createdAt", "updatedAt"]
  const filteredRowsTitle = rowsTitle.filter((title) => !invalidArray.includes(title))
  const initialNewRow = filteredRowsTitle.reduce((acc, title) => ({ ...acc, [title]: '' }), {})

  // Estados
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [newRow, setNewRow] = useState(initialNewRow)
  const [editIndex, setEditIndex] = useState(null) // Índice de la fila que se está editando
  const [isEditMode, setIsEditMode] = useState(false) // Para identificar si estamos en modo edición

  // Abrir el formulario en modo creación
  const handleOpen = () => {
    setIsEditMode(false)
    setOpen(true)
  }

  // Cerrar el formulario y restablecer el estado
  const handleClose = () => {
    setOpen(false)
    setNewRow(initialNewRow)
    setIsEditMode(false)
    setEditIndex(null)
  }

  // Abrir el formulario en modo edición
  const handleEditOpen = (row, index) => {
    setNewRow(row)
    setEditIndex(index)    
    setIsEditMode(true)
    setOpen(true)
  }

  // Manejar cambios en el formulario
  const handleChangeForm = (e) => {
    setNewRow({ ...newRow, [e.target.name]: e.target.value })
  }

  // Manejar cambios de archivos
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.type.startsWith('audio/')) {
        setNewRow({ ...newRow, audio: file })
      }
      else if (file.type.startsWith('video/')) {
        setNewRow({ ...newRow, video: file })
      }
      else {
        alert('Por favor selecciona un archivo de audio o video.')
      }
    }
  }

  // Función para agregar o actualizar una fila
  const handleAddRow = async () => {
    const isValidRow = filteredRowsTitle.every(
      (title) => newRow[title] && newRow[title].toString().trim() !== ''
    )

    if (isValidRow) {
      let updatedRow

      if (isEditMode) {
        // Actualización de datos
        let updatedRow = await updateData(newRow)
        if (updatedRow.newAudio) updatedRow = updatedRow.newAudio
        if (updatedRow.newVideo) updatedRow = updatedRow.newVideo
        if (updatedRow.newUser) updatedRow = updatedRow.newUser
        if (updatedRow.newKeyWord) updatedRow = updatedRow.newKeyWord
        if (updatedRow.newEvaluation) updatedRow = updatedRow.newEvaluation
        
        const updatedRows = [...rows]
        updatedRows[editIndex] = Object.values(updatedRow)[0]
        console.log(editIndex, updatedRow, updatedRows)
        setRows(updatedRows)
      } 
      else {
        // Creación de nueva fila
        updatedRow = await createData(newRow)

        if (updatedRow.newAudio) updatedRow = updatedRow.newAudio
        if (updatedRow.newVideo) updatedRow = updatedRow.newVideo
        if (updatedRow.newUser) updatedRow = updatedRow.newUser
        if (updatedRow.newKeyWord) updatedRow = updatedRow.newKeyWord
        if (updatedRow.newEvaluation) updatedRow = updatedRow.newEvaluation

        setRows([...rows, updatedRow])
      }

      setNewRow(initialNewRow)
      handleClose()
    } else {
      alert("Por favor, completa todos los campos sin dejar espacios en blanco.")
    }
  }

  // Función para eliminar una fila
  const handleDeleteRow = async (index, index2) => {
    setRows(rows.filter((_, i) => i !== index2))
    await deleteData(index)
  }

  useEffect(() => {
    setRows(data)
  }, [data])

  return (
    <div>
      <AddButton title={titleButton} onOpen={handleOpen} />
      <TableCrud rowsTitle={rowsTitle} rows={rows} onEdit={handleEditOpen} onDelete={handleDeleteRow} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditMode ? "Editar Registro" : "Agregar Nuevo Registro"}</DialogTitle>
        <DialogContent>
          {rowsTitle && rowsTitle
            .filter((title) => !invalidArray.includes(title))
            .map((title, index) => (
              title === 'audio' ? (
                <div key={index}>
                  <label htmlFor="audio-upload">Seleccionar Archivo de Audio</label>
                  <input
                    id="audio-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    style={{ display: 'block', marginTop: '8px', marginBottom: '8px' }}
                  />
                  {newRow.audio && <p>Archivo seleccionado: {newRow.audio.name}</p>}
                </div>
              ) : title === 'video' ? (
                <div key={index}>
                  <label htmlFor="video-upload">Seleccionar Archivo de Video</label>
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    style={{ display: 'block', marginTop: '8px', marginBottom: '8px' }}
                  />
                  {newRow.video && <p>Archivo seleccionado: {newRow.video.name}</p>}
                </div>
              ) : (
                <TextField
                  key={index}
                  margin="dense"
                  name={title}
                  label={title.charAt(0).toUpperCase() + title.slice(1)}
                  type="text"
                  fullWidth
                  value={newRow[title] || ''}
                  onChange={handleChangeForm}
                />
              )
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAddRow}>{isEditMode ? "Guardar" : "Agregar"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CRUD
