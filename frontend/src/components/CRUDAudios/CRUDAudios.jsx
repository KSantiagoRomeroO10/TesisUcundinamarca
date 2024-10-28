import { useState, useEffect } from 'react'
import CRUD from "../CRUD/CRUD"

const CRUDAudios = () => {
  const [data, setData] = useState([])
  const [titles, setTitles] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/audio/get`)
      const evaluationData = await response.json()
      setData(evaluationData)
      setTitles(Object.keys(evaluationData[0] || []))
    }

    fetchData()
  }, [])

  return(
    <CRUD rowsTitle={titles} data={data} titleButton={'Audio'} />
  )
}

export default CRUDAudios
