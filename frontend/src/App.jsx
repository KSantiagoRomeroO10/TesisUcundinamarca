import './App.css'

import { Route, Routes } from "react-router-dom" 

import Navbar from './Components/Navbar/Navbar'

import Home from './Components/Home/Home'
import RateUs from './Components/RateUs/RateUs'

function App() {

  return (
    <div className='Home'>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Calificarnos" element={<RateUs />} />
      </Routes>
    </div>
  )
}

export default App
