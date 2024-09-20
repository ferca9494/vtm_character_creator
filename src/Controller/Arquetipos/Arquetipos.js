import Naturaleza from "../../Data/Arquetipolist.js";

export const NaturalezasReact = () => {
  return (
    <select>
      {Naturaleza.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};
export const ConductasReact = () => {
  return (
    <select>
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
