// /services/startPythonAPI.js

const { spawn } = require('child_process')
const axios = require('axios')

const startPythonAPI = () => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['./ApiPython/Api.py'])

    // pythonProcess.stdout.on('data', (data) => {
    //   console.log(`stdout: ${data}`)
    // })

    // pythonProcess.stderr.on('data', (data) => {
    //   console.error(`stderr: ${data}`)
    // })

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(`Proceso Python terminado con código ${code}`)
      }
    })

    const checkAPI = async () => {
      try {
        const response = await axios.get('http://localhost:5000/check')
        if (response.status === 200) {
          resolve('Proceso Python iniciado y API accesible.')
        }
        else {
          reject('Error desde la Api de la ruta http://localhost:5000/check.')
        }
      } 
      catch (error) {
        reject(`Error accediendo a la API de Python: ${error.message}`)
      }
    }
    console.log('Iniciando la api de python por favor espere.')
    setTimeout(checkAPI, 15000)
  })
}

module.exports = startPythonAPI
