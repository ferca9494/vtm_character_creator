import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ClansReact } from "../Clans/Clans.js";
import Clans from "../../Data/Clanlist.js";
import Arquetipos from "../../Data/Arquetipolist.js";
import Conceptos from "../../Data/Conceptolist.js";

import { NaturalezasReact, ConductasReact } from "../Arquetipos/Arquetipos.js";
import ConceptosReact from "../Conceptos/Conceptos.js";
import "../../Styles/NuevoPersonaje.css";

function NuevoPersonaje() {
  const [selectClan, setSelectClan] = useState(Clans[0].name);
  const [selectNaturaleza, setSelectNaturaleza] = useState(Arquetipos[0]);
  const [selectConducta, setSelectConducta] = useState(Arquetipos[0]);

  const [selectedConceptosValue, setSelectedConceptosValue] = useState(
    Conceptos[0].tipo
  );
  const [selectedConceptosEjemploValue, setSelectedConceptosEjemploValue] =
    useState("");
  const [disabledOther, setDisabledOther] = useState(true);

  // Estado inicial que intenta obtener el valor de localStorage
  const [nombre, setNombre] = useState("");
  const [jugador, setJugador] = useState("");
  const [cronica, setCronica] = useState("");
  const [generacion, setGeneracion] = useState(13);
  const [sire, setSire] = useState("");

  const [ClanImg, setClanImg] = useState(
    "/" + Clans[0].name + "/" + Clans[0].logoImg
  );

  const handleSelectClan = (event) => {
    let logoimg = Clans.find((elem) => elem.name == event.target.value).logoImg;

    setSelectClan(event.target.value);
    setClanImg("/" + event.target.value + "/" + logoimg);

    console.log(">>" + event.target.value);
  };

  const handleSelectNaturalezas = (event) => {
    setSelectNaturaleza(event.target.value);
  };
  const handleSelectConductas = (event) => {
    setSelectConducta(event.target.value);
  };

  const handleConceptosOption = (event) => {
    setSelectedConceptosValue(event.target.value);
    //setDisabledOther(selectedConceptosEjemploValue != "Otro");
    console.log(event.target.value);
    console.log(selectedConceptosValue);
  };

  const handleConceptosEjemploOption = (event) => {
    setSelectedConceptosEjemploValue(event.target.value);
    //setDisabledOther(event.target.value != "Otro");

    console.log(event.target.value);
    console.log(selectedConceptosEjemploValue);
  };

  const handleDisabledOther = (event) => {
    setDisabledOther(!disabledOther);
  };

  const submit = () => {
    if (!nombre || !jugador || !cronica || !sire) {
      console.error("faltan datos");
      return;
    }

    const datoGuardado = localStorage.getItem("listaPersonajes");
    if (!datoGuardado) localStorage.setItem("listaPersonajes", "[]");

    var lista_per = JSON.parse(localStorage.getItem("listaPersonajes"));
    var nue_per = {
      nombre: nombre,
      jugador: jugador,
      cronica: cronica,
      generacion: generacion,
      sire: sire,
      clan: selectClan,
      naturaleza: selectNaturaleza,
      conducta: selectConducta,
      concepto: selectedConceptosValue + " - " + selectedConceptosEjemploValue,
    };

    localStorage.setItem("nuevo_personaje", JSON.stringify(nue_per));
    lista_per.push(nue_per);
    localStorage.setItem("listaPersonajes", JSON.stringify(lista_per));

    console.log("clan seleccionado:", selectClan);
    console.log("datos del nuevo personaje:", nue_per);
    console.log("lista actualizada de los personajes:", lista_per);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Nuevo Personaje</h2>
        <Link to="/">volver</Link>
      </header>

      <section id="playerdata">
        <div>
          <img
            src={require("../../Assets/img/Clans" + ClanImg)}
            id="ClanLogo"
            alt=""
          />
          <br />
          <label htmlFor="clan">Clan</label>
          <br />
          <ClansReact onChange={handleSelectClan} />
        </div>
        <div>
          <label htmlFor="naturaleza">Naturaleza</label>
          <br />
          <NaturalezasReact onChange={handleSelectNaturalezas} />
          <br />
          <label htmlFor="conducta">Conducta</label>
          <br />
          <ConductasReact onChange={handleSelectConductas} />
          <br />
          <hr />
          <label htmlFor="concepto">Concepto</label>
          <br />
          <ConceptosReact
            ConceptoValue={selectedConceptosValue}
            onChangeConcepto={handleConceptosOption}
            onChangeConceptoExample={handleConceptosEjemploOption}
            onChangedisabledOther={handleDisabledOther}
            disabledOther={disabledOther}
          />
          <br />
        </div>
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
          <hr />
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
        </div>
     
      </section>
      <section id="buttons">
        <input type="submit" id="submit" onClick={submit} />
      </section>
    </div>
  );
}

export default NuevoPersonaje;
