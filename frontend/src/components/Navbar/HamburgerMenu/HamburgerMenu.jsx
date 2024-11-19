import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './HamburgerMenu.module.css'

const HamburgerMenu = ({ routes }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null) // Referencia al menú desplegable

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={menuRef} className={styles.hamburgerMenu}>
      {/* Botón del ícono del menú */}
      <button onClick={toggleMenu} className={styles.hamburgerIcon}>
        {isOpen ? '✖' : '☰'}
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <nav className={styles.dropdownMenu}>
          <ul>
            {routes.map((route, index) => (
              <li key={index}>
                <NavLink
                  to={route}
                  className={({ isActive }) =>
                    isActive ? `${styles.menuLink} ${styles.active}` : styles.menuLink
                  }
                >
                  {route.charAt(1).toUpperCase() + route.slice(2)} {/* Capitaliza */}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}

export default HamburgerMenu
