import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ClansReact, ClanImg } from "../Clans/Clans.js";
import { NaturalezasReact, ConductasReact } from "../Arquetipos/Arquetipos.js";
import ConceptosReact from "../Conceptos/Conceptos.js";
import "../../Styles/NuevoPersonaje.css";

function NuevoPersonaje() {
  const [selectClan] = useState(ClanImg);

  // Estado inicial que intenta obtener el valor de localStorage
  const [nombre, setNombre] = useState("");
  const [jugador, setJugador] = useState("");
  const [cronica, setCronica] = useState("");
  const [generacion, setGeneracion] = useState(13);
  const [sire, setSire] = useState("");

  function submit() {
    var lista_per = JSON.parse(localStorage.getItem("listaPersonajes"));
    var nue_per = {
      nombre: nombre,
      jugador: jugador,
      cronica: cronica,
      generacion: generacion,
      sire: sire,
    };

    console.log(nue_per);
    localStorage.setItem("nuevo_personaje", JSON.stringify(nue_per));

    console.log(lista_per);
    lista_per.push(nue_per);
    localStorage.setItem("listaPersonajes", JSON.stringify(lista_per));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Nuevo Personaje</h2>
        <Link to="/">volver</Link>

        <img
          src={require("../../Assets/img/Clans" + selectClan)}
          id="ClanLogo"
          alt=""
        />
        <img src="" id="ClanName" alt="" />
      </header>
      <section id="clandata">
        <label htmlFor="clan">Clan</label>
        <br />
        <ClansReact />
      </section>
      <section id="playerdata">
        <div>
          <label htmlFor="nombre">Nombre</label>
          <br />
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            name="nombre"
          />
          <br />
          <label htmlFor="jugador">Jugador</label>
          <br />
          <input
            type="text"
            value={jugador}
            onChange={(e) => setJugador(e.target.value)}
            name="jugador"
          />
          <br />
          <label htmlFor="cronica">Croníca</label>
          <br />
          <input
            type="text"
            value={cronica}
            onChange={(e) => setCronica(e.target.value)}
            name="cronica"
          />
          <br />
        </div>
        <div>
          <label htmlFor="naturaleza">Naturaleza</label>
          <br />
          <NaturalezasReact />
          <br />
          <label htmlFor="conducta">Conducta</label>
          <br />
          <ConductasReact />
          <br />
          <label htmlFor="concepto">Concepto</label>
          <br />
          <ConceptosReact />
          <br />
        </div>
        <div>
          <label htmlFor="generacion">Generación</label>
          <br />
          <input
            type="number"
            value={generacion}
            onChange={(e) => setGeneracion(e.target.value)}
            name="generacion"
            min={8}
            max={15}
          />
          <br />

          <label htmlFor="sire">Sire</label>
          <br />
          <input
            type="text"
            value={sire}
            onChange={(e) => setSire(e.target.value)}
            name="sire"
          />
          <br />
        </div>
      </section>
      <section id="buttons">
        <input type="submit" id="submit" onClick={submit} />
      </section>
    </div>
  );
}

export default NuevoPersonaje;
