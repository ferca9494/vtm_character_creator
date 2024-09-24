import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/ListaPersonajes.css";

function ListaPersonajes() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Lista de Personajes</h2>
        <br />
        <Link to="/nuevo">Nuevo Personaje</Link>
      </header>
      <section id="main">
        <section id="listaPersonajes">
          <div class="personaje">
            <div class="avatar">
              <img
                src={require("../../Assets/img/Clans/Tremere/LogoClanTremere.webp")}
                class="ClanMiniLogo"
                alt=""
              />
            </div>
            <br />
            Juan Tremere
          </div>
          <div class="personaje">
            <div class="avatar">
              <img
                src={require("../../Assets/img/Clans/Tzimisce/LogoClanTzimisce.webp")}
                class="ClanMiniLogo"
                alt=""
              />
            </div>
            <br />
            Rodrigo Tzimisce
          </div>
          <div class="personaje">
            <div class="avatar">
              <img
                src={require("../../Assets/img/Clans/Lasombra/LogoClanLasombra.webp")}
                class="ClanMiniLogo"
                alt=""
              />
            </div>
            <br />
            Fabiana Lasombra
          </div>
          <div class="personaje">
            <div class="avatar">
              <img
                src={require("../../Assets/img/Clans/Ravnos/LogoClanRavnos.webp")}
                class="ClanMiniLogo"
                alt=""
              />
            </div>
            <br />
            Gustavo Ravnos
          </div>
          <div class="personaje">
            <div class="avatar">
              <img
                src={require("../../Assets/img/Clans/Nosferatu/LogoClanNosferatu.webp")}
                class="ClanMiniLogo"
                alt=""
              />
            </div>
            <br />
            Segismundo Nosferatu
          </div>
         
        </section>
      </section>
    </div>
  );
}

export default ListaPersonajes;
