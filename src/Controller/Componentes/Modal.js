import { useState } from "react";
import { Button } from "./Button";


export function Modal({ children, isOpen, onClose }) {

    if (!isOpen) return null;
   
    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <Button onClick={onClose} style={styles.closeBtn}>X</Button>
                <br/>
                {children}
            </div>
        </div>
    );
}

 


const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        minWidth: "300px",
        position: "relative",
    },
    closeBtn: {
        position: "absolute",
        top: "10px",
        right: "10px",
    },
};