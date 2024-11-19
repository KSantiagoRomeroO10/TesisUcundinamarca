import Styles from './Navbar.module.css'
import HamburgerMenu from './HamburgerMenu/HamburgerMenu'

const Navbar = () => {

  const routes = ['/Instrucciones', '/Entrar', '/Calificarnos']

  return(
    <nav className={Styles.navbar}>
      <h1>Lengua de señas Colombiana</h1>
      <HamburgerMenu routes={routes}/>
    </nav>
  )
}

export default Navbar
