import { Button } from "../Componentes/Button.js";


export function Bullets({ children, style = null }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", ...style }}>
            {children}
        </div>
    );
} export function BulletSection({ title, children, style = null, sec = null, actualsecction = null, onClickSiguiente = null, onClickTerminar = null }) {
    return (
        <div style={{ display: actualsecction === sec ? "flex" : "none", flexDirection: "column", gap: "4px", ...style }}>
            <h3>{title}</h3>
            {children}
            <section id="buttons"  >
                {onClickTerminar ? <Button variant="danger" onClick={() => onClickTerminar()} >Terminar</Button> : <Button onClick={() => onClickSiguiente()} >Siguiente</Button>}

            </section>
        </div>
    );
}