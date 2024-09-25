import Naturaleza from "../../Data/Arquetipolist.js";

export const NaturalezasReact = ({ onChange }) => {
  return (
    <select onChange={onChange}>
      {Naturaleza.map((item, index) => (
        <option key={index + 1} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};
export const ConductasReact = ({ onChange }) => {
  return (
    <select onChange={onChange}>
      <option key="0" value="(igual a Naturaleza)">
        (igual a Naturaleza)
      </option>
      {Naturaleza.map((item, index) => (
        <option key={index + 1} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};
