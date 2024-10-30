import Styles from "./Login.module.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UseUserStore from '../../Stores/UseUserStore'

const Login = () => {

  const updateUser = UseUserStore((state) => state.updateUser)

  const LoggedInUser = () => {
    const userLogin = UseUserStore((state) => state.user)
    return Object.values(userLogin).every(Boolean)
  }

  const [nombre, setNombre] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [error, setError] = useState(false) // Error cuando hay campos vacios

  const [userNotFound, setuserNotFound] = useState(false) 
  const [loguearse, setLoguearse] = useState(false)
  const [datesWrong, setDatesWrong] = useState(false)

  const ValidUser = LoggedInUser()
  
  useEffect(() => {
    setLoguearse(!ValidUser)
  }, [ValidUser]) // Solo se ejecuta cuando cambia `ValidUser`

  const navigate = useNavigate() // Aquí se define 'navigate'

  const handleSubmit = async (e) => {
    e.preventDefault() // Evitar refrescar la página por defecto

    if (nombre === "" || contraseña === "") {
      setError(true)
      setuserNotFound(false)      
      setDatesWrong(false)
      return
    }
    setError(false)

    await fetch(`http://localhost:3001/user/get/name/${nombre}`)
    .then(response => {
      if(response.status === 404){
        setuserNotFound(true)
        throw new Error('Usuario no encontrado')    
      }
      if (!response.ok) {
        throw new Error('Error en la solicitud')
      }
      return response.json()
    })
    .then(data => {
      if(nombre === data.name && contraseña === data.password){
        const user = {
          id: data.idUser,
          email: data.email,
          name: data.name,
        }
        updateUser(user)    
        navigate("/crudIndex")        
      }
      else{
        setDatesWrong(true)
      }
    })
    .catch(error => {
      setuserNotFound(true)
      console.error('Error:', error.message)
    })
  }

  setTimeout(() => {
    setLoguearse(false)
  }, 5000)

  return (
    <section>
      <h1>Inicio de Sesión</h1>

      <form className={Styles.formulario} onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          placeholder="Contraseña"
        />
        <button>Iniciar sesion</button>
      </form>
      {error && <p>Todos los campos son obligatorios.</p>}
      {loguearse && <p>No ha iniciado sesión.</p>}
      {userNotFound && <p>Usuario no encontrado.</p>}
      {datesWrong && <p>Datos incorrectos, vuelva a intentarlo.</p>}
    </section>
  )
}

export default Login