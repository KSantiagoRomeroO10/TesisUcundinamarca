import './App.css'

import { Route, Routes } from "react-router-dom" 

import Navbar from './Components/Navbar/Navbar'

import Home from './Components/Home/Home'
import RateUs from './Components/RateUs/RateUs'
import Login from './Components/Login/Login'

import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoutes'

import UseUserStore from "./Stores/UseUserStore"

import Instructions from './Components/Instructions/Instructions'

import CrudIndex from './Components/Crud/IndexCrud/IndexCrud'

import CrudUsers from './Components/Crud/CrudUsers/Users'
import CrudEvaluation from './Components/Crud/CrudEvaluations/Evaluations'
import CrudKeywords from './Components/Crud/CrudKeywords/Keywords'
import CrudVideos from './Components/Crud/CrudVideos/Videos'
import CrudAudios from './Components/Crud/CrudAudios/Audios'

import ChartPdf from './Components/ChartPdf/ChartPdf'

import Exit from './Components/Exit/Exit'

function App() {

  const LoggedInUser = () => {
    const user = UseUserStore((state) => state.user)
    return Object.values(user).every(Boolean)
  }

  const ValidUser = LoggedInUser()

  return (
    <div className='Home'>
      <Navbar ValidUser={ValidUser}/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Entrar" element={<Login />} />
        <Route exact path="/Calificarnos" element={<RateUs />} />
        <Route exact path="/Instrucciones" element={<Instructions/>} />
        
        <Route element={<ProtectedRoute IsAllowed={ValidUser} />}>
          <Route exact path="/CrudIndex" element={<CrudIndex />} />

          <Route exact path="/CrudUsers" element={<CrudUsers />} />
          <Route exact path="/CrudEvaluation" element={<CrudEvaluation />} />
          <Route exact path="/CrudKeywords" element={<CrudKeywords />} />
          <Route exact path="/CrudVideos" element={<CrudVideos />} />
          <Route exact path="/CrudAudios" element={<CrudAudios />} />

          <Route exact path="/Reportes" element={<ChartPdf />} />
          <Route exact path="/Salir" element={<Exit />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
