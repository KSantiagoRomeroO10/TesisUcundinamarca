import { useState, useEffect } from 'react'
import CRUD from "../CRUD/CRUD"

const CRUDUsers = () => {
  const [data, setData] = useState([])
  const [titles, setTitles] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/keyWord/get`)
      const keyWordsData = await response.json()
      setData(keyWordsData)
      setTitles(Object.keys(keyWordsData[0] || []))
    }

    fetchData()
  }, [])

  return (
    <CRUD rowsTitle={titles} data={data} titleButton={'Evaluations'} />
  )
}

export default CRUDUsers
