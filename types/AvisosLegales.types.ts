import { IUsuarioState } from "~/store/types";
import { IMethodsFomulario } from ".";
import {
  ITrama,
  IUsuarioCRMRequest,
  IUsuarioCRMUpdateRequest,
} from "./CRM.types";
import {
  IDataCumplimiento,
  IValidarCumplimientoResponse,
} from "./cumplimiento.types";
import { IResponseState } from "./response.types";
import {
  ISendMailAvisosLegalesParams,
  ISendMailErrorParams,
} from "./sendMail.types";
import { IUsuarioInformacion, IUsuarioInformacionRUT } from "./Usuario.types";

export interface IInfoUsuarioCRM {
  segmento?: number | null;
  tipoDocumento?: number;
  nombres?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  numeroDocumento?: string;
  rs_tipodocumentoconyuge?: number | null;
  rs_numerodconyuge?: string;
  spousesname?: string | null;
  rs_apellidomconyuge?: string | null;
  rs_apellidopconyuge?: string | null;
  rs_fechadenconyuge?: string | null;
  rs_tipodesociedadconyugal?: number | null;
  asesoriaInversiones?: boolean;
  asesorInversiones?: string;
  correoElectronico?: string;
  telefonoMovil?: string;
  fechaNacimiento?: string | null;
  genero?: number | null;
  lugarNacimiento?: string | null;
  nacionalidad?: string | null;
  pais?: string | null;
  departamento?: string;
  provicia?: string;
  distrito?: string;
  paisResidenciaFiscal?: string;
  direccionDomicilio?: string;
  telefono?: string | null;
  estadoCivil?: number | null;
  gradoInstitucional?: number;
  tipoCiudadano?: number;
  paisEmpresa?: string;
  residenciaFiscalExtranjera?: boolean;
  potencial?: string;
  rucPersonal?: string | null;
  propietarioIndividual?: boolean;
  corporacionC?: boolean;
  corporacionS?: boolean;
  partnership?: boolean;
  companiaLimitada?: boolean;
  fideicomisosPatrimonio?: boolean;
  clasificacionFiscal?: number | null;
  otrosW9?: boolean;
  instrucciones?: string | null;
  numeroSeguroSocial?: string | null;
  numeroIdentificacion?: string | null;
  tipoDocumentoConyuge?: number | null;
  numeroDocumentoConyuge?: string | null;
  nombreConyuge?: string | null;
  apellidoMaternoConyuge?: string | null;
  apellidoPaternoConyuge?: string | null;
  fechaNacimientoConyuge?: string | null;
  sociedadConyugal?: number | null;
  tipoCliente?: number | null;
  ruc?: string | null;
  nombreEmpresa?: string | null;
  direccionDatoLaboral?: string | null;
  profesionOcupacion?: string | null;
  cargo?: string | null;
  fechaDeIngreso?: string | null;
  negocioPropio?: boolean;
  anioServicio?: number | null;
  cargoPEP?: string | null;
  institucionPEP?: string | null;
}

export interface IData {
  dialog: boolean;
  showDialogSaveData: boolean;
  dialog3: boolean;
  valid7: boolean;
  lazy7: boolean;
  btnguardarAvisosLegales: boolean;
  mensajesError: {
    msjErrorAvisosLegales: {
      mensaje: string;
      mostrar: boolean;
    };
    msjErrorAvisGlobal: {
      mensaje: string;
      mostrar: boolean;
    };
  };
  disableAvisosLegales: boolean;
  aceptarTerminosYcondiciones: boolean;
  aceptarPoliticaClientes: boolean;
  aceptarWaiver: boolean;
  aceptarPrivacidadDatos: boolean;
  aceptarClausula: boolean;
  textWaiver: string;
  linkTyC: string;
  linkPoliticas: string;
  linkPrivacidad: string;
  infoUsuarioCRM: IInfoUsuarioCRM;
  infoCuentaBancaria: any;
  infoFinanciera: any;
  infoConoceCliente: any;
  loading: boolean;
  errorApi: string;
  idContactoCRMBD: any;
  observado: boolean;
  datActualizarCRMNativo: IUsuarioCRMUpdateRequest;
  tramaCRM: ITrama;
  dialogDNIvencido: boolean;
  idInfoAdicionalCRMBD: any;
}

export interface IComputed {
  mostrarAnexoW9: boolean;
  informacionUsuario: IUsuarioInformacion;
  usuario: IUsuarioState;
  esSujetoObligado: string;
  empresa: string;
  nombreEmpresa: string;
  informacionAnexo8Completado: boolean;
  mostrarAnexoW8: boolean;
  informacionAnexo9Completado: boolean;
  mostrarDatosConyugue: boolean;
  informacionConyugeCompletado: boolean;
  informacionAnexoPEPCompletado: boolean;
  mostrarAnexoPep: boolean;

  saveContactoCRM?: boolean;
  saveLegalInformacionResponse?: IResponseState;
}

export interface IMethods
  extends Omit<IMethodsFomulario, "actualizarInformacionUsuario"> {
  registrarPorcentajeAvisosLegales(): void;
  isAnexoYConyugueCompleto(): boolean;
  isNotObervadoPEP(): boolean;
  actualizarDatosLocales(
    informacionUsuarioObject: IUsuarioInformacion,
    dataInformacionCRM: IUsuarioCRMRequest,
  ): void;
  getInformacionUsuarioCRM(): Promise<{
    usuarioInformacion: IUsuarioInformacion;
    usuarioCRMRequest: IUsuarioCRMRequest;
    dataCumplimiento: IDataCumplimiento;
  }>;
  consultaCumplimiento(
    data: IDataCumplimiento,
    dataCRM: IUsuarioCRMRequest,
  ): void;
  guarDatosCumplimiento(dataC: IValidarCumplimientoResponse): void;
  guardarInformacionRUT(usuarioInformacion: IUsuarioInformacion): void;
  enviarColaCrearRUT(usuarioInformacionRut: IUsuarioInformacionRUT): void;
  computedDepartamentoRUT(departamentoid?: string): string | undefined;
  computedProvinciaRUT(provinciaid?: string): string | undefined;
  computedDistritoRUT(distritoid?: string): string | undefined;
  closeModal(): void;
  getRutInformacionObject(
    usuarioInformacion: IUsuarioInformacion,
  ): IUsuarioInformacionRUT;
  enviarRut(payload: IUsuarioInformacionRUT): void;
  enviarCorreoColaRutDev(payload: any): void;
  enviarCorreoErrorValidacionRut(payload: ISendMailErrorParams): void;
  mostrarMensajeValidacionCamposObligatorios(): void;
  mostrarMensajeObservadoPEP(): void;
}
