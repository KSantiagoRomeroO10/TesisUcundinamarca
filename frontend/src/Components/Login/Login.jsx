import Styles from "./Login.module.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import UseUserStore from "../../Stores/UseUserStore"

const Login = () => {
  
  const [nombre, setNombre] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [errorEmpty, setErrorEmpty] = useState(false)
  const [notFound, setUserNotFound] = useState(false)

  const navigate = useNavigate()
  
  const updateUser = UseUserStore((state) => state.updateUser)
  // const user1 = UseUserStore((state) => state.user)

  const handleForm = async (event) => {
    event.preventDefault()

    if(nombre === '' && contraseña === '') {
      setErrorEmpty(true)
      setUserNotFound(false)
      return
    }
    setErrorEmpty(false)

    await fetch(`http://localhost:3001/user/get/name/${nombre}`)
      .then(response => {
        if(response.status === 404) {
          setUserNotFound(true)
          return
        }
        if (!response.ok) {
          console.log('Error en la solicitud')          
        }
        return response.json()
      })
      .then(data => {
        if(nombre === data.name && contraseña === data.password){
          const user = {
            id: data.idUser,
            email: data.email,
            name: data.name
          }
          updateUser(user)
          navigate("/CrudIndex")
        }
      })
      .catch(error => {
        console.log(error.message)        
      })
  }

  return (
    <section className={Styles.Container}>
      <h1>Inicio de Sesión</h1>
      <br />
      <hr />
      <form className={Styles.Formulario} onSubmit={handleForm}>
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
        <button type="submit">Iniciar sesión</button>
        <br />
        <br />
        {errorEmpty && <p className={Styles.Error}>Todos los campos son obligatorios.</p>}
        {notFound && <p className={Styles.Error}>Usuario no encontrado.</p>}
      </form>
    </section>
  )
}

export default Login
