const { spawn } = require('child_process')
const axios = require('axios')

const startDjangoAPI = () => {
  return new Promise((resolve, reject) => {
    // Ejecuta el comando para iniciar el servidor Django
    const djangoProcess = spawn('python', ['djangoapi/manage.py', 'runserver', '8000'])

    // // Muestra la salida del proceso de Django en la consola
    // djangoProcess.stdout.on('data', (data) => {
    //   console.log(`stdout: ${data}`)
    // })

    // djangoProcess.stderr.on('data', (data) => {
    //   console.error(`stderr: ${data}`)
    // })

    djangoProcess.on('close', (code) => {
      if (code !== 0) {
        reject(`Proceso de Django terminado con código ${code}`)
      }
    })

    // Función para verificar si la API de Django está accesible
    const checkAPI = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin') 
        if (response.status === 200) {
          resolve('Proceso de Django iniciado y API accesible.')
        } else {
          reject('Error desde la API de Django en la ruta http://localhost:8000/admin')
        }
      } catch (error) {
        reject(`Error accediendo a la API de Django: ${error.message}`)
      }
    }

    console.log('Iniciando el servidor de Django, por favor espere.')
    setTimeout(checkAPI, 15000) // Espera un poco para que el servidor se inicie
  })
}

module.exports = startDjangoAPI
