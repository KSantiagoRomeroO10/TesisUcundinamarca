import Styles from './Videos.module.css'
import Index from './Index'

const Videos = () => {

  const columns = ["id", "video"]

  const endPoints = {
    endPointRead: 'http://localhost:3001/video/get/',
    endPointDelete: 'http://localhost:3001/video/delete',
    endPointUpdate: 'http://127.0.0.1:8000/djangoaplication/video/actualizar',
    endPointNew: 'http://127.0.0.1:8000/djangoaplication/subir_video/'
  }
  
  return (
    <div>
      <br />
      <h1 className={Styles.Title}>CRUD Videos</h1>
      <br />
      <Index columns={columns} endPoints={endPoints} />
    </div>
  )
}

export default Videos
