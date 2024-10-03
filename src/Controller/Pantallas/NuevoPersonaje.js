import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ClansReact } from "../Clans/Clans.js";
import Clans from "../../Data/Clanlist.js";
import Arquetipos from "../../Data/Arquetipolist.js";
import Conceptos from "../../Data/Conceptolist.js";

import { NaturalezasReact, ConductasReact } from "../Arquetipos/Arquetipos.js";
import ConceptosReact from "../Conceptos/Conceptos.js";
import "../../Styles/NuevoPersonaje.css";

/*
NuevoPersonaje
==============================================
- introducir clan, consepto, naturaleza, conducta, nombre, jugador, cronica, generacion, sire
- establecer puntos de atributos (7/5/3)
- establecer habilidades (13/9/5)
- establecer virtudes (virtudes:7/transfondos:5/disciplinas:3)
- establecer humanidad (autocontrol + conciencia) 
- establecer fuerza de voluntad (coraje)

- establecer meritos y defectos (opcional)

- rollear un d10 para ver la reserva de sangre (generacion 13)

- mostrar descripciones de cada rasgo, clan, concepto, naturaleza, etc.

- submitir y crear personaje

*/
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
  const [ConceptosOther, setConceptosOther] = useState("");

  // Estado inicial que intenta obtener el valor de localStorage
  const [nombre, setNombre] = useState("");
  const [jugador, setJugador] = useState("");
  const [cronica, setCronica] = useState("");
  const [generacion, setGeneracion] = useState(13);
  const [sire, setSire] = useState("");

  const [ClanImg, setClanImg] = useState(
    "/" + Clans[0].name + "/" + Clans[0].logoImg
  );
  const [pFisicos, setPFisicos] = useState(7);

  const [fuerza, setFuerza] = useState(1);
  const [destreza, setDestreza] = useState(1);
  const [resistencia, setResistencia] = useState(1);

  const [pSocial, setPSocial] = useState(5);

  const [carisma, setCarisma] = useState(1);
  const [manipulacion, setManipulacion] = useState(1);
  const [apariencia, setApariencia] = useState(1);

  const [pMental, setPMental] = useState(3);

  const [inteligencia, setInteligencia] = useState(1);
  const [astucia, setAstucia] = useState(1);
  const [percepcion, setPercepcion] = useState(1);

  const handleSelectClan = (event) => {
    let logoimg = Clans.find((elem) => elem.name == event.target.value).logoImg;

    setSelectClan(event.target.value);
    setClanImg("/" + event.target.value + "/" + logoimg);

    if (event.target.value == "Nosferatu") setApariencia(0);

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
      imagen: null,
      cronica: cronica,
      generacion: generacion,
      sire: sire,
      clan: selectClan,
      naturaleza: selectNaturaleza,
      conducta: selectConducta,
      concepto: disabledOther
        ? selectedConceptosValue + " - " + selectedConceptosEjemploValue
        : ConceptosOther,
      atributos : {
        fuerza: fuerza,
        destreza: destreza,
        resistencia: resistencia,
        carisma: carisma,
        manipulacion: manipulacion,
        apariencia: apariencia,
        percepcion: percepcion,
        inteligencia: inteligencia,
        astucia: astucia,
      }
    };

    localStorage.setItem("nuevo_personaje", JSON.stringify(nue_per));
    lista_per.push(nue_per);
    localStorage.setItem("listaPersonajes", JSON.stringify(lista_per));

    console.log("clan seleccionado:", selectClan);
    console.log("datos del nuevo personaje:", nue_per);
    console.log("lista actualizada de los personajes:", lista_per);
  };

  const setPAtribute = (e, raz, setRAZ, atr, setATR) => {
    let _pATR = atr;
    if (_pATR > 0) {
      if (raz < e.target.value) setATR(--_pATR);
      else setATR(++_pATR);
      setRAZ(parseInt(e.target.value));
    } else {
      if (raz > e.target.value) {
        setATR(++_pATR);
        setRAZ(parseInt(e.target.value));
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Nuevo Personaje</h2>
        <Link to="/">volver</Link>
      </header>

      <section id="playerdata" class="trisection">
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
            Other={ConceptosOther}
            setOther={setConceptosOther}
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
      <section id="atributos" class="trisection">
        <div>
          <h3>Fisicos ({pFisicos})</h3>
          Fuerza
          <br />
          <input
            type="range"
            name="fuerza"
            value={fuerza}
            onChange={(e) =>
              setPAtribute(e, fuerza, setFuerza, pFisicos, setPFisicos)
            }
            min={1}
            max={10}
          />
          {fuerza}
          <br />
          Destreza
          <br />
          <input
            type="range"
            name="destreza"
            value={destreza}
            onChange={(e) =>
              setPAtribute(e, destreza, setDestreza, pFisicos, setPFisicos)
            }
            min={1}
            max={10}
          />
          {destreza}
          <br />
          Resistencia
          <br />
          <input
            type="range"
            name="resistencia"
            value={resistencia}
            onChange={(e) =>
              setPAtribute(
                e,
                resistencia,
                setResistencia,
                pFisicos,
                setPFisicos
              )
            }
            min={1}
            max={10}
          />
          {resistencia}
        </div>
        <div>
          <h3>Sociales ({pSocial})</h3>
          Carisma
          <br />
          <input
            type="range"
            name="carisma"
            value={carisma}
            onChange={(e) =>
              setPAtribute(e, carisma, setCarisma, pSocial, setPSocial)
            }
            min={1}
            max={10}
          />
          {carisma}
          <br />
          Manipulacion
          <br />
          <input
            type="range"
            name="manipulacion"
            value={manipulacion}
            onChange={(e) =>
              setPAtribute(
                e,
                manipulacion,
                setManipulacion,
                pSocial,
                setPSocial
              )
            }
            min={1}
            max={10}
          />
          {manipulacion}
          <br />
          Apariencia
          <br />
          <input
            type="range"
            name="apariencia"
            value={apariencia}
            onChange={(e) => {
              if (selectClan != "Nosferatu")
                setPAtribute(e, apariencia, setApariencia, pSocial, setPSocial);
            }}
            min={1}
            max={10}
          />
          {apariencia}
        </div>
        <div>
          <h3>Mentales ({pMental})</h3>
          Percepcion
          <br />
          <input
            type="range"
            name="percepcion"
            value={percepcion}
            onChange={(e) =>
              setPAtribute(e, percepcion, setPercepcion, pMental, setPMental)
            }
            min={1}
            max={10}
          />
          {percepcion}
          <br />
          Inteligencia
          <br />
          <input
            type="range"
            name="inteligencia"
            value={inteligencia}
            onChange={(e) =>
              setPAtribute(
                e,
                inteligencia,
                setInteligencia,
                pMental,
                setPMental
              )
            }
            min={1}
            max={10}
          />
          {inteligencia}
          <br />
          Astucia
          <br />
          <input
            type="range"
            name="astucia"
            value={astucia}
            onChange={(e) =>
              setPAtribute(e, astucia, setAstucia, pMental, setPMental)
            }
            min={1}
            max={10}
          />
          {astucia}
        </div>
      </section>
      <section id="habilidades" class="trisection">
        <div>
          <h3>Talentos</h3>
        </div>
        <div>
          <h3>Técnicas</h3>
        </div>
        <div>
          <h3>Conocimientos</h3>
        </div>
      </section>
      <section id="buttons">
        <input type="submit" id="submit" onClick={submit} />
      </section>
    </div>
  );
}

export default NuevoPersonaje;
