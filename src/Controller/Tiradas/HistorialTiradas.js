import React, { useState, useEffect } from "react";

export const HistorialTiradasComp = ({ Historial, setHistorial }) => {
  let historial_ordenado = new Array(Historial);

  useEffect(() => {
    historial_ordenado[0].sort((a, b) => b.date - a.date);
  }, [Historial]);

  return (
    <section id="resultado">
      <h2>Resultado</h2>
      <div id="HistorialTiradas">
        {historial_ordenado[0].map((elem, index) => {
          let roll = elem.roll;
          let rolldate = new Date(elem.date);
          const formattedDate = rolldate.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          return (
            <div className="Tirada">
              <i>{formattedDate}</i>
              <p>{elem.comment}</p>
              <h3>
                {roll.resultado != null
                  ? roll.logrado
                    ? "LOGRADO"
                    : "NO LOGRADO"
                  : ""}
              </h3>
              <ul id="dados">
                {roll.tirada.map((item, index) => {
                  let result = "";

                  if (item == 1) result = "failure";

                  if (item >= roll.dificultad) result = "exito";

                  return <li className={result}>{item}</li>;
                })}
              </ul>

              <h4>{roll.resultado}</h4>
              <hr />
            </div>
          );
        })}
      </div>
    </section>
  );
};
