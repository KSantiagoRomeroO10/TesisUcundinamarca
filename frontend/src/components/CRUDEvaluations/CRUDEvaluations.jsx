import { useState, useEffect } from 'react'
import CRUD from "../CRUD/CRUD"

const CRUDEvaluations = () => {
  const [data, setData] = useState([])
  const [titles, setTitles] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/evaluation/get`)
      const evaluationData = await response.json()
      setData(evaluationData)
      setTitles(Object.keys(evaluationData[0] || []))
    }

    fetchData()
  }, [])

  return (
    <CRUD rowsTitle={titles} data={data} titleButton={'Evaluations'} />
  )
}

export default CRUDEvaluations
