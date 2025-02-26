import Styles from './Videos.module.css'
import Index from '../CrudIndex/Index'

const Audios = () => {

  const columns = ["id", "audio"]

  const endPoints = {
    endPointRead: 'http://localhost:3001/audio/get',
    endPointDelete: 'http://localhost:3001/audio/delete',
    endPointUpdate: 'http://127.0.0.1:8000/djangoaplication/audio/actualizar',
    endPointNew: 'http://127.0.0.1:8000/djangoaplication/subir_audio/'
  }
  
  return (
    <div>
      <br />
      <h1 className={Styles.Title}>CRUD Usuarios</h1>
      <br />
      <Index columns={columns} endPoints={endPoints} />
    </div>
  )
}

export default Audios
