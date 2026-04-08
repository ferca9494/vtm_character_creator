import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ClansReact } from "../../Clans/Clans.js";
import Clans from "../../../Data/Clanlist.js";
import Arquetipos from "../../../Data/Arquetipolist.js";
import Conceptos from "../../../Data/Conceptolist.js";
import { Talentos, Tecnicas, Conocimientos } from "../../../Data/Habilidadeslist.js";

import {
  NaturalezasReact,
  ConductasReact,
} from "../../Arquetipos/Arquetipos.js";
import ConceptosReact from "../../Conceptos/Conceptos.js";
import "../../../Styles/NuevoPersonaje.css";
import { Header } from "../../Componentes/header.js";
import { Rasgo } from "../../Componentes/Rasgo.js";
import { Modal } from "../../Componentes/Modal.js";

/*
NuevoPersonaje
==============================================
- [x] introducir clan, consepto, naturaleza, conducta, nombre, jugador, cronica, generacion, sire
- [x] establecer puntos de atributos (7/5/3)
- [x] establecer habilidades (13/9/5)
- [ ] establecer virtudes (virtudes:7/transfondos:5/disciplinas:3)
- [ ] establecer humanidad (autocontrol + conciencia) 
- [ ] establecer fuerza de voluntad (coraje)

- [ ] establecer meritos y defectos (opcional)

- [ ] rollear un d10 para ver la reserva de sangre (generacion 13)

- [ ] mostrar descripciones de cada rasgo, clan, concepto, naturaleza, etc.

- [x] submitir y crear personaje

*/
function NuevoPersonaje() {

  const atr_principal = 7, atr_secundario = 5, atr_terciario = 3
  const hab_principal = 13, hab_secundario = 9, hab_terciario = 5

  const [selectedTipoValue, setSelectedTipoValue] =
    useState("");

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
  const [ClanDesc, setClanDesc] = useState(Clans[0].description);
  const [pFisicos, setPFisicos] = useState(atr_principal);

  const [fuerza, setFuerza] = useState(1);
  const [destreza, setDestreza] = useState(1);
  const [resistencia, setResistencia] = useState(1);

  const [pSocial, setPSocial] = useState(atr_secundario);

  const [carisma, setCarisma] = useState(1);
  const [manipulacion, setManipulacion] = useState(1);
  const [apariencia, setApariencia] = useState(1);

  const [pMental, setPMental] = useState(atr_terciario);

  const [inteligencia, setInteligencia] = useState(1);
  const [astucia, setAstucia] = useState(1);
  const [percepcion, setPercepcion] = useState(1);


  const [pTalentos, setPTalentos] = useState(hab_principal);
  const [talentosList, setTalentosList] = useState([]);
  const [pTecnicas, setPTecnicas] = useState(hab_secundario);
  const [tecnicasList, setTecnicasList] = useState([]);
  const [pConocimientos, setPConocimientos] = useState(hab_terciario);
  const [conocimientosList, setConocimientosList] = useState([]);
  const [otrosList, setOtrosList] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setmodalContent] = useState(null);



  const handleSelectClan = (event) => {
    let claninfo = Clans.find((elem) => elem.name == event.target.value)
    let logoimg = claninfo.logoImg;
    let description = claninfo.description;

    setSelectClan(event.target.value);
    setClanImg("/" + event.target.value + "/" + logoimg);
    setClanDesc(description);

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
  };

  const handleConceptosEjemploOption = (event) => {
    setSelectedConceptosEjemploValue(event.target.value);
  };

  const handleDisabledOther = (check) => {
    setDisabledOther(check);
  };

  const submit = () => {
    if (!nombre || !jugador || !cronica || !sire) {
      console.error("faltan datos");
      return;
    }

    const datoGuardado = localStorage.getItem("listaPersonajes");
    if (!datoGuardado) localStorage.setItem("listaPersonajes", "[]");

    var lista_per = JSON.parse(datoGuardado);
    var nue_per = {
      nombre: nombre,
      jugador: jugador,
      imagen: null,
      tipo: selectedTipoValue,
      cronica: cronica,
      naturaleza: selectNaturaleza,
      conducta: selectConducta,
      concepto: disabledOther
        ? selectedConceptosValue + " - " + selectedConceptosEjemploValue
        : ConceptosOther,
      atributos: {
        fuerza: fuerza,
        destreza: destreza,
        resistencia: resistencia,
        carisma: carisma,
        manipulacion: manipulacion,
        apariencia: apariencia,
        percepcion: percepcion,
        inteligencia: inteligencia,
        astucia: astucia,
      },
      habilidades:
      {
        talentos: talentosList,
        tecnicas: tecnicasList,
        conocimientos: conocimientosList,
        otros: otrosList,
      },
      FuerzaVoluntad: { Actual: 6, Maximo: 6 },

    };
    if (selectedTipoValue == "Vampiro") {
      nue_per.RasgosVampiricos = {
        generacion: generacion,
        sire: sire,
        clan: selectClan,
        refugio: "",
        virtudes: {
          conviccion: 2,
          instinto: 2,
          conciencia: 2,
          autocontrol: 2,
          coraje: 2,
        },
      }
    }

    localStorage.setItem("nuevo_personaje", JSON.stringify(nue_per));
    lista_per.push(nue_per);
    localStorage.setItem("listaPersonajes", JSON.stringify(lista_per));

    console.log("clan seleccionado:", selectClan);
    console.log("datos del nuevo personaje:", nue_per);
    console.log("lista actualizada de los personajes:", lista_per);

    window.location.href = "/"
  };

  const setPAtribute = (e, raz, setRAZ, atr, setATR) => {
    let _pATR = atr;

    if (_pATR <= 0 && e.target.value > raz)
      return;

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

  const setPAbility = (valor, valor_actual, setHabilidad, pHab, setPHAB, habilidad_name, habList, setHabList) => {
    let _pHab = pHab;
    let _valor = parseInt(valor);

    if (pHab <= 0 && valor > valor_actual)
      return;

    let Hab_change = setHabilidad(_valor, habilidad_name, habList, setHabList);

    //if(!Hab_change)
    //return;

    console.log("valor_actual", valor_actual)
    console.log("valor", valor)
    console.log("pHab", pHab)
    if (_pHab > 0) {
      if (valor_actual < _valor)
        _pHab--;
      else if (valor_actual > _valor)
        _pHab++;

    } else {
      if (valor_actual > _valor) {
        _pHab++;
      }
    }
    setPHAB(_pHab);

  };

  const setHabilidad = (valor, habilidad_name, habList, setHabList) => {

    let exist = false;
    let index_del;
    let count_ant = habList.lenght

    habList.forEach((element, index) => {
      if (element.nombre == habilidad_name) {
        exist = true
        element.valor = valor;
        index_del = index
        return;
      }
    });

    if (!exist)
      habList.push({
        nombre: habilidad_name,
        valor: 1
      })

    if (valor == 0 && exist) {
      habList.splice(index_del)
    }

    // if (!exist || count_ant == habList.lenght)
    // return false

    setHabList(habList)
    console.log(habList);
    return true
  }

  return (
    <div className="App">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {modalContent}
      </Modal>
      <Header namepage="Nuevo Personaje" active={2} />

      <section id="playerdata" className="trisection">

        <div>
          <select onChange={(e) => {
            setSelectedTipoValue(e.target.value)
          }}>
            <option value="Vampiro">Vampiro</option>
            <option value="Humano">Humano</option>
            <option value="Mago">Mago</option>
            <option value="Hombre Lobo">Hombre Lobo</option>
          </select>

        </div>
      </section>
      <section id="playerdata" className="trisection">
        <div>
          <img
            src={require("../../../Assets/img/Clans" + ClanImg)}
            id="ClanLogo"
            alt=""
            onClick={() => {
              setIsOpen(true)
              setmodalContent(<div>
                <img
                  src={require("../../../Assets/img/Clans" + ClanImg)}
                  id="ClanLogo"
                  alt=""

                />
                <p style={{ width: "200vh" }}>{ClanDesc}</p>
              </div>)

            }}
          />
          <br />
          <label htmlFor="clan">Clan</label>
          <br />
          <ClansReact onChange={handleSelectClan} />
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


        </div>
        <div>
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
          <hr />
          <label htmlFor="naturaleza">Naturaleza</label>
          <br />
          <NaturalezasReact onChange={handleSelectNaturalezas} />
          <br />
          <label htmlFor="conducta">Conducta</label>
          <br />
          <ConductasReact onChange={handleSelectConductas} />
          <br />



        </div>

      </section>
      <section id="atributos" className="trisection">
        <div>
          <h3>Fisicos ({pFisicos})</h3>
          <Rasgo
            name="Fuerza"
            value={fuerza}
            onChange={(e) =>
              setPAtribute(e, fuerza, setFuerza, pFisicos, setPFisicos)
            }
          />
          <Rasgo
            name="Destreza"
            value={destreza}
            onChange={(e) =>
              setPAtribute(e, destreza, setDestreza, pFisicos, setPFisicos)
            }
          />
          <Rasgo
            name="Resistencia"
            value={resistencia}
            onChange={(e) =>
              setPAtribute(e, resistencia, setResistencia, pFisicos, setPFisicos
              )
            }
          />

        </div>
        <div>
          <h3>Sociales ({pSocial})</h3>
          <Rasgo
            name="Carisma"
            value={carisma}
            onChange={(e) =>
              setPAtribute(e, carisma, setCarisma, pSocial, setPSocial)
            }
          />
          <Rasgo
            name="Manipulacion"
            value={manipulacion}
            onChange={(e) =>
              setPAtribute(e, manipulacion, setManipulacion, pSocial, setPSocial
              )
            }
          />
          <Rasgo
            name="Apariencia"
            value={apariencia}
            onChange={(e) => {
              if (selectClan != "Nosferatu")
                setPAtribute(e, apariencia, setApariencia, pSocial, setPSocial);
            }
            }
          />

        </div>
        <div>
          <h3>Mentales ({pMental})</h3>

          <Rasgo
            name="Percepcion"
            value={percepcion}
            onChange={(e) =>
              setPAtribute(e, percepcion, setPercepcion, pMental, setPMental)
            }
          />

          <Rasgo
            name="Inteligencia"
            value={inteligencia}
            onChange={(e) =>
              setPAtribute(
                e, inteligencia, setInteligencia, pMental, setPMental
              )
            }
          />

          <Rasgo
            name="Astucia"
            value={astucia}
            onChange={(e) =>
              setPAtribute(e, astucia, setAstucia, pMental, setPMental)
            }
          />
        </div>
      </section>
      <section id="habilidades" className="trisection">
        <div>
          <h3>Talentos ({pTalentos})</h3>

          {Talentos.map((item, index) => {
            let hab = talentosList.find((hab) => hab.nombre == item);
            let valor_actual = hab != undefined ? hab.valor : 0
            return (
              <Rasgo
                name={item}
                value={valor_actual}
                min={0}
                max={3}
                onChange={(e) => {

                  setPAbility(
                    e.target.value,
                    valor_actual,

                    setHabilidad,

                    pTalentos,
                    setPTalentos,

                    item,
                    talentosList,
                    setTalentosList
                  )
                }
                }
              />
            )
          })}

        </div>




        <div>
          <h3>Técnicas ({pTecnicas})</h3>
          {Tecnicas.map((item, index) => {
            let hab = tecnicasList.find((hab) => hab.nombre == item);
            let valor_actual = hab != undefined ? hab.valor : 0
            return (
              <Rasgo
                name={item}
                value={valor_actual}
                min={0}
                max={3}
                onChange={(e) => {

                  setPAbility(
                    e.target.value,
                    valor_actual,

                    setHabilidad,

                    pTecnicas,
                    setPTecnicas,

                    item,
                    tecnicasList,
                    setTecnicasList
                  )
                }
                }
              />
            )
          })
          }

        </div>
        <div>
          <h3>Conocimientos ({pConocimientos})</h3>
          {Conocimientos.map((item, index) => {
            let hab = conocimientosList.find((hab) => hab.nombre == item);
            let valor_actual = hab != undefined ? hab.valor : 0
            return (
              <Rasgo
                name={item}
                value={valor_actual}
                min={0}
                max={3}
                onChange={(e) => {


                  setPAbility(
                    e.target.value,
                    valor_actual,

                    setHabilidad,

                    pConocimientos,
                    setPConocimientos,

                    item,
                    conocimientosList,
                    setConocimientosList
                  )
                }
                }
              />
            )
          })
          }
        </div>
      </section>
      <section id="buttons">
        <input type="submit" id="submit" onClick={submit} />
      </section>
    </div>
  );
}

export default NuevoPersonaje;
