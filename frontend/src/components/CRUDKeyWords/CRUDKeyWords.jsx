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

  const deleteData = async (idkeyword) => {  
    const response = await fetch(`http://localhost:3001/keyword/delete/${idkeyword}`, {
      method: 'DELETE'
    })
    const responseDelete = await response.json()
    console.log(responseDelete)    
  }

  const createData = async (newData) => {
    
    const response = await fetch('http://localhost:3001/keyword/new', {
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
    <CRUD rowsTitle={titles} data={data} titleButton={'Keywords'} deleteData={deleteData} createData={createData} />
  )
}

export default CRUDUsers
