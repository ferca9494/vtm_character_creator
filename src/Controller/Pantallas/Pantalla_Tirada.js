import React, { useState } from "react";

import "../../Styles/JugarPersonaje.css";
import { HistorialTiradasComp } from "../Tiradas/HistorialTiradas.js";
import { NuevaTiradaComp } from "../Tiradas/NuevaTirada.js";
import { Header } from "../Componentes/header.js";

function PantallaTirada() {
  const [Historial, setHistorial] = useState(() => {
    const datoGuardado = localStorage.getItem("Historial");
    return datoGuardado ? JSON.parse(datoGuardado) : [];
  });

  return (
    <div className="App">
      <Header namepage="Tirada Avanzada" active={3}/>
      <div id="secciones">
        <NuevaTiradaComp Historial={Historial} setHistorial={setHistorial} />
      </div>
    </div>
  );
}

export default PantallaTirada;
