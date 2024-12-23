import Styles from './Keywords.module.css'
import Index from '../CrudIndex/Index'

const Keywords = () => {

  const columns = ["id", "keyWord", "IdVideoFK"]

  const endPoints = {
    endPointRead: 'http://localhost:3001/keyword/get',
    endPointDelete: 'http://localhost:3001/keyword/delete',
    endPointUpdate: 'http://localhost:3001/keyword/update',
    endPointNew: 'http://localhost:3001/keyword/new'
  }
  
  return (
    <div>
      <br />
      <h1 className={Styles.Title}>CRUD Palabras Clave</h1>
      <br />
      <Index columns={columns} endPoints={endPoints} />
    </div>
  )
}

export default Keywords
