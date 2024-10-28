import { useState, useEffect } from 'react'
import AddButton from './AddButton'
import TableCrud from './TableCrud'
import AddForm from './AddForm'

const CRUD = ({ rowsTitle, data, titleButton }) => {
  const initialNewRow = rowsTitle.reduce((acc, title) => ({ ...acc, [title]: '' }), {}) // Genera un objeto vacío dinámico
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [newRow, setNewRow] = useState(initialNewRow)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (e) => {
    setNewRow({ ...newRow, [e.target.name]: e.target.value })
  }

  const handleAddRow = () => {
    if (Object.values(newRow).every(value => value !== '')) { // Validación dinámica
      setRows([...rows, newRow])
      setNewRow(initialNewRow) // Reinicia el formulario de manera dinámica
      handleClose()
    } 
    else {
      alert("Por favor, completa todos los campos.")
    }
  }

  const handleDeleteRow = (index) => setRows(rows.filter((_, i) => i !== index))

  useEffect(() => {
    setRows(data)
  }, [data])

  return (
    <div>
      <AddButton title={titleButton} onOpen={handleOpen} />
      <TableCrud rowsTitle={rowsTitle} rows={rows} onEdit={(row) => console.log("Editar", row)} onDelete={handleDeleteRow} />
      <AddForm open={open} onClose={handleClose} onChange={handleChange} onSubmit={handleAddRow} newRow={newRow} rowsTitle={rowsTitle} />
    </div>
  )
}

export default CRUD
