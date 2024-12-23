import { useState } from "react"

const Updates = ({ id, data, setData }) => {

  const [open, setOpen] = useState(false)

  const [email, setEmail] = useState("")
  const [nombre, setNombre] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [errorEmpty, setErrorEmpty] = useState(false)

  return(
    <div>
      <button>Actualizar</button>
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
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Contraseña"
            />
            <br />
            <button type="submit">Actualizar</button>
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
