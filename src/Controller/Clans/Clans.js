import Clans from "../../Data/Clanlist.js" 

const ClansReact = () => {
  
    return (
      <select>
        {Clans.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  };
  
export default ClansReact