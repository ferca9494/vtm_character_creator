import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../../Styles/JugarPersonaje.css";
import Clans from "../../Data/Clanlist.js";
import { Header } from "../Componentes/header.js";
import { num_to_points, num_to_square } from "../Funciones/Extras.js";
import { Tirada } from "../Funciones/Tiradas.js";
import { Modal } from "../Componentes/Modal.js";
import { Button } from "../Componentes/Button";

function ModalContent_TiradaHabilidad({ Personaje, onResult }) {
  const [atributoReserva, setAtributoReserva] = useState(0);
  const [habilidadReserva, setHabilidadReserva] = useState(0);

  const totalReserva = useMemo(() => atributoReserva + habilidadReserva, [atributoReserva, habilidadReserva]);

  const handleTirada = useCallback(() => {
    const tirada = Tirada(totalReserva);
    onResult(tirada, `Habilidad + Atributo: ${totalReserva} Dados`);
  }, [totalReserva, onResult]);

  const atributosOptions = useMemo(() => [
    { key: "fuerza", label: "fuerza", value: Personaje.atributos.fuerza },
    { key: "destreza", label: "destreza", value: Personaje.atributos.destreza },
    { key: "resistencia", label: "resistencia", value: Personaje.atributos.resistencia },
    { key: "carisma", label: "carisma", value: Personaje.atributos.carisma },
    { key: "manipulacion", label: "manipulacion", value: Personaje.atributos.manipulacion },
    { key: "apariencia", label: "apariencia", value: Personaje.atributos.apariencia },
    { key: "percepcion", label: "percepcion", value: Personaje.atributos.percepcion },
    { key: "inteligencia", label: "inteligencia", value: Personaje.atributos.inteligencia },
    { key: "astucia", label: "astucia", value: Personaje.atributos.astucia },
  ], [Personaje.atributos]);

  const habilidadesOptions = useMemo(() => [
    ...Personaje.habilidades.talentos.map(item => ({ tipo: "Talento", ...item })),
    ...Personaje.habilidades.tecnicas.map(item => ({ tipo: "Tecnica", ...item })),
    ...Personaje.habilidades.conocimientos.map(item => ({ tipo: "Conocimiento", ...item })),
  ], [Personaje.habilidades]);

  return (
    <>
      <select onChange={(e) => setAtributoReserva(parseInt(e.target.value) || 0)}>
        <option value={0}>Selecciona atributo...</option>
        {atributosOptions.map(opt => (
          <option key={opt.key} value={opt.value}>{opt.label} {opt.value}</option>
        ))}
      </select>
      <br /><br />
      <select onChange={(e) => setHabilidadReserva(parseInt(e.target.value) || 0)}>
        <option value={0}>Selecciona habilidad...</option>
        <option value={0}>Sin Habilidad</option>
        {habilidadesOptions.map((item, idx) => (
          <option key={idx} value={item.valor}>{item.nombre} ({item.tipo}) {item.valor}</option>
        ))}
      </select>
      <br /><br />
      Reserva de dados Total: {totalReserva}
      <br /><br />
      <Button onClick={handleTirada} disabled={totalReserva === 0}>Tirada!</Button>
    </>
  );
}

function ModalContent_TiradaFuerzaVoluntad({ Personaje, onResult, onGastar }) {
  const disabled = Personaje.FuerzaVoluntad.Actual === 0;

  const handleTirada = useCallback(() => {
    const tirada = Tirada(Personaje.FuerzaVoluntad.Actual);
    onResult(tirada, `Fuerza de Voluntad: ${Personaje.FuerzaVoluntad.Actual} Dados`);
  }, [Personaje.FuerzaVoluntad.Actual, onResult]);

  return (
    <>
      Reserva de dados Total: {Personaje.FuerzaVoluntad.Actual}
      <br /><br />
      <Button onClick={handleTirada} disabled={disabled}>Tirada!</Button>
      <br /><br />o<br /><br />
      <Button variant="secondary" onClick={onGastar} disabled={disabled}>Gastar 1 Fuerza de Voluntad</Button>
    </>
  );
}

function ModalContent_ResultadoTirada({ resTirada, Comentario, onRethrow }) {
  const roll = resTirada;

  return (
    <>
      <h2>{Comentario}</h2>
      <div className="Tirada">
        <h3>{roll.resultado !== null ? (roll.logrado ? "LOGRADO" : "NO LOGRADO") : ""}</h3>
        <ul id="dados">
          {roll.tirada.map((item, index) => {
            let result = item === 1 ? "failure" : (item >= roll.dificultad ? "exito" : "");
            return <li key={index} className={result}>{item}</li>;
          })}
        </ul>
        <h4>{roll.resultado}</h4>
        <hr />
      </div>
      <Button onClick={onRethrow}>Otra Tirada!</Button>
    </>
  );
}

