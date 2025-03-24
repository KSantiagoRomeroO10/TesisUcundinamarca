import Styles from './Delete.module.css'
import { useState } from "react"

const Delete = ({ endPointDelete, id, data, setData, setSuccessEliminate }) => {

  const [open, setOpen] = useState(false)

  const handlerDeleteData = async () => {    
    try {
      const response = await fetch(`${endPointDelete}/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error("Error al eliminar el elemento.")
      }

      const responseDelete = await response.json()

      const deleteData = data.filter(item => item.id !== id)
      setData(deleteData)
      setSuccessEliminate('¡Elemento eliminado con éxito!')

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => setSuccessEliminate(''), 5000)

      handleOpen()
      console.log(responseDelete)
    } 
    catch (error) {
      console.error("Error eliminando el elemento:", error)
    }
  }

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <div>
      <button className={Styles.Button} onClick={handleOpen}>Eliminar</button>
      
      {open && (
      <div className={Styles.ContainerSpam}>
        <div className={Styles.SubContainer}>
          <h2>Eliminar</h2>
          <br />
          <p>¿Está seguro de que desea eliminar?</p>
          <br />          
          <button className={`${Styles.Button} ${Styles.Button1}`} onClick={handlerDeleteData}>Eliminar</button>
          <button className={Styles.Cancel} onClick={handleOpen}>Cancelar</button>
        </div>        
      </div>
      )}

    </div>
  )
}

export default Delete
