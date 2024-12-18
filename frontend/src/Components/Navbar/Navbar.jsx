import Styles from './Navbar.module.css'
import HamburgerMenu from './HamburgerMenu/HamburgerMenu'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const routes = ['/Instrucciones', '/Entrar', '/Calificarnos']

  return(
    <nav className={Styles.Navbar}>
      <NavLink to='/'>
        <h1>Lengua de señas Colombiana</h1>
      </NavLink>
      <HamburgerMenu routes={routes}/>
    </nav>
  )
}

export default Navbar
