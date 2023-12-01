import {
  ICargo,
  IPaisResidenciaFiscal,
  IPorcentajeRegistro,
  IUsuarioInformacion,
} from "~/types";
import { IResponseState } from "~/types/response.types";

export interface IState {
  isAppLoading: boolean;
  formularioPanel: number | null;
  esActualizarUsuario: boolean;
  modalValidacion: boolean;
  modalValidacionCliente: boolean;
  productosUsuario: Array<any>;
  mostrarCerrarSesion: boolean;
  modalRegistro: boolean;
  tema?: any;
  empresa: string;
  logos: any;
  nombreEmpresa: string;
  clienteEmpresa: string; // valor si es ibk o sab; de ninguno se queda en vacio
  idContactoCRM: any;
  correo: string;
  usuarioId: string;
  usuario: IUsuarioState;
  preguntasValidacionIden: [];
  mostrarDatosConyugue: boolean;
  mostrarAnexoW9: boolean;
  mostrarAnexoW8: boolean;
  mostrarAnexoClienteIndependiente: boolean;
  mostrarAnexoPep: null;
  porcentajeRegistro: IPorcentajeRegistro;
  autorizacionIbk: boolean;
  datosIncorrectosIbk: boolean;
  dataAuth: any;
  informacionUsuario: IUsuarioInformacion | undefined;
  informacionFinanciera: any;
  esSujetoObligado: string;
  error: string;
  informacionPersonalCompletado: boolean;
  informacionDatosLaboralCompletado: boolean;
  informacionFinancieraCompletado: boolean;
  informacionAnexo8Completado: boolean;
  informacionAnexo9Completado: boolean;
  informacionClientIndepCompletado: boolean;
  informacionConyugeCompletado: boolean;
  informacionAnexoPEPCompletado: boolean;
  isLogged: boolean;
  datosPersonalesEquifax: any;
  dataIbk: any;
  datosReniec: any;
  modalPreguntasValidacion: boolean;
  modalErrorValidacion: boolean;
  modalSeguirConoc: boolean;
  esPersonaRegistrada: boolean;
}

export interface ICumplimientoState {
  saveCumplimientoResponse?: IResponseState;
}
export interface IContactoCRMState {
  saveContactoCRM?: boolean;
}

export interface ILegalInformacionState {
  saveLegalInformacionResponse?: IResponseState;
}

export interface IGeneralState {
  paises: [];
  departamentos: [];
  provincias: [];
  distritos: [];
  nacionalidades: [];
  canales: [];
  cargos: ICargo[];
  paisesResidenciaFiscal: IPaisResidenciaFiscal[];
  apiPaises: string;
  apiDepartamentos: string;
  apiProvincias: string;
  apiDistritos: string;
  apiNacionalidades: string;
  apiCanales: string;
  apiProfesionOcupacion: string;
  apiPaisesResidenciaFiscal: string;
}

export interface IUsuarioState {
  identityDocument?: {
    type: string;
    number: string;
  };
  correo?: string;
}

export interface IUsuarioLogeadoPayload {
  usuarioId: string;
  informacionUsuario: IUsuarioInformacion;
  usuario: IUsuarioState;
  porcentajeRegistro?: IPorcentajeRegistro;
}

export interface IModalDataParam {
  isRequestError?: boolean;
  text?: string;
  title?: string;
  showIcon?: boolean;
  onClose?(): void;
}
export interface IModalData extends IModalDataParam {
  isOpen: boolean;
}
export interface IFormularioState {
  modalRequestFail: IModalData;
}
