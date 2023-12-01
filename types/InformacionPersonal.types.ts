import { estadoCivilType, IMethodsFomulario } from ".";

export interface IData {
    emailRules: Array<(value: string) => boolean | string>,
    valid2: boolean;
    lazy2: boolean;
    sexo: string;
    estadoCivil: estadoCivilType;
    nombre: string;
    dni: string;
    apPat: string;
    apMat: string;
    fecNacimiento: string;
    domicilio: string;
    lugarNacimiento: string;
    documentos: Array<{ id: string; name: string }>;
    mensajesError: {
        msjErrorInformacionPerso: {
            mensaje: string;
            mostrar: boolean;
        };
        msjErrorPais: {
            mensaje: string;
            mostrar: boolean;
        };
        msjErrorImagen: {
            mensaje: string;
            mostrar: boolean;
        };
    };
    ciudadanoAmericano: string;
    menu: boolean;
    nacionalidad: string;
    direccionProvincia: string;
    direccionDistrito: string;
    tipoDocumento: string;
    email: string;
    celular: string;
    direccionPais: string;
    direccionDepartamento: string;
    ceimage: string;
    telefonoFijo?: string | null;
    paisresidenciafiscal0: string;
    tin_rut0: string;
    paisresidenciafiscal1: string;
    tin_rut1: string;
    paisresidenciafiscal2: string;
    tin_rut2: string;
    cantidadTin?: number;
    departamentosIP: Array<any>;
    provinciasIP: Array<any>;
    distritosIP: Array<any>;
    imagenvalor: string;
    cargo: string;
    listaProfesiones: Array<any>;
    paisPeru: string;
}

export interface IComputed {
    datosPersonalesEquifax: any;
    computedDateFormatted:  string | null;
    esUbigeoRequerido: boolean;
    ubigeoRules: Array<(value: string) => boolean | string>;
}


export interface IMethods extends IMethodsFomulario {
    registrarPorcentajeInformacionPersonal(): void;
    guardarImagen(file: any): void;
    postInformacionPersonal(): void;
    seleccionarDepartamento(): void;
    seleccionarProvincia(): void;
    seleccionarDistrito(): void;
    seleccionarEstadoCivil(): void;
    seleccionarCiudadanoAmericano(): void;
    getProfesiones(): void;
    getInformacionIBK(doc: string, typeDoc: string): void;
    buscarPaisIBK(paisP: string): Promise<any>;
    buscarNacionalidadIBK(nacionalidadP: string): string;
    buscarDepartamentoIBK(departamentoP: string): string;
    buscarProvinciaIBK(provinciaP: string): string;
    buscarDistritoIBK(distritoP: string): string;
    // VALORES COMPUTADOS DE UBIGEO PARA CRM
    computedDepartamento(departamentoid: string): string;
    computedProvincia(provinciaid: string): string;
    computedDistrito(distritoid: string): string;
    limpiarUbigeo(): void;
}