const CLAN_IMAGES = {};
Clans.forEach(clan => {
  CLAN_IMAGES[clan.name] = clan.logoImg;
});

function JugarPersonaje() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Personaje, setPersonajes] = useState(() => {
    try {
      const datoGuardado = localStorage.getItem("listaPersonajes");
      return datoGuardado ? JSON.parse(datoGuardado)[id] : null;
    } catch {
      return null;
    }
  });

  const [modalContent, setModalContent] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [, forceUpdate] = useState(0);
  const [vistaFuerzaVoluntad, setvistaFuerzaVoluntad] = useState(Personaje ? Personaje.FuerzaVoluntad.Actual : 0);

  const isOpen = modalMode !== null;

  const clanimg = useMemo(() =>
    Personaje ? CLAN_IMAGES[Personaje.RasgosVampiricos.clan] : null,
    [Personaje]
  );

  const refreshPersonaje = useCallback(() => {
    try {
      const datoGuardado = localStorage.getItem("listaPersonajes");
      if (datoGuardado) {
        const personajes = JSON.parse(datoGuardado);
        const updated = personajes.find(p =>
          p.nombre === Personaje.nombre &&
          p.RasgosVampiricos.clan === Personaje.RasgosVampiricos.clan &&
          p.RasgosVampiricos.generacion === Personaje.RasgosVampiricos.generacion
        );
        if (updated) setPersonajes(updated);
      }
    } catch (e) {
      console.warn("Error refreshing personaje:", e);
    }
  }, [Personaje]);

  const handleCloseModal = useCallback(() => {
    setModalMode(null);
    setModalContent(null);
  }, []);

  const handleTiradaResult = useCallback((resTirada, Comentario) => {
    setModalContent(
      <ModalContent_ResultadoTirada
        resTirada={resTirada}
        Comentario={Comentario}
        onRethrow={() => {
          const newTirada = Tirada(resTirada.cantidad);
          setModalContent(
            <ModalContent_ResultadoTirada
              resTirada={newTirada}
              Comentario={Comentario}
              onRethrow={() => {
                const anotherTirada = Tirada(resTirada.cantidad);
                setModalContent(
                  <ModalContent_ResultadoTirada
                    resTirada={anotherTirada}
                    Comentario={Comentario}
                    onRethrow={() => {
                      const yetAnotherTirada = Tirada(resTirada.cantidad);
                      setModalContent(
                        <ModalContent_ResultadoTirada
                          resTirada={yetAnotherTirada}
                          Comentario={Comentario}
                          onRethrow={arguments.callee}
                        />
                      );
                    }}
                  />
                );
              }}
            />
          );
        }}
      />
    );
    setModalMode("result");
  }, []);

  const handleGastarFV = useCallback(() => {
    try {
      const listaPersonajes = JSON.parse(localStorage.getItem("listaPersonajes"));
      const per = listaPersonajes.find((e) =>
        e.nombre === Personaje.nombre &&
        e.RasgosVampiricos.clan === Personaje.RasgosVampiricos.clan &&
        e.RasgosVampiricos.generacion === Personaje.RasgosVampiricos.generacion
      );

      if (per && per.FuerzaVoluntad.Actual > 0) {
        per.FuerzaVoluntad.Actual--;
        setvistaFuerzaVoluntad(per.FuerzaVoluntad.Actual);

        localStorage.setItem("listaPersonajes", JSON.stringify(listaPersonajes));
        forceUpdate(n => n + 1);
        handleCloseModal();
      }
    } catch (e) {
      console.warn("Error:", e);
    }
  }, [Personaje, handleCloseModal]);

  const descargarJSON = useCallback(() => {
    const json = JSON.stringify(Personaje, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${Personaje.nombre}_${Personaje.RasgosVampiricos.clan}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [Personaje]);

  const curarFV = useCallback(() => {
    try {
      const listaPersonajes = JSON.parse(localStorage.getItem("listaPersonajes"));
      const per = listaPersonajes.find((e) =>
        e.nombre === Personaje.nombre &&
        e.RasgosVampiricos.clan === Personaje.RasgosVampiricos.clan &&
        e.RasgosVampiricos.generacion === Personaje.RasgosVampiricos.generacion
      );

      if (per) {
        per.FuerzaVoluntad.Actual = per.FuerzaVoluntad.Maximo;
        setvistaFuerzaVoluntad(per.FuerzaVoluntad.Actual);
        localStorage.setItem("listaPersonajes", JSON.stringify(listaPersonajes));
        refreshPersonaje();
      }
    } catch (e) {
      console.warn("Error:", e);
    }
  }, [Personaje, refreshPersonaje]);

  const eliminarPersonaje = useCallback(() => {
    try {
      const listaPersonajes = JSON.parse(localStorage.getItem("listaPersonajes"));
      const perIndex = listaPersonajes.findIndex((e) =>
        e.nombre === Personaje.nombre &&
        e.RasgosVampiricos.clan === Personaje.RasgosVampiricos.clan &&
        e.RasgosVampiricos.generacion === Personaje.RasgosVampiricos.generacion
      );
      listaPersonajes.splice(perIndex, 1);
      localStorage.setItem("listaPersonajes", JSON.stringify(listaPersonajes));
      navigate("/");
    } catch (e) {
      console.warn("Error:", e);
    }
  }, [Personaje, navigate]);

  const openModal = useCallback((mode) => {
    setModalMode(mode);
  }, []);

  const renderModalContent = useMemo(() => {
    if (!isOpen) return null;
    switch (modalMode) {
      case "habilidad":
        return (
          <ModalContent_TiradaHabilidad
            Personaje={Personaje}
            onResult={handleTiradaResult}
          />
        );
      case "fv":
        return (
          <ModalContent_TiradaFuerzaVoluntad
            Personaje={Personaje}
            onResult={handleTiradaResult}
            onGastar={handleGastarFV}
          />
        );
      case "result":
        return modalContent;
      default:
        return null;
    }
  }, [isOpen, modalMode, Personaje, handleTiradaResult, handleGastarFV, modalContent]);

  const imageSrc = useMemo(() => {
    if (!Personaje || !clanimg) return null;
    return require(`../../Assets/img/Clans/${Personaje.RasgosVampiricos.clan}/${clanimg}`);
  }, [Personaje, clanimg]);

  const renderHabilidades = useMemo(() => {
    if (!Personaje) return null;
    const { habilidades } = Personaje;
    return (
      <>
        <h3>Talentos</h3>
        {habilidades.talentos.map((item, index) => (
          <div key={`talento-${index}`}><b>{item.nombre}</b> {num_to_points(item.valor)}</div>
        ))}
        <h3>Tecnicas</h3>
        {habilidades.tecnicas.map((item, index) => (
          <div key={`tecnica-${index}`}><b>{item.nombre}</b> {num_to_points(item.valor)}</div>
        ))}
        <h3>Conocimientos</h3>
        {habilidades.conocimientos.map((item, index) => (
          <div key={`conocimiento-${index}`}><b>{item.nombre}</b> {num_to_points(item.valor)}</div>
        ))}
        {habilidades.otros && habilidades.otros.length > 0 && (
          <>
            <h3>Otros</h3>
            {habilidades.otros.map((item, index) => (
              <div key={`otro-${index}`}><b>{item.nombre}</b> {num_to_points(item.valor)}</div>
            ))}
          </>
        )}
      </>
    );
  }, [Personaje]);

  const renderVentajas = useMemo(() => {
    if (!Personaje) return null;

    return (
      <>
        <h3>Trasfondos</h3>
        {Personaje.trasfondos.map((item, index) => (
          <div key={`trasfondo-${index}`}><b>{item.nombre}</b> {num_to_points(item.valor)}</div>
        ))}
        <h3>Disciplinas</h3>
        {Personaje.RasgosVampiricos.disciplinas.map((item, index) => (
          <div key={`disciplina-${index}`}><b>{item.nombre}</b> {num_to_points(item.valor)}</div>
        ))}
        <h3>Virtudes</h3>
        <div key={`virtud-conciencia`}><b>Conciencia</b> {num_to_points(Personaje.RasgosVampiricos.virtudes.conciencia)}</div>
        <div key={`virtud-autocontrol`}><b>AutoControl</b> {num_to_points(Personaje.RasgosVampiricos.virtudes.autocontrol)}</div>
        <div key={`virtud-coraje`}><b>Coraje</b> {num_to_points(Personaje.RasgosVampiricos.virtudes.coraje)}</div>
        {Personaje.RasgosVampiricos.virtudes.conviccion > 0 ? (
          <div key={`virtud-conviccion`}><b>Conviccion</b> {num_to_points(Personaje.RasgosVampiricos.virtudes.conviccion)}</div>
        ) : null}
        {Personaje.RasgosVampiricos.virtudes.instinto > 0 ? (
          <div key={`virtud-instinto`}><b>Instinto</b> {num_to_points(Personaje.RasgosVampiricos.virtudes.instinto)}</div>
        ) : null}
      </>
    );
  }, [Personaje]);

  const renderOtrosRasgos = useMemo(() => {
    if (!Personaje) return null;

    return (
      <>
        <h3>Otros Rasgos</h3>

        <div key={`humanidad`}><b>Humanidad</b> <br />
          {num_to_points(Personaje.humanidad, 10)}</div>
        {
          Personaje.RasgosVampiricos.senda != null ? <div key={`senda`}><b>{Personaje.RasgosVampiricos.senda.nombre}</b> <br />
            {num_to_points(Personaje.RasgosVampiricos.senda.rango, 10)}</div> : null
        }
        <div key={`FuerzaVoluntad`}><b>Fuerza de Voluntad</b> <br />
          {num_to_points(Personaje.FuerzaVoluntad.Maximo, 10)}<br />
          {num_to_square(vistaFuerzaVoluntad, 10)}</div>

      </>
    );
  }, [Personaje]);


  if (!Personaje) {
    return <div>Cargando...</div>;
  }


  return (
    <div className="App">
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        {renderModalContent}
      </Modal>
      <Header namepage={Personaje.nombre} />
      <div id="secciones">
        <section>
          <div className="avatar vampire printable">
            <img src={imageSrc} alt="" />
          </div>

          <div className="printable">
            <h3>Info de personaje</h3>
            <b>Nombre</b>: {Personaje.nombre}<br />
            <b>Concepto</b>: {Personaje.concepto}<br />
            <b>Naturaleza</b>: {Personaje.naturaleza}<br />
            <b>Conducta</b>: {Personaje.conducta}<br /><br />

            <h3>Info de vampiro</h3>
            <b>Clan</b>: {Personaje.RasgosVampiricos.clan}<br />
            <b>Generación</b>: {Personaje.RasgosVampiricos.generacion}°<br />
            <b>Sire</b>: {Personaje.RasgosVampiricos.sire}<br /><br />

            <h3>Info de cronica</h3>
            <b>Jugador</b>: {Personaje.jugador}<br />
            <b>Cronica</b>: {Personaje.cronica}<br />
          </div>

        </section>
        <section className="printable">
          <h2>Atributos</h2>
          <b>Fuerza</b> {num_to_points(Personaje.atributos.fuerza)}<br />
          <b>Destreza</b> {num_to_points(Personaje.atributos.destreza)}<br />
          <b>Resistencia</b> {num_to_points(Personaje.atributos.resistencia)}<br /><br />
          <b>Carisma</b> {num_to_points(Personaje.atributos.carisma)}<br />
          <b>Manipulacion</b> {num_to_points(Personaje.atributos.manipulacion)}<br />
          <b>Apariencia</b> {num_to_points(Personaje.atributos.apariencia)}<br /><br />
          <b>Percepción</b> {num_to_points(Personaje.atributos.percepcion)}<br />
          <b>Inteligencia</b> {num_to_points(Personaje.atributos.inteligencia)}<br />
          <b>Astucia</b> {num_to_points(Personaje.atributos.astucia)}<br />
          <h2>Habilidades</h2>
          {renderHabilidades}
          <h2>Ventajas</h2>
          {renderVentajas}
          <h2>Otros Rasgos</h2>
          <div key={`humanidad`}><b>Humanidad</b> <br />
            {num_to_points(Personaje.humanidad, 10)}</div>
          {
            Personaje.RasgosVampiricos.senda != null ? <div key={`senda`}><b>{Personaje.RasgosVampiricos.senda.nombre}</b> <br />
              {num_to_points(Personaje.RasgosVampiricos.senda.rango, 10)}</div> : null
          }
          <div key={`FuerzaVoluntad`}><b>Fuerza de Voluntad</b> <br />
            {num_to_points(Personaje.FuerzaVoluntad.Maximo, 10)}<br />
            {num_to_square(vistaFuerzaVoluntad, 10)}</div>
        </section>
        <section >

          <h2>Opciones</h2>
          <div id="botones">
            <Button onClick={() => openModal("habilidad")}>Tirada de Habilidad</Button><br /><br />
            <Button onClick={() => openModal("fv")}>Tirada de Fuerza de Voluntad</Button><br /><br />
            <Button onClick={curarFV}>Curar Fuerza de Voluntad ({vistaFuerzaVoluntad}/{Personaje.FuerzaVoluntad.Maximo})</Button><br /><br />
            <Button onClick={descargarJSON}>Exportar personaje</Button><br /><br />
            <Button onClick={() => window.print()}>Imprimir planilla</Button><br /><br />
            <hr />
            <Button>Editar personaje</Button><br /><br />
            <Button variant="danger" onClick={eliminarPersonaje}>Eliminar personaje</Button><br /><br />
          </div>
        </section>
      </div>
    </div>
  );
}

export default React.memo(JugarPersonaje);
