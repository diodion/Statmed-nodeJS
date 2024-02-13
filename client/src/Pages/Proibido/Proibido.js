import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as StatmedLogo } from "../../Assets/img/svg/logo.svg";
import "./Proibido.css";

export default function Proibido() {
    useEffect(() => {
        document.title = "ACESSO NEGADO";
    });

    const navegar = useNavigate();

    const voltar = () => navegar(-1);

    return (
        <div className="container-fluid">
            <div className="div-centralizar">
                <div className="text-center">
                    <h3 className="text-uppercase fw-normal mt-3 mb-3">
                        ACESSO NEGADO
                    </h3>
                </div>
                <div className="me-3">
                    <StatmedLogo className="logo-anegado" />
                    <button className="button-anegado" onClick={voltar}>
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
}
