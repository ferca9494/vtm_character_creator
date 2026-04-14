import React, { useState } from "react";
import Conceptos from "../../Data/Conceptolist.json";

const ConceptosReact = ({
  ConceptoValue,
  onChangeConcepto,
  onChangeConceptoExample,
  //disabledOther,
  onChangedisabledOther,
  Other,
  setOther
}) => {

  const [disabledOther, setDisabledOther] = useState(true);


  return (
    <>
      <select
        id="Concepto"
        onChange={onChangeConcepto}
        disabled={!disabledOther}
      >
        {Conceptos.map((item, index) => (
          <option key={index} value={item.tipo}>
            {item.tipo}
          </option>
        ))}
      </select>
      <br />
      <select
        id="Concepto_ejemplo"
        onChange={onChangeConceptoExample}
        disabled={!disabledOther}
      >
        {Conceptos.find((elem) => elem.tipo === ConceptoValue)?.ejemplos.map(
          (item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          )
        )}
      </select>
      <br />
      <input
        type="text"
        name="Concepto"
        value={Other}
        onChange={(e) => {
          if (e.target.value == undefined || e.target.value == null || e.target.value == "") {
            setDisabledOther(true)
          } else
            setDisabledOther(false)

          setOther(e.target.value)
        }}
        placeholder="o Escribe tu concepto..."
      />
    </>
  );
};

export default ConceptosReact;
