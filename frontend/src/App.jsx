import './App.css'

import { Route, Routes } from "react-router-dom" 

import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'

function App() {

  return (
    <div className='Home'>
      <Navbar/>
      <Home/>
    </div>
  )
}

export default App
