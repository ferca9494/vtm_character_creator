import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ClansReact } from "../../Clans/Clans.js";

import Clans from "../../../Data/Clanlist.js";
import Arquetipos from "../../../Data/Arquetipolist.json";
import Conceptos from "../../../Data/Conceptolist.json";
import DescVampiro from "../../../Data/Desc_Vampiro.json";
import tGeneracion from "../../../Data/tabla_Generacion.json";

import { Talentos, Tecnicas, Conocimientos } from "../../../Data/Habilidadeslist.js";
import { num_to_points, num_to_square } from "../../Funciones/Extras.js";
import {
  NaturalezasReact,
  ConductasReact,
} from "../../Arquetipos/Arquetipos.js";
import ConceptosReact from "../../Conceptos/Conceptos.js";
import "../../../Styles/NuevoPersonaje.css";
import { Header } from "../../Componentes/header.js";
import { Rasgo } from "../../Componentes/Rasgo.js";
import { Modal } from "../../Componentes/Modal.js";
import { Button } from "../../Componentes/Button.js";
import { d10 } from "../../Funciones/Tiradas.js";
import { BulletSection } from "../../Componentes/Bullets.js";
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

  console.log(DescVampiro.Transfondos)
  console.log(DescVampiro.Clanes)

  const atr_principal_p = 7, atr_secundario_p = 5, atr_terciario_p = 3
  const hab_principal_p = 13, hab_secundario_p = 9, hab_terciario_p = 5
  const trasfondos_p = 5, disciplinas_p = 3, virtudes_p = 7

  const [selectedTipoValue, setSelectedTipoValue] = useState("Vampiro");

  /**
  * Rasgos de personalidad
  * - Nombre
  * - Concepto
  * - Naturaleza
  * - Conducta
  */
  const [nombre, setNombre] = useState("");

  const [selectNaturaleza, setSelectNaturaleza] = useState(Arquetipos[0]);
  const [selectConducta, setSelectConducta] = useState(Arquetipos[0]);

  const [selectedConceptosValue, setSelectedConceptosValue] = useState(Conceptos[0].tipo);
  const [selectedConceptosEjemploValue, setSelectedConceptosEjemploValue] =
    useState("");
  const [disabledOther, setDisabledOther] = useState(true);
  const [ConceptosOther, setConceptosOther] = useState("");

  /**
   * Caracteristicas del juego/jugador
   * - jugador
   * - cronica
  */
  const [jugador, setJugador] = useState("");
  const [cronica, setCronica] = useState("");

  /**
   * Rasgos Vampiricos
   * - generacion
   * - sire
   * - refugio
   * - clan
   * - virtudes
   * - disciplinas
   * - reserva de sangre
  */
  const [generacion, setGeneracion] = useState(13);
  const generation_info = tGeneracion[generacion - 1];
  const [reservaSangre, setReservaSangre] = useState(-1);

  const [sire, setSire] = useState("");

  const [selectClan, setSelectClan] = useState(Clans[0].name);
  const [ClanImg, setClanImg] = useState(
    "/" + Clans[0].name + "/" + Clans[0].logoImg
  );
  const [ClanDesc, setClanDesc] = useState(Clans[0].description);

  let clan_info = DescVampiro.Clanes.find((elem) => elem.Nombre == selectClan)

  const [pVirtudes, setPVirtudes] = useState(virtudes_p);
  const [pDisciplinas, setPDisciplinas] = useState(disciplinas_p);
  const [pTrasfondos, setPTrasfondos] = useState(trasfondos_p);
  const [conciencia, setconciencia] = useState(1);
  const [convinccion, setconvinccion] = useState(0);
  const [autocontrol, setautocontrol] = useState(1);
  const [instinto, setinstinto] = useState(0);
  const [coraje, setcoraje] = useState(1);

  const [disciplinasList, setDisciplinasList] = useState([]);
  const [sendaName, setSendaName] = useState("Humanidad");
  const [sendaValue, setSendaValue] = useState(1);

  /**
  * Atributos del personaje
  * - fisicos
  * - sociales
  * - mentales
  */
  const [pFisicos, setPFisicos] = useState(atr_principal_p);

  const [fuerza, setFuerza] = useState(1);
  const [destreza, setDestreza] = useState(1);
  const [resistencia, setResistencia] = useState(1);

  const [pSocial, setPSocial] = useState(atr_secundario_p);

  const [carisma, setCarisma] = useState(1);
  const [manipulacion, setManipulacion] = useState(1);
  const [apariencia, setApariencia] = useState(1);

  const [pMental, setPMental] = useState(atr_terciario_p);

  const [inteligencia, setInteligencia] = useState(1);
  const [astucia, setAstucia] = useState(1);
  const [percepcion, setPercepcion] = useState(1);

  const [mejorAtributo, setMejorAtributo] = useState("1");
  const [peorAtributo, setPeorAtributo] = useState("1");

  const [mostrarAtributos, setmostrarAtributos] = useState(false);


  /**
   * Habilidades del personaje
  * - talentos
  * - tecnicas
  * - conocimientos
  */

  const [pTalentos, setPTalentos] = useState(hab_principal_p);
  const [talentosList, setTalentosList] = useState([]);
  const [pTecnicas, setPTecnicas] = useState(hab_secundario_p);
  const [tecnicasList, setTecnicasList] = useState([]);
  const [pConocimientos, setPConocimientos] = useState(hab_terciario_p);
  const [conocimientosList, setConocimientosList] = useState([]);
  const [otrosList, setOtrosList] = useState([]);

  const [mejorHabilidad, setMejorHabilidad] = useState("1");
  const [peorHabilidad, setPeorHabilidad] = useState("1");

  const [mostrarHabilidades, setmostrarHabilidades] = useState(false);

  const [trasfondosList, setTrasfondosList] = useState([]);


  /**
  * extras
  */
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setmodalContent] = useState(null);
  const [actualsection, setActualsection] = useState("1");



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
      FuerzaVoluntad: { Actual: coraje, Maximo: coraje },
      trasfondos: trasfondosList,
      humanidad: conciencia + autocontrol,
      nivelSalud: [0, 0, 0, 0, 0, 0, 0],
    };
    if (selectedTipoValue == "Vampiro") {
      nue_per.RasgosVampiricos = {
        generacion: generacion,
        sire: sire,
        clan: selectClan,
        refugio: "",
        virtudes: {
          conviccion: convinccion,
          instinto: instinto,
          conciencia: conciencia,
          autocontrol: autocontrol,
          coraje: coraje,
        },
        disciplinas: disciplinasList,
        reservaSangre: { Actual: reservaSangre, Maximo: generation_info.maximoReservaSangre },
        senda: sendaName == "Humanidad" ? null : { nombre: sendaName, rango: sendaValue },
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

    let newList = [...habList];
    let exist = false;
    let index_del;

    newList.forEach((element, index) => {
      if (element.nombre == habilidad_name) {
        exist = true;
        element.valor = valor;
        index_del = index;
        return;
      }
    });

    if (!exist)
      newList.push({
        nombre: habilidad_name,
        valor: valor
      })

    if (valor == 0 && exist) {
      newList.splice(index_del, 1)
    }

    setHabList(newList)
    console.log(newList);
    return true
  }

  return (
    <div className="App">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {modalContent}
      </Modal>
      <Header namepage="Nuevo Personaje" active={2} />

      <BulletSection
        title="Tipo de Personaje"
        sec="1"
        actualsecction={actualsection}
        onClickSiguiente={() => setActualsection("2")}
      >

        <section >

          <div>
            <select onChange={(e) =>
              setSelectedTipoValue(e.target.value)
            }>
              <option value="Vampiro">Vampiro</option>
              <option value="Humano">Humano</option>
              <option value="Mago">Mago</option>
              <option value="Hombre Lobo">Hombre Lobo</option>
            </select>

          </div>
        </section>
      </BulletSection>
      <BulletSection
        title="Detalles del personaje"
        sec="2"
        actualsecction={actualsection}
        onClickSiguiente={() => setActualsection("3")}
      >
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
      </BulletSection>
      <BulletSection
        title="Atributos"
        sec="3"
        actualsecction={actualsection}
        onClickSiguiente={() => setActualsection("4")}
      >
        <section>
          {!mostrarAtributos ?
            <div>
              mejor categoria:
              <select onChange={(e) => {
                setMejorAtributo(e.target.value)
              }}>
                <option value="1">Fisico</option>
                <option value="2">Social</option>
                <option value="3">Mental</option>
              </select>

              peor categoria:
              <select onChange={(e) => {
                setPeorAtributo(e.target.value)
              }}>
                <option value="1">Fisico</option>
                <option value="2">Social</option>
                <option value="3">Mental</option>
              </select>
              <button onClick={() => {
                setPFisicos(mejorAtributo == "1" ? atr_principal_p : (peorAtributo == "1" ? atr_terciario_p : atr_secundario_p))
                setPSocial(mejorAtributo == "2" ? atr_principal_p : (peorAtributo == "2" ? atr_terciario_p : atr_secundario_p))
                setPMental(mejorAtributo == "3" ? atr_principal_p : (peorAtributo == "3" ? atr_terciario_p : atr_secundario_p))
                setmostrarAtributos(true)
              }}>siguiente</button>
            </div> : null}
          {mostrarAtributos ?
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
            </section> : null}
        </section>
      </BulletSection>
      <BulletSection
        title="Habilidades"
        sec="4"
        actualsecction={actualsection}
        onClickSiguiente={() => setActualsection("5")}
      >
        <section>
          <h1>Habilidades</h1>
          {!mostrarHabilidades ?
            <div>
              mejor categoria:
              <select onChange={(e) => {
                setMejorHabilidad(e.target.value)
              }}>
                <option value="1">Talentos</option>
                <option value="2">Tecnicas</option>
                <option value="3">Conocimientos</option>
              </select>

              peor categoria:
              <select onChange={(e) => {
                setPeorHabilidad(e.target.value)
              }}>
                <option value="1">Talentos</option>
                <option value="2">Tecnicas</option>
                <option value="3">Conocimientos</option>
              </select>
              <button onClick={() => {
                setPTalentos(mejorHabilidad == "1" ? hab_principal_p : (peorHabilidad == "1" ? hab_terciario_p : hab_secundario_p))
                setPTecnicas(mejorHabilidad == "2" ? hab_principal_p : (peorHabilidad == "2" ? hab_terciario_p : hab_secundario_p))
                setPConocimientos(mejorHabilidad == "3" ? hab_principal_p : (peorHabilidad == "3" ? hab_terciario_p : hab_secundario_p))
                setmostrarHabilidades(true)
              }}>siguiente</button>
            </div> : null}
          {mostrarHabilidades ?
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
                      onChange={(e) =>
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
                      onChange={(e) =>
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
                      onChange={(e) =>
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
                    />
                  )
                })
                }
              </div>
            </section> : null}
        </section>
      </BulletSection>
      <BulletSection
        title="Ventajas"
        sec="5"
        actualsecction={actualsection}
        onClickSiguiente={() => setActualsection("6")}
      >
        <section className="trisection">
          <div>
            <h3>Trasfondo ({pTrasfondos})</h3>
            {DescVampiro.Transfondos.map((item, index) => {
              let tra = trasfondosList.find((hab) => hab.nombre == item.Nombre);
              let valor_actual = tra != undefined ? tra.valor : 0
              return (
                <Rasgo
                  name={item.Nombre}
                  value={valor_actual}
                  min={0}
                  max={5}
                  onChange={(e) =>
                    setPAbility(
                      e.target.value,
                      valor_actual,
                      setHabilidad,
                      pTrasfondos,
                      setPTrasfondos,
                      item.Nombre,
                      trasfondosList,
                      setTrasfondosList
                    )
                  }
                />
              )
            })
            }
          </div>
          <div>
            <h3>Disciplinas ({pDisciplinas})</h3>
            {clan_info.Disc_principales.map((item, index) => {
              let hab = disciplinasList.find((hab) => hab.nombre == item);
              let valor_actual = hab != undefined ? hab.valor : 0
              return (
                <Rasgo
                  name={item}
                  value={valor_actual}
                  min={0}
                  max={3}
                  onChange={(e) =>
                    setPAbility(
                      e.target.value,
                      valor_actual,

                      setHabilidad,

                      pDisciplinas,
                      setPDisciplinas,

                      item,
                      disciplinasList,
                      setDisciplinasList
                    )
                  }
                />
              )
            })
            }
          </div>
          <div>
            <h3>Virtudes ({pVirtudes})</h3>
            <Rasgo
              name="Conciencia"
              value={conciencia}
              min={1}
              onChange={(e) =>
                setPAtribute(e, conciencia, setconciencia, pVirtudes, setPVirtudes)
              }
            />
            <Rasgo
              name="Conviccion"
              value={convinccion}
              min={0}
              onChange={(e) =>
                setPAtribute(e, convinccion, setconvinccion, pVirtudes, setPVirtudes)
              }
            />
            <Rasgo
              name="Autocontrol"
              value={autocontrol}
              min={1}
              onChange={(e) =>
                setPAtribute(e, autocontrol, setautocontrol, pVirtudes, setPVirtudes)
              }
            />
            <Rasgo
              name="Instinto"
              value={instinto}
              min={0}
              onChange={(e) =>
                setPAtribute(e, instinto, setinstinto, pVirtudes, setPVirtudes)
              }
            />
            <Rasgo
              name="Coraje"
              value={coraje}
              min={1}
              onChange={(e) =>
                setPAtribute(e, coraje, setcoraje, pVirtudes, setPVirtudes)
              }
            />
          </div>
        </section>
      </BulletSection>
      <BulletSection
        title="Otros Rasgos"
        sec="6"
        actualsecction={actualsection}
        onClickTerminar={submit}
      >
        <section className="trisection">
          <div>
            <h3>Humanidad/Senda</h3>

            <b>Humanidad (conciencia + autocontrol)</b><br />
            {num_to_points(conciencia + autocontrol, 10)}<br />
            Sendas: <br />
            <select onChange={(e) => setSendaName(e.target.value)}>
              <option value="Humanidad">Humanidad</option>
              {DescVampiro.Sendas.map((item, index) => {
                return (
                  <option value={item.Nombre}>{item.Nombre}</option>
                )
              })
              }
            </select>
            <input type="number" onChange={(e) => setSendaValue(e.target.value)} min="0" max="10" value={sendaValue} disabled={sendaName == "Humanidad"} />
            <hr />
            <b>Fuerza de voluntad (coraje)</b><br />
            {num_to_points(coraje, 10)}<br />
            {num_to_square(coraje, 10)}<br />
          </div>
          <div>
            <h3>Reserva de Sangre</h3>
            Generación: {generacion}<br />
            Maximos de Rasgos: {generation_info.maximoRasgo}<br />
            Reserva de Sangre: {generation_info.maximoReservaSangre}<br />
            Puntos por Turno: {generation_info.puntosPorTurno}<br />
            {reservaSangre != -1 ? (<div>Reserva de Sangre Inicial:<br /> {num_to_square(reservaSangre, generation_info.maximoReservaSangre)}</div>) : (<Button onClick={() => setReservaSangre(d10())}>Tirada de Reserva de Sangre (solo 1d10)</Button>)}<br />

          </div>

        </section>
      </BulletSection>


    </div>
  );
}

export default NuevoPersonaje;
