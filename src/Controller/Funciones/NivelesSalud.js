import DescGeneral  from "../../Data/Desc_General.json";

export function healthdata(health) {

    let out = { nombre: "Saludable", casillas: "□ □ □ □ □ □ □", penalizaciones: 0 };
    if (health == [0, 0, 0, 0, 0, 0, 0])
        return out;

    health.map((item, index) => {
        let casilla = "□";
        if (item === 1) casilla = "⧄";
        else if (item === 2) casilla = "▣";
        else if (item === 3) casilla = "■";

        if (item != 0) {
            out.nombre = DescGeneral.Tipos_Salud[index].Nombre;
            out.penalizaciones = DescGeneral.Tipos_Salud[index].Penalizacion;
        }
        out.casillas += " " + casilla;
    })

    return out;

}