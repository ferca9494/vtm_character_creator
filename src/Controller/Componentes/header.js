import { useState } from "react";
import { Link } from "react-router-dom";
import { HistorialTiradasComp } from "../Tiradas/HistorialTiradas.js";

export const Header = ({ namepage, active }) => {
  const [topHistorial, settopHistorial] = useState(true);
  const [Historial, setHistorial] = useState(() => {
    const datoGuardado = localStorage.getItem("Historial");
    return datoGuardado ? JSON.parse(datoGuardado) : [];
  });
  return (
    <>
      <div id="top-historial" className={topHistorial ? "invisible" : ""}>
      <button type="" onClick={(e) => settopHistorial(true)}>x</button>
      <HistorialTiradasComp
          Historial={Historial}
          setHistorial={setHistorial}
        />
      </div>
      <header className="App-header">
        <div id="top-header">
          <div></div>
          <div>
            <h2>{namepage}</h2>
          </div>
          <div>
            <button type="" onClick={(e) => settopHistorial(!topHistorial)}>
              A
            </button>
          </div>
        </div>
        <div id="button-header">
          <Link className={"button-12 " + (active == 1 ? "active" : "")} to="/">
            Lista
          </Link>
          <Link
            className={"button-12 " + (active == 2 ? "active" : "")}
            to="/nuevo"
          >
            Nuevo
          </Link>
          <Link
            className={"button-12 " + (active == 3 ? "active" : "")}
            to="/tirada"
          >
            Tirada
          </Link>
        </div>
      </header>
    </>
  );
};
