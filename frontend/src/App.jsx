import './App.css'

import { Route, Routes } from "react-router-dom" 

import Navbar from './Components/Navbar/Navbar'

import Home from './Components/Home/Home'
import RateUs from './Components/RateUs/RateUs'
import Login from './Components/Login/Login'

import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoutes'

import UseUserStore from "./Stores/UseUserStore"

import CrudUsers from './Components/Crud/CrudUsers/Users'

function App() {

  const LoggedInUser = () => {
    const user = UseUserStore((state) => state.user)
    return Object.values(user).every(Boolean)
  }

  const ValidUser = LoggedInUser()

  return (
    <div className='Home'>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Entrar" element={<Login />} />
        <Route exact path="/Calificarnos" element={<RateUs />} />
        
        <Route element={<ProtectedRoute IsAllowed={ValidUser} />}>
          <Route exact path="/CrudIndex" element={<CrudUsers />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
