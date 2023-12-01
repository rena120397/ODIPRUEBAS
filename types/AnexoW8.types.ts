import { IMethodsFomulario } from ".";

export interface IData {
  formGeneradorCompletado: boolean,
  errorFormGeneradorCompletado: string,
  btnEditarw8: boolean,
  valid7: boolean,
  lazy7: boolean,
  mensajesError: {
    msjErrorW8: {
      mensaje: string,
      mostrar: boolean,
    },
  },
  consultaRucPersonal: string | null,
  mostrarRucPersonal: boolean,
  iptRUCpersonal: string | null,
}

export interface IComputed {
  mostrarAnexoW8: boolean;
informacionPersonalCompletado: boolean;
}


export type IMethods = IMethodsFomulario

