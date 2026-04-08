import React, { useState } from "react";

import { Tirada } from "../Funciones/Tiradas.js";
import {
  porcentual,
  distribución_binomial,
  potencia,
} from "../Funciones/Math.js";

export const NuevaTiradaComp = ({ Historial, setHistorial }) => {
  const [diceCant, setdiceCant] = useState(1);
  const [diceDiff, setdiceDiff] = useState(6);
  const [dicePass, setdicePass] = useState(1);
  const [comment, setComment] = useState("");
  const [roll10, setRoll10] = useState(null);

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

  let prob_1fallo_xdado = potencia(prob_1fallo_1dado, diceCant);

  let prob_Xexito_xdado =
    dicePass <= diceCant
      ? distribución_binomial(dicePass, diceCant, prob_1exito_1dado)
      : 0;

  const AgregarAlHistorial = (tirada, text) => {
    console.log(Historial);

    let data = {
      date: Date.now(),
      comment: text,
      roll: tirada,
    };

    Historial.push(data);
    localStorage.setItem("Historial", JSON.stringify(Historial));
    setHistorial(Historial);
  };

  return (
    <section id="nueva_tirada">
      <section id="form_tirada">
        <div id="param_tirada">
          <h2>Parametros</h2>
          <label htmlFor="comentario">Comentario</label>
          <br />
          <input
            type="text"
            name="comentario"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />

          <label htmlFor="cantidad">Reserva de dados</label>
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
          <label htmlFor="dificultad">
            Dificultad <br />
            {diffname[diceDiff]}
          </label>
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
          <p>Logrado: {porcentual(prob_Xexito_xdado)}%</p>
          <p>al menos 1 exito: {porcentual(1 - prob_1fallo_xdado)}%</p>
          <p>Fallo: {porcentual(prob_1fallo_xdado)}%</p>
        </div>
        {
          roll10 != null ?
            (
              <div id="resultado">
                <div className="Tirada">
                  <p>{comment}</p>
                  <h3>
                    {roll10.resultado != null
                      ? roll10.logrado
                        ? "LOGRADO"
                        : "NO LOGRADO"
                      : ""}
                  </h3>
                  <ul id="dados">
                    {roll10.tirada.map((item, index) => {
                      let result = "";

                      if (item == 1) result = "failure";

                      if (item >= roll10.dificultad) result = "exito";

                      return <li className={result}>{item}</li>;
                    })}
                  </ul>

                  <h4>{roll10.resultado}</h4>

                </div>
              </div>) : null}
      </section>
      <section>
        <button
          className="button-12"
          onClick={() => {
            let tirada = Tirada(diceCant, diceDiff, dicePass);
            console.log(tirada);
            setRoll10(tirada);
            AgregarAlHistorial(tirada, comment);
          }}
        >
          Tirada!
        </button>
      </section>

    </section>
  );
}
