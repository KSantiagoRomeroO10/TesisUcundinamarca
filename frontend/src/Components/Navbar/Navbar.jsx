import Styles from './Navbar.module.css'
import HamburgerMenu from './HamburgerMenu/HamburgerMenu'
import { NavLink } from 'react-router-dom'
import logo from "/Images/Logo.png"
import udec from "/Images/Udec.png"

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
        <img src={logo} alt="Error 404" className={Styles.micIcon} />
        <img src={udec} alt="Error 404" className={Styles.micIcon1} />
      </NavLink>
      <HamburgerMenu routes={routes}/>
    </nav>
  )
}

export default Navbar
