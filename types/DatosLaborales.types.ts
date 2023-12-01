import { IMethodsFomulario, siNoType, trabajadorType } from ".";

export interface IData {
  rucRules: Array<(value: string) => boolean | string>;
  bloquearRegistroRuc: boolean;
  mostrarMensajeNoExisteSunat: boolean;
  valid4: boolean,
  lazy4: boolean,
  menu: boolean,
  trabajador: trabajadorType,
  ruc: string,
  rucIndependiente: string,
  dondeLabora: string,
  dondeLaboraIndependiente: string,
  DireccionEmpresaIndependiente: string,
  cargo: string,
  DireccionEmpresa: string,
  mensajesError: {
    msjErrorDatosLaborales: {
      mensaje: string,
      mostrar: boolean,
    },
  },
  esParienteColaborador: siNoType,
  esColaborador: siNoType,
  fecIngreso: string,
  tieneNegocio: string,
  nombreEmpresaColaborador: string,
  cargoColaborador: string,
  nombreParienteInteligo: string,
  cargoParienteInteligo: string,
  mostrarErrorRUCdep: boolean,
  listaCargos: Array<any>,
  listaCargosotros: Array<any>,
}

export interface IComputed {
  computedDateFormatted: string | null;
}


export interface IMethods extends IMethodsFomulario {
  registrarPorcentajeDatosLaborales(): void;
  getCargos(): void;
  getCargosOtros(): void;
  getCargoOcupacional(): string;
  buscarRUC(): void;
  seleccionarTrabajador(): void;
  seleccionartipoTrabajador(): void;
  getInformacionIBK(doc: string, typeDoc: string): void;
  onKeypressChangeRuc(e: any): void;
}

