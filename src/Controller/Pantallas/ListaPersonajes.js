import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "../../Styles/ListaPersonajes.css";
import Clans from "../../Data/Clanlist.js";
import { Header } from "../Componentes/header.js";

const CLAN_IMAGES = {};
Clans.forEach(clan => {
  CLAN_IMAGES[clan.name] = clan.logoImg;
});

function ListaPersonajes() {
  const [listaPersonajes, setListaPersonajes] = useState(() => {
    try {
      const datoGuardado = localStorage.getItem("listaPersonajes");
      return datoGuardado ? JSON.parse(datoGuardado) : [];
    } catch {
      return [];
    }
  });

  const personajesMemo = useMemo(() => {
    return listaPersonajes.map((item, index) => {


      let imageSrc = null
      const hasPhoto = item.foto != null;
      let clanimg = null;

      if (item.tipo == "Vampiro") {

        clanimg = CLAN_IMAGES[item.RasgosVampiricos.clan];
        imageSrc = require(`../../Assets/img/Clans/${item.RasgosVampiricos.clan}/${clanimg}`);
      }

      return {
        ...item,
        index,
        clanimg,
        imageSrc,
        hasPhoto
      };
    });
  }, [listaPersonajes]);

  return (
    <div className="App">
      <Header namepage="Lista de Personajes" active={1} />
      <section id="main">
        <section id="listaPersonajes">
          {personajesMemo.map((item) => (
            <div key={item.index} className="personaje">
              <div className="avatar vampire">
                {item.hasPhoto ? (
                  <img src={item.imageSrc} className="ClanMiniLogo" alt="" />
                ) : (
                  <Link to={"/pj/" + item.index}>
                    <img src={item.imageSrc} alt="" />
                  </Link>
                )}
              </div>
              <br />
              {item.nombre}
            </div>
          ))}
        </section>
      </section>
    </div>
  );
}

export default React.memo(ListaPersonajes);
