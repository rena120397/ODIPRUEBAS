import { IMethodsFomulario } from ".";

export interface IData {
    valid: boolean,
    lazy: boolean,
    correo: string,
    celular: string,
    contrasenia: string,
    mensajesError: {
        msjErrorDatosUsuario: {
            mensaje: string,
            mostrar: boolean,
        },
    },
}



export interface IMethods extends IMethodsFomulario {
    registrarPorcentajeInformacionUsuario(): void;
    getInformacionIBK(doc: string, typeDoc: string): Promise<any>;
}
