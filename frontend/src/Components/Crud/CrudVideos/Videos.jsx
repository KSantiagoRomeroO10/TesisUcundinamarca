import Styles from './Videos.module.css'
import Index from '../CrudIndex/Index'

const video = () => {

  const columns = ["id", "video"]

  const endPoints = {
    endPointRead: 'http://localhost:3001/video/get',
    endPointDelete: 'http://localhost:3001/video/delete',
    endPointUpdate: 'http://localhost:3001/video/update',
    endPointNew: 'http://localhost:3001/video/new'
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

export default video
