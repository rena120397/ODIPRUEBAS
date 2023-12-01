

import { IUsuarioInformacion } from "./Usuario.types";

export interface IData {
    showNavbar: boolean;
    panel: number | null;
}

export interface IComputed {
    esActualizarUsuario: boolean;
    empresa: string;
    tema: any;
    informacionUsuario: IUsuarioInformacion;
    nombreEmpresa: string;
    porcentajeRegistroTotal: number;
}


export interface IMethods {
    onScroll(): void;
    setFormularioPanel(value: number | null): void;
}

