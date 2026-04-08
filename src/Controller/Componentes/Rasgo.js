import { num_to_points } from "../Funciones/Extras.js";

export const Rasgo = ({ name, value, onChange , min=1,max=5}) => {
  return (
    <div className="Rasgo">
      {name} {num_to_points(value,5,true)}
      <br />
      <input
        type="range"
        name={name}
        value={value}
        onInput={onChange}
        min={min}
        max={max}
        step={1}
      />
      
      <br />
    </div>
  );
};