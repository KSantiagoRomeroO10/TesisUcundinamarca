import { useState, useEffect } from 'react'
import CRUD from "../CRUD/CRUD"

const CRUDAudios = () => {
   const [data, setData] = useState([])
   const [titles, setTitles] = useState([])

   useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('http://localhost:3001/audio/get')
        const evaluationData = await response.json()
        const transformedData = evaluationData.map(audio => ({
          idAudio: audio.idAudio,
          audio: audio.audio.data,
          idKeywordFK: audio.idKeywordFK,
          createdAt: audio.createdAt,
          updatedAt: audio.updatedAt          
        }))

        setData(transformedData)
        setTitles(Object.keys(transformedData[0] || []))
      }
      
      fetchData()
   }, [])   

    const deleteData = async (idAudio) => {    
      const response = await fetch(`http://localhost:3001/audio/delete/${idAudio}`, {
        method: 'DELETE'
      })
      const responseDelete = await response.json()
      console.log(responseDelete)    
    }

    const createData = async (newData) => {

      const formData = new FormData()
      formData.append('audio', newData.audio)
      formData.append('idKeywordFK', newData.idKeywordFK)

      const response = await fetch(`http://localhost:3001/audio/new`, {
        method: 'POST',
        body: formData
      })
      
      const responseCreate = await response.json()
      
      return responseCreate

    }  

  return (
    <CRUD rowsTitle={titles} data={data} titleButton={'Audios'} deleteData={deleteData} createData={createData} />
  )
}

export default CRUDAudios
