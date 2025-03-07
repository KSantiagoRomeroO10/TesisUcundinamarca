import Styles from './ChartPdf.module.css'
import { useRef, useEffect, useState } from 'react'
import { Chart } from 'chart.js/auto'
import { jsPDF } from 'jspdf'

const ChartComponent = () => {
  // Estados para los datos
  const [words, setWords] = useState([])
  const [count, setCount] = useState([])
  const [evaluationData, setEvaluationData] = useState({})
  const [userIds, setUserIds] = useState([])
  const [userRecommendations, setUserRecommendations] = useState([])
  const [wordUserCount, setWordUserCount] = useState({})

  // Referencias para los gráficos
  const chartContainer1 = useRef(null)
  const chartContainer2 = useRef(null)
  const chartContainer3 = useRef(null)
  const chartInstance1 = useRef(null)
  const chartInstance2 = useRef(null)
  const chartInstance3 = useRef(null)

  // Cargar los datos de palabras
  useEffect(() => {
    const dataWords = async () => {
      try {
        const response = await fetch('http://localhost:3001/word/get')
        const data = await response.json()
        setWords(data.words)
        setCount(data.count)
      } catch (error) {
        console.error('Error al cargar los datos:', error.message)
      }
    }

    dataWords()
  }, [])

  // Cargar los datos de evaluación
  useEffect(() => {
    const dataEvaluation = async () => {
      try {
        const response = await fetch('http://localhost:3001/evaluation/get/promedio')
        const data = await response.json()
        setEvaluationData(data)
      } catch (error) {
        console.error('Error al cargar los datos de evaluación:', error.message)
      }
    }

    dataEvaluation()
  }, [])

  // Cargar los datos de recomendaciones por usuario
  useEffect(() => {
    const fetchUserRecommendations = async () => {
      try {
        const response = await fetch('http://localhost:3001/word/getall')
        const data = await response.json()

        // Extraer los IDs de los usuarios y el total de recomendaciones por usuario
        const userIds = Object.keys(data.userWordCount)
        const userRecommendations = userIds.map(userId => {
          const userWords = data.userWordCount[userId]
          return Object.values(userWords).reduce((acc, count) => acc + count, 0)
        })
        const names = []
        userIds.map(async (userId) => {
          const responseUsers = await fetch(`http://localhost:3001/user/get/id/${userId}`)
          const dataUsers = await responseUsers.json()
          names.push({ name: dataUsers.name, id: userId })
        })
        
        setUserIds(userIds)
        setUserRecommendations(userRecommendations)


        // Procesar los datos para contar cuántos usuarios recomendaron cada palabra
        const wordCount = {}
        userIds.forEach(userId => {
          const userWords = data.userWordCount[userId]
          Object.keys(userWords).forEach(word => {
            if (!wordCount[word]) {
              wordCount[word] = 0
            }
            wordCount[word] += 1 // Contar usuarios, no la cantidad de veces
          })
        })        

        setWordUserCount(wordCount) // Actualizar el estado con el conteo de usuarios por palabra
      } catch (error) {
        console.error('Error al cargar los datos de usuarios:', error.message)
      }
    }

    fetchUserRecommendations()
  }, [])

  // Crear o actualizar los gráficos cuando los datos estén listos
  useEffect(() => {
    // Gráfico 1 (Palabras)
    if (words.length > 0 && count.length > 0) {
      if (chartInstance1.current) {
        chartInstance1.current.destroy()
      }

      const ctx1 = chartContainer1.current.getContext('2d')
      chartInstance1.current = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: words,
          datasets: [{
            label: 'Conteo de palabras recomendadas',
            data: count,
            backgroundColor: 'rgba(75, 192, 192, 0.53)',
            borderColor: 'rgba(75, 192, 192)',
            borderWidth: 2,
            borderRadius: 5,
          }],
        },
      })
    }

    // Gráfico 2 (Evaluación)
    if (evaluationData.traduccion && evaluationData.software) {
      if (chartInstance2.current) {
        chartInstance2.current.destroy()
      }

      const ctx2 = chartContainer2.current.getContext('2d')
      chartInstance2.current = new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: ['Traducción', 'Software'],
          datasets: [{
            label: 'Evaluación',
            data: [evaluationData.traduccion, evaluationData.software],
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255)',
            borderWidth: 2,
            borderRadius: 5,
          }],
        },
        options: {
          scales: {
            y: {
              max: 5,
              min: 0,
            },
          },
        },
      })
    }

    // Gráfico 3 (Usuarios que recomendaron cada palabra)
    if (Object.keys(wordUserCount).length > 0) {
      if (chartInstance3.current) {
        chartInstance3.current.destroy()
      }

      const ctx3 = chartContainer3.current.getContext('2d')
      chartInstance3.current = new Chart(ctx3, {
        type: 'bar',
        data: {
          labels: Object.keys(wordUserCount),
          datasets: [{
            label: 'Usuarios que recomendaron cada palabra',
            data: Object.values(wordUserCount),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235)',
            borderWidth: 2,
            borderRadius: 5,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    }

    // Limpiar los gráficos al desmontar el componente
    return () => {
      if (chartInstance1.current) {
        chartInstance1.current.destroy()
      }
      if (chartInstance2.current) {
        chartInstance2.current.destroy()
      }
      if (chartInstance3.current) {
        chartInstance3.current.destroy()
      }
    }
  }, [words, count, evaluationData, userIds, userRecommendations, wordUserCount])

  // Descargar ambos gráficos como PDF
  const downloadPDF = () => {
    const doc = new jsPDF()

    // Establecer el tamaño de fuente
    doc.setFontSize(16)

    // Título del primer gráfico
    const title1 = 'Palabras recomendadas'
    doc.text(title1, 10, 10)

    // Párrafo del primer gráfico
    const paragraph1 = 'A continuación se muestra una tabla en la que se hace el conteo de cada palabra recomendada.'
    const splitParagraph1 = doc.splitTextToSize(paragraph1, 250)
    doc.setFontSize(12)
    doc.text(splitParagraph1, 10, 20)

    // Gráfico 1
    const canvas1 = chartContainer1.current
    const imgData1 = canvas1.toDataURL('image/png')
    doc.addImage(imgData1, 'PNG', 10, 30, 180, 160)

    // Salto de página para el siguiente gráfico
    doc.addPage()

    // Título del segundo gráfico
    const title2 = 'Promedio de evaluaciones'
    doc.setFontSize(16)
    doc.text(title2, 10, 10)

    // Párrafo del segundo gráfico
    const paragraph2 = 'A continuación se muestra una tabla en la que se hace promedio de calificaciones dadas a la traducción y el software.'
    const splitParagraph2 = doc.splitTextToSize(paragraph2, 250)
    doc.setFontSize(12)
    doc.text(splitParagraph2, 10, 20)

    // Gráfico 2
    const canvas2 = chartContainer2.current
    const imgData2 = canvas2.toDataURL('image/png')
    doc.addImage(imgData2, 'PNG', 10, 30, 180, 160)

    // Título del tercer gráfico
    const title3 = 'Usuarios que recomendaron cada palabra'
    doc.setFontSize(16)
    doc.text(title3, 10, 10)

    // Párrafo del tercer gráfico
    const paragraph3 = 'A continuación se muestra una tabla en la que se hace el conteo de usuarios que recomendaron cada palabra.'
    const splitParagraph3 = doc.splitTextToSize(paragraph3, 250)
    doc.setFontSize(12)
    doc.text(splitParagraph3, 10, 20)

    // Gráfico 3
    const canvas3 = chartContainer3.current
    const imgData3 = canvas3.toDataURL('image/png')
    doc.addImage(imgData3, 'PNG', 10, 30, 180, 160)

    // Descargar el archivo PDF
    doc.save('Reporte.pdf')
  }

  return (
    <div className={Styles.ContainerChart}>
      <h1>Palabras recomendadas</h1>
      <p>A continuación se muestra una tabla en la que se hace el conteo de cada palabra recomendada.</p>
      <div>
        <canvas ref={chartContainer1}></canvas>
      </div>

      <h1>Promedio de evaluaciones</h1>
      <p>A continuación se muestra una tabla en la que se hace promedio de calificaciones dadas a la traducción y el software.</p>
      <div>
        <canvas ref={chartContainer2}></canvas>
      </div>

      <h1>Usuarios que recomendaron cada palabra</h1>
      <p>A continuación se muestra una tabla en la que se hace el conteo de usuarios que recomendaron cada palabra.</p>
      <div>
        <canvas ref={chartContainer3}></canvas>
      </div>

      <button
        onClick={downloadPDF}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Descargar PDF
      </button>
    </div>
  )
}

export default ChartComponent