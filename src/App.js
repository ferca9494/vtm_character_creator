import "./App.css";
import "./Styles/Main.css";
import "./Styles/MainResp.css";
import React, { useState, useEffect, lazy, Suspense, useCallback, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const ListaPersonajes = lazy(() => import("./Controller/Pantallas/ListaPersonajes.js"));
const NuevoPersonaje = lazy(() => import("./Controller/Pantallas/ABMPersonaje/NuevoPersonaje.js"));
const PantallaTirada = lazy(() => import("./Controller/Pantallas/Pantalla_Tirada.js"));
const JugarPersonaje = lazy(() => import("./Controller/Pantallas/JugarPersonaje.js"));

const LoadingFallback = () => (
  <div style={{ padding: "20px", textAlign: "center" }}>Cargando...</div>
);

function App() {
  const [listaPersonajes, setListaPersonajes] = useState(() => {
    try {
      const datoGuardado = localStorage.getItem("listaPersonajes");
      return datoGuardado ? JSON.parse(datoGuardado) : [];
    } catch {
      return [];
    }
  });

  const [Historial, setHistorial] = useState(() => {
    try {
      const datoGuardado = localStorage.getItem("Historial");
      return datoGuardado ? JSON.parse(datoGuardado) : [];
    } catch {
      return [];
    }
  });

  const saveToLocalStorage = useCallback(() => {
    try {
      localStorage.setItem("listaPersonajes", JSON.stringify(listaPersonajes));
      localStorage.setItem("Historial", JSON.stringify(Historial));
    } catch (e) {
      console.warn("Error saving to localStorage:", e);
    }
  }, [listaPersonajes, Historial]);

  useEffect(() => {
    saveToLocalStorage();
  }, [saveToLocalStorage]);

  const setListaPersonajesMemo = useCallback((value) => {
    setListaPersonajes(value);
  }, []);

  const setHistorialMemo = useCallback((value) => {
    setHistorial(value);
  }, []);

  const contextValue = useMemo(
    () => ({ listaPersonajes, setListaPersonajes: setListaPersonajesMemo, Historial, setHistorial: setHistorialMemo }),
    [listaPersonajes, setListaPersonajesMemo, Historial, setHistorialMemo]
  );

  return (
    <>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route exact path="/" element={<ListaPersonajes />} />
            <Route path="/nuevo" element={<NuevoPersonaje />} />
            <Route path="/tirada" element={<PantallaTirada />} />
            <Route path="/pj/:id" element={<JugarPersonaje />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
