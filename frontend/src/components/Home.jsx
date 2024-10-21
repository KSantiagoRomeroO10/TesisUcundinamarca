import React, { useState } from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TableSortLabel,Button,Dialog,DialogTitle,
DialogContent,DialogActions,TextField,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export function Home() {
  const [rows, setRows] = useState([]); // Almacena los datos de la tabla
  const [open, setOpen] = useState(false); // Controla el diálogo
  const [newRow, setNewRow] = useState({ word: '', videoUrl: '' }); // Almacena los datos del nuevo registro

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewRow({ ...newRow, [e.target.name]: e.target.value });
  };

  const handleAddRow = () => {
    if (newRow.word && newRow.videoUrl) {
      setRows([...rows, newRow]);
      setNewRow({ word: '', videoUrl: '' });
      handleClose();
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Agregar Video
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel>Palabra</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>URL del Video</TableSortLabel>
              </TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.word}</TableCell>
                <TableCell>
                  <a href={row.videoUrl} target="_blank" rel="noopener noreferrer">
                    Ver Video
                  </a>
                </TableCell>
                <TableCell>
                  <Button onClick={() => console.log("Editar", row)}>Editar</Button>
                  <Button onClick={() => {
                    const newRows = rows.filter((_, i) => i !== index);
                    setRows(newRows);
                  }}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Video de Lengua de Señas</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="word"
            label="Palabra"
            type="text"
            fullWidth
            value={newRow.word}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="videoUrl"
            label="URL del Video"
            type="url"
            fullWidth
            value={newRow.videoUrl}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAddRow}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
