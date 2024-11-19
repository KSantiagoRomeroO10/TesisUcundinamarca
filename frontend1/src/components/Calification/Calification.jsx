import { useState, useEffect } from "react"
import { Typography, Rating, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import Styles from './Calification.module.css'

const Calification = () => {
  const [traduccion, setTraduccion] = useState(0)
  const [software, setSoftware] = useState(0)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (traduccion && software) {
      // Crear el payload de la solicitud
      const payload = {
        traduccion,
        software      
      }      

      try {
        // Realizar la solicitud POST a la API
        const response = await fetch('http://localhost:3001/evaluation/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        console.log(await response.json());
        

        if (response.ok) {
          // Mostrar el mensaje de éxito y redirigir
          alert('Calificación realizada con éxito')
          navigate('/')
        } else {
          alert('Error al enviar la calificación')
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
        alert('Error de red al enviar la calificación')
      }
    } else {
      alert('Por favor, califica ambas preguntas.')
    }
  }

  useEffect(() => {
    console.log(traduccion)    
    console.log(software)    
  }, [traduccion, software])

  return (
    <div className={Styles.container}>
      <div className={Styles.title}>
        <Typography variant="h5" gutterBottom>
          Encuesta de Opinión
        </Typography>
      </div>

      <Typography variant="h6">¿Qué te pareció el software?</Typography>
      <Rating
        name="software-rating"
        value={traduccion}
        onChange={(event, newValue) => setTraduccion(newValue)}
        precision={1}
        max={5}
      />

      <Typography variant="h6" style={{ marginTop: '16px' }}>
        ¿Qué te pareció la calidad de interpretación?
      </Typography>
      <Rating
        name="interpretation-rating"
        value={software}
        onChange={(event, newValue) => setSoftware(newValue)}
        precision={1}
        max={5}
      />
      <div className={Styles.title}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!traduccion || !software}
          style={{ marginTop: '16px' }}
        >
          Enviar
        </Button>
      </div>      
    </div>
  )
}

export default Calification
