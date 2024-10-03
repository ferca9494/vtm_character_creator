import "./App.css";
import "./Styles/Main.css";
import "./Styles/MainResp.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ListaPersonajes from "./Controller/Pantallas/ListaPersonajes.js";
import NuevoPersonaje from "./Controller/Pantallas/NuevoPersonaje.js";
import JugarPersonaje from "./Controller/Pantallas/JugarPersonaje.js";

function App() {
  // Estado inicial que intenta obtener el valor de localStorage
  const [listaPersonajes, setListaPersonajes] = useState(() => {
    const datoGuardado = localStorage.getItem("listaPersonajes");
    return datoGuardado ? JSON.parse(datoGuardado) : [];
  });

  // Guarda el dato en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("listaPersonajes", JSON.stringify(listaPersonajes));
  }, [listaPersonajes]);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ListaPersonajes />} />
        <Route path="/nuevo" element={<NuevoPersonaje />} />
        <Route path="/pj" element={<JugarPersonaje />} />
      </Routes>
    </Router>
  );
}

export default App;
