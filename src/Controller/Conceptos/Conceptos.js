import React, { useState } from "react";
import Conceptos from "../../Data/Conceptolist.js";

const ConceptosReact = ({
  ConceptoValue,
  onChangeConcepto,
  onChangeConceptoExample,
  disabledOther,
  onChangedisabledOther,
  Other,
  setOther
}) => {
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
        {Conceptos.find((elem) => elem.tipo == ConceptoValue).ejemplos.map(
          (item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          )
        )}
      </select>
      <br />
      <input type="checkbox" name="otro" onClick={onChangedisabledOther} />
      <label htmlFor="otro">otro?</label>
      <br />
      <input
        type="text"
        name="Concepto"
        value={Other}
        onChange={(e) => setOther(e.target.value)}
        disabled={disabledOther}
      />
    </>
  );
};

export default ConceptosReact;
