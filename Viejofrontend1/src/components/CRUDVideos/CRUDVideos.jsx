import { useState, useEffect } from 'react'
import CRUD from "../CRUD/CRUD"

const CRUDVideos = () => {
   const [data, setData] = useState([])
   const [titles, setTitles] = useState([])

   useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:3001/video/get`)
        const evaluationData = await response.json()
        const transformedData = evaluationData.map(video => ({
          idVideo: video.idVideo,
          video: video.video.data,
          createdAt: video.createdAt,
          updatedAt: video.updatedAt          
        }))

        setData(transformedData)
        setTitles(Object.keys(transformedData[0] || []))
      }
      
      fetchData()
   }, [])   

   const deleteData = async (idVideo) => {    
      const response = await fetch(`http://localhost:3001/video/delete/${idVideo}`, {
        method: 'DELETE'
      })
      const responseDelete = await response.json()
      console.log(responseDelete)    
    }

    const createData = async (newData) => {

      const formData = new FormData()
      formData.append('video', newData.video)

      const response = await fetch(`http://localhost:3001/video/new`, {
        method: 'POST',
        body: formData
      })
      
      const responseCreate = await response.json()
      
      return responseCreate

    }

   return (
      <CRUD rowsTitle={titles} data={data} titleButton={'Videos'} deleteData={deleteData} createData={createData} />
   )
}

export default CRUDVideos
