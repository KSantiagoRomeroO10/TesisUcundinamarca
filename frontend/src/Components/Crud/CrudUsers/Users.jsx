import Styles from './Users.module.css'
import Index from '../CrudIndex/Index'

const Users = () => {

  const columns = ["id", "name", "email", "password"]

  const endPoints = {
    endPointRead: 'http://localhost:3001/user/get',
    endPointDelete: 'http://localhost:3001/user/delete',
    endPointUpdate: 'http://localhost:3001/user/update',
    endPointNew: 'http://localhost:3001/user/new'
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

export default Users
