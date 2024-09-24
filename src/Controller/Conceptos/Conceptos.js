import React, { useState } from "react";
import Conceptos from "../../Data/Conceptolist.js";

const ConceptosReact = () => {
  const [selectedConceptosValue, setSelectedConceptosValue] = useState(
    Conceptos[0].tipo
  );
  const [selectedConceptosEjemploValue, setSelectedConceptosEjemploValue] =
    useState("");
  const [disabledOther, setDisabledOther] = useState(true);

  const handleConceptosOption = (event) => {
    setSelectedConceptosValue(event.target.value);
    setDisabledOther(selectedConceptosEjemploValue != "Otro");
    console.log(event.target.value);
    console.log(selectedConceptosValue);
  };

  const handleConceptosEjemploOption = (event) => {
    setSelectedConceptosEjemploValue(event.target.value);
    setDisabledOther(event.target.value != "Otro");

    console.log(event.target.value);
    console.log(selectedConceptosEjemploValue);
  };

  return (
    <>
      <select
        id="Concepto"
        value={selectedConceptosValue}
        onChange={handleConceptosOption}
      >
        {Conceptos.map((item, index) => (
          <option key={index} value={item.tipo}>
            {item.tipo}
          </option>
        ))}
      </select>
      <br />
      <select id="Concepto_ejemplo" onChange={handleConceptosEjemploOption}>
        {Conceptos.find(
          (elem) => elem.tipo == selectedConceptosValue
        ).ejemplos.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <br />
      <input type="text" name="Concepto" disabled={disabledOther} />
    </>
  );
};

export default ConceptosReact;
