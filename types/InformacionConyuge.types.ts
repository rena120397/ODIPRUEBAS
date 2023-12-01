import { IMethodsFomulario } from ".";

export interface IData {
    formGeneradorCompletado: boolean;
    errorFormGeneradorCompletado: string;
    valid3: boolean;
    lazy3: boolean;
    menu1: boolean;
    dniConyugue: string | null;
    tipoDocumento: string | null;
    ApePatConyugue: string | null;
    ApeMatConyugue: string | null;
    fecNacConyugue: string | null;
    nombreConyugue: string | null;
    documentos: [
      { id: string; name: string },
      { id: string; name: string},
    ];
    mensajesError: {
      msjErrorDatosConyugue: {
        mensaje: string;
        mostrar: boolean;
      };
    };
    regimenConyugal: string | null;
  }

export interface IComputed  {
    mostrarDatosConyugue: boolean;
    informacionPersonalCompletado: boolean;
    computedDateConyugueFormatted:  string | null;
}


export interface IMethods extends IMethodsFomulario {
    getInformacionIBK(doc: string, typeDoc: string): void;
}

