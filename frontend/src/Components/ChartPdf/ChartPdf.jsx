import Styles from './ChartPdf.module.css'
import { useRef, useEffect, useState } from 'react'
import { Chart } from 'chart.js/auto'
import { jsPDF } from 'jspdf'

const ChartComponent = () => {

  const [words, setWords] = useState([])
  const [count, setCount] = useState([])
  const [evaluationData, setEvaluationData] = useState({}) // Estado para los datos de evaluación

  const chartContainer1 = useRef(null)
  const chartContainer2 = useRef(null)
  const chartInstance1 = useRef(null)
  const chartInstance2 = useRef(null)

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

  // Crear o actualizar los gráficos cuando los datos estén listos
  useEffect(() => {
    // Gráfico 1 (Palabras)
    if (words.length > 0 && count.length > 0) {
      if (chartInstance1.current) {
        chartInstance1.current.destroy() // Destruir el gráfico existente si hay uno
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
            borderRadius: 5  
          }]
        }
      })
    }

    // Gráfico 2 (Evaluación)
    if (evaluationData.traduccion && evaluationData.software) {
      if (chartInstance2.current) {
        chartInstance2.current.destroy() // Destruir el gráfico existente si hay uno
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
            borderRadius: 5  
          }]
        },
        options: {
          scales: {
            y: {
              max: 5,
              min: 0,
            }
          }
        }
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
    }
  }, [words, count, evaluationData]) // Este efecto depende de los datos

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
    
    // Dividir el párrafo en varias líneas si es necesario
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
    
    // Dividir el párrafo en varias líneas si es necesario
    const splitParagraph2 = doc.splitTextToSize(paragraph2, 250)
    doc.setFontSize(12)
    doc.text(splitParagraph2, 10, 20)
  
    // Gráfico 2
    const canvas2 = chartContainer2.current
    const imgData2 = canvas2.toDataURL('image/png')
    doc.addImage(imgData2, 'PNG', 10, 30, 180, 160)
  
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
      <h1>Promedio de evaliaciones</h1>
      <p>A continuación se muestra una tabla en la que se hace promedio de calificaciones dadas a la traduccion y el software.</p>
      <div>
        <canvas ref={chartContainer2}></canvas>
      </div>
      <button onClick={downloadPDF}>Descargar PDF</button>
    </div>
  )
}

export default ChartComponent
