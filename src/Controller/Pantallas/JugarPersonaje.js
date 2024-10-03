import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Tirada } from "../Funciones/Tiradas.js";
import { porcentual, distribución_binomial, potencia } from "../Funciones/Math.js";
import "../../Styles/JugarPersonaje.css";

/*
JugarPersonaje
==============================================
- editar personaje
- notas

- tiradas de atributo
- tiradas de habilidad
- tiradas de virtudes
- tiradas de fuerza de voluntad
- tiradas de humanidad/senda
- tiradas de taumaturgia

- aumento/disminucion de reserva de sangre
- aumento/disminucion de fuerza de voluntad
- aumento/disminucion de salud

- aumento de exp
- comprar habilidades con exp

*/
function JugarPersonaje() {
  const [diceCant, setdiceCant] = useState(1);
  const [diceDiff, setdiceDiff] = useState(6);
  const [dicePass, setdicePass] = useState(1);
  const [roll10, setRoll10] = useState(null);
  // Estado inicial que intenta obtener el valor de localStorage
  const [listaPersonajes, setListaPersonajes] = useState(() => {
    const datoGuardado = localStorage.getItem("listaPersonajes");
    return datoGuardado ? JSON.parse(datoGuardado) : [];
  });

  let diffname = {
    3: "Rutina",
    4: "Muy fácil",
    5: "Sencillo",
    6: "Estándar",
    7: "Complicado",
    8: "Difícil",
    9: "Extremadamente difícil",
  };

  let exitoname = {
    1: "Marginal",
    2: "Moderado",
    3: "Completo",
    4: "Excepcional",
    5: "Fenomenal",
  };

  let prob_1exito_1dado = (10 - diceDiff + 1) / 10;

  let prob_1exito_xdado = prob_1exito_1dado * diceCant;

  let prob_1fallo_1dado = (diceDiff - 1) / 10;

  let prob_1fallo_xdado = potencia(prob_1fallo_1dado,diceCant);
 
  return (
    <div className="App">
      <header className="App-header">
        <h2>Jugar Personaje</h2>
        <Link to="/">volver</Link>
      </header>

      <section id="form_tirada">
        <div id="param_tirada">
          <h2>Parametros</h2>
          <label htmlFor="cantidad">Cantidad de dados</label>
          <br />
          <input
            type="number"
            name="cantidad"
            value={diceCant}
            onChange={(e) => setdiceCant(e.target.value)}
            min={1}
            max={10}
          />
          <br />
          <label htmlFor="dificultad">Dificultad: {diffname[diceDiff]}</label>
          <br />
          <input
            type="number"
            name="dificultad"
            value={diceDiff}
            onChange={(e) => setdiceDiff(e.target.value)}
            min={3}
            max={9}
          />
          <br />
          <label htmlFor="exitos">
            Cantidad de exitos <br />({exitoname[dicePass]})
          </label>
          <br />
          <input
            type="number"
            name="exitos"
            value={dicePass}
            onChange={(e) => setdicePass(e.target.value)}
            min={1}
            max={5}
          />
        </div>
        <div id="probabilidades">
          <h2>Probabilidades</h2>
          <p>Logrado: {porcentual(prob_1exito_xdado)}%</p>
          <p>Fallo: {porcentual(prob_1fallo_xdado)}%</p>
        </div>
      </section>
      <section>
        <button
          onClick={() => {
            let tirada = Tirada(diceCant, diceDiff, dicePass);
            console.log(tirada);
            setRoll10(tirada);
          }}
        >
          Tirada!
        </button>
      </section>
      <hr />
      <section id="resultado">
        <h2>Resultado</h2>

        <div>
          <h3>
            {roll10?.resultado != null
              ? roll10?.logrado
                ? "LOGRADO"
                : "NO LOGRADO"
              : ""}
          </h3>
          <ul id="dados">
            {roll10?.tirada.map((item, index) => {
              return <li>{item}</li>;
            })}
          </ul>

          <h4>{roll10?.resultado}</h4>
        </div>
      </section>
    </div>
  );
}

export default JugarPersonaje;
