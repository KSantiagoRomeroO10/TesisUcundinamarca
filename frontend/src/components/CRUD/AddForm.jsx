import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const AddForm = ({ open, onClose, onChange, onSubmit, newRow, rowsTitle }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Agregar Nuevo Registro</DialogTitle>
    <DialogContent>
      {rowsTitle.map((title, index) => (
        <TextField
          key={index}
          autoFocus={index === 0}
          margin="dense"
          name={title}
          label={title.charAt(0).toUpperCase() + title.slice(1)}
          type="text" // Puedes adaptar el tipo según el tipo de dato
          fullWidth
          value={newRow[title] || ''}
          onChange={onChange}
        />
      ))}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancelar</Button>
      <Button onClick={onSubmit}>Agregar</Button>
    </DialogActions>
  </Dialog>
);

export default AddForm;
