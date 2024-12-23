import Styles from './Evaluations.module.css'
import Index from '../CrudIndex/Index'

const Evaluations = () => {

  const columns = ["id", "traduccion", "software"]

  const endPoints = {
    endPointRead: 'http://localhost:3001/evaluation/get',
    endPointDelete: 'http://localhost:3001/evaluation/delete',
    endPointUpdate: 'http://localhost:3001/evaluation/update',
    endPointNew: 'http://localhost:3001/evaluation/new'
  }
  
  return (
    <div>
      <br />
      <h1 className={Styles.Title}>CRUD Evaluaciones</h1>
      <br />
      <Index columns={columns} endPoints={endPoints} />
    </div>
  )
}

export default Evaluations
