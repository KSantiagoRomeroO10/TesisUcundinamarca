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

  const deleteData = async (idUser) => {    
    const response = await fetch(`http://localhost:3001/user/delete/${idUser}`, {
      method: 'DELETE'
    })
    const responseDelete = await response.json()
    console.log(responseDelete)    
  }

  const createData = async (newData) => {
    const response = await fetch(`http://localhost:3001/user/new/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
    
    const responseCreate = await response.json()
    return responseCreate
  }

  const updateData = async (data) => {
    const response = await fetch(`http://localhost:3001/user/update/${data.idUser}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    
    const responseCreate = await response.json()
    return responseCreate
  }

  return (
    <CRUD rowsTitle={titles} data={data} titleButton={'Usuarios'} deleteData={deleteData} createData ={createData} updateData={updateData} />
  )
}

export default CRUDUsers
