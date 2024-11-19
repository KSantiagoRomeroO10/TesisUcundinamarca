import { useState, useEffect } from 'react'
import CRUD from "../CRUD/CRUD"

const CRUDEvaluations = () => {
  const [data, setData] = useState([])
  const [titles, setTitles] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/evaluation/get', {
        method: 'GET'
      })
      const evaluationData = await response.json()
      console.log(evaluationData)
      
      setData(evaluationData)      
      setTitles(Object.keys(evaluationData[0] || []))
    }

    fetchData()
  }, [])

  const deleteData = async (idEvaluation) => {   
    const response = await fetch(`http://localhost:3001/evaluation/delete/${idEvaluation}`, {
      method: 'DELETE'
    })
    const responseDelete = await response.json()
    console.log(responseDelete)    
  }

  const createData = async (newData) => {
    
    const response = await fetch('http://localhost:3001/evaluation/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
    
    const responseCreate = await response.json()
    
    return responseCreate
  }

  return (
    <CRUD rowsTitle={titles} data={data} titleButton={'Evaluaciones'} deleteData={deleteData} createData={createData} />
  )
}

export default CRUDEvaluations
