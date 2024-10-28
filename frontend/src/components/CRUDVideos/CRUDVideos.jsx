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
   
   return (
      <CRUD rowsTitle={titles} data={data} titleButton={'Videos'} />
   )
}

export default CRUDVideos
