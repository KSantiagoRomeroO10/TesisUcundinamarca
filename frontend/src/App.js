import { Route, Routes } from "react-router-dom" 

import Formulario from "./components/Login/Login"
import CRUDAudios from './components/CRUDAudios/CRUDAudios'
import CRUDEvaluations from './components/CRUDEvaluations/CRUDEvaluations'
import CRUDVideos from './components/CRUDVideos/CRUDVideos'
import CRUDUsers from './components/CRUDUsers/CRUDUsers'
import CRUDKeyWords from './components/CRUDKeyWords/CRUDKeyWords'
import Home from "./components/Home/Home"

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
        <Route exact path="/" element={ <Home />} />

        {/* Ruta del Formulario */}
        <Route path="/login" element={<Formulario />} />
        
        {/* Ruta del Home */}
        <Route element={<ProtectedRoute IsAllowed={ValidUser} />}>
          <Route path="/crud" element={<CRUDVideos />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
