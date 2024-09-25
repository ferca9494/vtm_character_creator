import React, { useState } from "react";
import Clans from "../../Data/Clanlist.js";

export const ClansReact = ({ onChange }) => {
  
  return (
    <select onChange={onChange} >
      {Clans.map((item, index) => (
        <option key={index} value={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  );
};
