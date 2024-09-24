import React, { useState } from "react";
import Clans from "../../Data/Clanlist.js";

export var ClanImg = Clans[0].logoImg;

export const ClansReact = () => {
  const [selectClan, setSelectClan] = useState(Clans[0].name);
  const handleSelect = (event) => {
    let logoimg = Clans.find((elem) => elem.name == event.target.value).logoImg;
    
    setSelectClan(event.target.value);
    ClanImg = logoimg;
    console.log(">>" + event.target.value);
  };

  return (
    <select onChange={handleSelect} value={selectClan}>
      {Clans.map((item, index) => (
        <option key={index} value={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  );
};
