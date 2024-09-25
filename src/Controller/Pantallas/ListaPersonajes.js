import React, { useState } from "react";

import { Link } from "react-router-dom";
import "../../Styles/ListaPersonajes.css";
import Clans from "../../Data/Clanlist.js";

function ListaPersonajes() {
  // Estado inicial que intenta obtener el valor de localStorage
  const [listaPersonajes, setListaPersonajes] = useState(() => {
    const datoGuardado = localStorage.getItem("listaPersonajes");
    return datoGuardado ? JSON.parse(datoGuardado) : [];
  });

  return (
    <div className="App">
      <header className="App-header">
        <h2>Lista de Personajes</h2>
        <br />
        <Link to="/nuevo">Nuevo Personaje</Link>
      </header>
      <section id="main">
        <section id="listaPersonajes">
          {listaPersonajes.map((item, index) => {
            let clanimg = Clans.find((elem) => elem.name == item.clan).logoImg;

            return (
              <div class="personaje">
                <div class="avatar">
                  <img
                    src={require("../../Assets/img/Clans/" +
                      item.clan +
                      "/" +
                      clanimg)}
                    class="ClanMiniLogo"
                    alt=""
                  />
                </div>
                <br />
                {item.nombre}
              </div>
            );
          })}
        </section>
      </section>
    </div>
  );
}

export default ListaPersonajes;
