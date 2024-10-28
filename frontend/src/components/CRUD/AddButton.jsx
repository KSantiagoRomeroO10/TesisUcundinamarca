import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const AddButton = ({ title, onOpen }) => (
  <Button
    variant="contained"
    startIcon={<AddIcon />}
    onClick={onOpen}
  >
    {title}
  </Button>
)

export default AddButton
