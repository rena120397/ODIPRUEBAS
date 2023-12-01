import { IModalDataParam } from "~/store/types";
import { mensajeFormularioVarianteType } from "~/types";
import { IUsuarioInformacion } from "~/types/Usuario.types";


export interface IMixinDataFomulario {
    mensajeFormulario?: {
        mensaje: string;
        variante: mensajeFormularioVarianteType,
    } | null;
    showBotonEnviarFormulario: boolean;
    esFormularioCompleto: boolean;
    esLoadingFormulario: boolean;
}


export interface IMixinMethodsFomulario {
    soloNumeros(e: any): boolean;
    validaAlfaNumerico(e: any): void;
    esAlfanumerico(e: any): boolean;
    validaSoloNumeros(e: any): void;
    validarEspaciosEnBlanco(e?: KeyboardEvent): void;
    editarFormulario(): void;
    clearPanelSelected(): void;
    actionUpdateInformacionUsuario(value: IUsuarioInformacion): void;
    formatDate(date: any): null | string;
    openModalRequestFail(mensaje: string): void;
    openModal(payload: IModalDataParam): void;
}

export interface IMixinComputedFomulario {
    botonGuardarText: string;    
    esActualizarUsuario: boolean;
    informacionUsuario: IUsuarioInformacion;
    porcentajeRegistroTotal: number;
    tema: any;
    

    paises: Array<any>;
    nacionalidades: Array<any>;
    departamentos: Array<any>;
    provincias: Array<any>;
    distritos: Array<any>;
    cargos: Array<any>;
    paisesResidenciaFiscal: Array<any>;    
}
