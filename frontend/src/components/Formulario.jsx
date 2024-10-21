import "./Formulario.css"
import {useState} from "react"
import { useNavigate } from "react-router-dom";

export function Formulario(){

    const [nombre, setNombre] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [error, setError] = useState(false)

    const navigate = useNavigate(); // Aquí se define 'navigate'


    const handleSubmit = (e) =>{
        e.preventDefault() // Refrescar la pagina
        
        if (nombre == "" || contraseña == ""){
            setError(true) 
            return
        }
        setError(false)

        // Redirigir al Home
        navigate("/home");

    }
    
    return(
        <section>
            <h1>Inicio de Sesión</h1>

            <form className="formulario"
                  onSubmit={handleSubmit}
            >
                <input type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                />
                <input type="password"
                value={contraseña}
                onChange={e => setContraseña(e.target.value)}/>
                <button>Iniciar sesion</button>
            </form>
            {error && <p>Todos los campos son obligatorios</p>}


        </section>
    )
}