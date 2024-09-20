import ClanLogo from "./Assets/img/Clans/Tzimisce/LogoClanTzimisce.webp";
import ClanName from "./Assets/img/Clans/Tzimisce/ClanTzimisceTitleV5.webp";

import "./App.css";
import "./Styles/Main.css";
import "./Styles/MainResp.css";

import ClansReact from "./Controller/Clans/Clans.js";
import {
  NaturalezasReact,
  ConductasReact,
} from "./Controller/Arquetipos/Arquetipos.js";
import ConceptosReact from "./Controller/Concepto/Conceptos.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={ClanLogo}
          id="ClanLogo"
          alt=""
        />
        <img
          src={ClanName}
          id="ClanName"
          alt=""
        />
      </header>
      <section id="playerdata">
        <div>
          <label htmlFor="nombre">Nombre</label>
          <br />
          <input type="text" name="nombre" />
          <br />
          <label htmlFor="jugador">Jugador</label>
          <br />
          <input type="text" name="jugador" />
          <br />
          <label htmlFor="cronica">Croníca</label>
          <br />
          <input type="text" name="cronica" />
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
          <input type="number" name="generacion" min={8} max={15}/>
          <br />
          <label htmlFor="clan">Clan</label>
          <br />
          <ClansReact />
          <br />
          <label htmlFor="sire">Sire</label>
          <br />
          <input type="text" name="sire" />
          <br />
        </div>
      </section>
    </div>
  );
}

export default App;
