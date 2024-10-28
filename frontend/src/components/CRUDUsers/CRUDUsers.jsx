import { useState, useEffect } from 'react'
import CRUD from "../CRUD/CRUD"

const CRUDUsers = () => {
  const [data, setData] = useState([])
  const [titles, setTitles] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/user/get`)
      const userData = await response.json()
      setData(userData)
      setTitles(Object.keys(userData[0] || []))
    }

    fetchData()
  }, [])

  return (
    <CRUD rowsTitle={titles} data={data} titleButton={'Evaluations'} />
  )
}

export default CRUDUsers
