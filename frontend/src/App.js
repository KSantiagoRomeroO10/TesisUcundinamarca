import { useState, useEffect } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom"; 
import micOn from "./images/micOn.webp";
import micOff from "./images/micOff.webp";
import { IconButton } from "@mui/material";
import ReactPlayer from 'react-player';
import { Formulario } from "./components/Formulario"; // Importar Formulario
import { Home } from './components/Home'; // Importar Home
import './App.css';

// Video
const vidUrl = "https://www.youtube.com/watch?v=qG1CQFiHX6c";

// Inicialización del reconocimiento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "es-ES";

function App() {
  const [isListening, setIsListening] = useState(false);
  const [notes, setNotes] = useState(null);
  const location = useLocation(); // Obtener la ubicación actual

  useEffect(() => { handleListen(); }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("Continuar...");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Parar micrófono");
      };
    }
    mic.onstart = () => {
      console.log("Micrófono activado");
    };
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("");
      console.log(transcript);
      setNotes(transcript);
    };
    mic.onerror = (event) => console.log(event.error);
  };

  // Determinar la clase de fondo según la ruta actual
  let backgroundClass = "";
  if (location.pathname === "/login") {
    backgroundClass = "fondoFormulario";
  } else if (location.pathname === "/home") {
    backgroundClass = "fondoHome";
  } else {
    backgroundClass = "App"; // Fondo por defecto
  }

  return (
    <div className={backgroundClass}>
      <Routes>
        {/* Ruta principal */}
        <Route exact path="/" element={
          <>
            <nav className="navbar">
              <div className="navbar-logo">
                <h1 className="titulo">Lengua de Señas Colombiana</h1>
              </div>
              <div className="navbar-buttons">
                <button className="btn instruccion">Instrucciones</button>
                <Link to="/login">
                  <button className="btn entrar">Entrar</button>
                </Link>
              </div>
            </nav>

            <div className="contenedor">
              <div className="microfono">
                <IconButton onClick={() => setIsListening(prevState => !prevState)}>
                  <img className="mic-icon" src={isListening ? micOn : micOff} alt="microfono" />
                </IconButton>
              </div>
              <div className="video">
                <ReactPlayer url={vidUrl} playing={false} volume={0.5} width="400px" height="350px" />
              </div>
            </div>
          </>
        } />

        {/* Ruta del Formulario */}
        <Route path="/login" element={<Formulario />} />

        {/* Ruta del Home */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
