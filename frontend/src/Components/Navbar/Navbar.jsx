import Styles from './Navbar.module.css'
import HamburgerMenu from './HamburgerMenu/HamburgerMenu'
import { NavLink } from 'react-router-dom'

const Navbar = ({ ValidUser }) => {

  let routes = []

  if(ValidUser){
    routes = ['/Instrucciones', '/Calificarnos', '/CrudIndex', '/Reportes', '/Salir']
  }
  else{
    routes = ['/Instrucciones', '/Entrar', '/Calificarnos']
  }

  return(
    <nav className={Styles.Navbar}>
      <NavLink to='/'>
        <h1>Mundo Señas</h1>
      </NavLink>
      <HamburgerMenu routes={routes}/>
    </nav>
  )
}

export default Navbar
