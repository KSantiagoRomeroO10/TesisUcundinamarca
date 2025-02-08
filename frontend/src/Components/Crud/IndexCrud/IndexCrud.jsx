import Styles from './IndexCrud.module.css'

import { NavLink } from 'react-router-dom'

const IndexCrud = () => {
  return (
    <div className={Styles.Container}>
      <h1>IndexCrud</h1>
      <NavLink to='/CrudUsers' className={Styles.Button}>
        <p>Crud Usuarios</p>
      </NavLink>
      <NavLink to='/CrudEvaluation' className={Styles.Button}>
        <p>Crud Evaluaciones</p>
      </NavLink>
      <NavLink to='/CrudKeywords' className={Styles.Button}>
        <p>Crud Palabras Clave</p>
      </NavLink>
      <NavLink to='/CrudVideos' className={Styles.Button}>
        <p>Crud Videos</p>
      </NavLink>
      <NavLink to='/CrudAudios' className={Styles.Button}>
        <p>Crud Audios</p>
      </NavLink>
    </div>
  )
}

export default IndexCrud