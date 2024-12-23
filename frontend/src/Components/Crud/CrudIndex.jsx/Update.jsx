import Styles from './Update.module.css'

import { useEffect, useState } from "react"

const Updates = ({ id, data, setData }) => {

  const [open, setOpen] = useState(false)

  const [email, setEmail] = useState("")
  const [nombre, setNombre] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [errorEmpty, setErrorEmpty] = useState(false)

  const handleForm = (event) => {
    event.preventDefault()    

    if(email && nombre && contraseña){
      console.log('Error de campos vacios')
    }
  }

  const handleOpen = () => {
    setOpen(!open)
  }

  useEffect(() => {    
    const updateData = data.filter(item => item.id === id)  

    setEmail(updateData.email)
    setNombre(updateData.name)
    setContraseña(updateData.password)
    console.log(id, email, nombre, contraseña)
  }, [])

  return(
    <div>
      <button onClick={handleOpen}>Actualizar</button>
      {open && (
        <section className={Styles.Container}>
          <h1>Actualizar Datos</h1>
          <br />
          <hr />
          <form className={Styles.Formulario} onSubmit={handleForm}>
            <input 
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo Electrónico"
            />
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
            />
            <br />
            <input
              type="text"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Contraseña"
            />
            <br />
            <button>Actualizar</button>
            <br />
            <br />
            {errorEmpty && <p className={Styles.Error}>Todos los campos son obligatorios.</p>}
          </form>
        </section>
      )}
    </div>
  )
}

export default Updates
