import { Route, Routes } from "react-router-dom" 

import Formulario from "./components/Login/Login"

import CRUDIndex from './components/CRUDIndex/CRUDIndex'
import CRUDAudios from './components/CRUDAudios/CRUDAudios'
import CRUDEvaluations from './components/CRUDEvaluations/CRUDEvaluations'
import CRUDVideos from './components/CRUDVideos/CRUDVideos'
import CRUDUsers from './components/CRUDUsers/CRUDUsers'
import CRUDKeyWords from './components/CRUDKeyWords/CRUDKeyWords'

import Home from "./components/Home/Home"

import Calification from "./components/Calification/Calification"

import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes'

import UseUserStore from './Stores/UseUserStore'

function App() {

  const LoggedInUser = () => {
    const userLogin = UseUserStore((state) => state.user)
    return Object.values(userLogin).every(Boolean)
  }

  const ValidUser = LoggedInUser()

  return (
    <>
      <Routes>
        {/* Ruta principal */}
        <Route exact path="/" element={<Home />} />

        {/* Ruta para calificar */}
        <Route path="/calification" element={<Calification />} />

        {/* Ruta del Formulario */}
        <Route path="/login" element={<Formulario />} />
        
        {/* Ruta del Home */}
        <Route element={<ProtectedRoute IsAllowed={ValidUser} />}>
          <Route path="/crudIndex" element={<CRUDIndex />} />
          <Route path="/crud1" element={<CRUDAudios />} />
          <Route path="/crud2" element={<CRUDEvaluations />} />
          <Route path="/crud3" element={<CRUDVideos />} />
          <Route path="/crud4" element={<CRUDUsers />} />
          <Route path="/crud5" element={<CRUDKeyWords />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
