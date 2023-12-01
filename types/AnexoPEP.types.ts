import { IMethodsFomulario } from ".";

export interface IData {
  formGeneradorCompletado: boolean,
  errorFormGeneradorCompletado: string,
  btnEditarPEP: boolean,
  valid7: boolean,
  lazy7: boolean,
  mensajesError: {
    msjErrorAvisosLegales: {
      mensaje: string,
      mostrar: boolean,
    },
    msjCheck: {
      mensaje: string,
      mostrar: boolean,
    },
  },
  funcionarioPEP?: boolean,
  parientePEP: boolean,
  participacion: boolean,
  desempenioCargoPEP: boolean,
  cargo0: string,
  institucion0: string,
  cargo1: string,
  institucion1: string,
  cargo2: string,
  institucion2: string,
  nombreCompletoVinculado0: string,
  apellidoVinculado0: string,
  parentescoVinculado0: string,
  nombreCompletoVinculado1: string,
  apellidoVinculado1: string,
  parentescoVinculado1: string,
  nombreCompletoVinculado2: string,
  apellidoVinculado2: string,
  parentescoVinculado2: string,
  nombreCompletoVinculado3: string,
  parentescoVinculado3: string,
  ruc0: string;
  razonSocial0: string,
  ruc1: string,
  razonSocial1: string,
  ruc2: string,
  razonSocial2: string,
  cantidadFuncionCago: number,
  cantidadParticipacionAporte: number,
  cantidadParientesPEP: number,
  cantidadAsociadoFuncionarioPEP: number,
  parentescoPariente0: string,
  apellidosPariente0: string,
  nombrePariente0: string,
  cargoPariente0: string,
  institucionPariente0: string,
  parentescoPariente1: string,
  apellidosPariente1: string,
  nombrePariente1: string,
  cargoPariente1: string,
  institucionPariente1: string,
  parentescoPariente2: string,
  apellidosPariente2: string,
  nombrePariente2: string,
  cargoPariente2: string,
  institucionPariente2: string,
  parentescoFuncionario0: string;
  apellidosFuncionario0: string,
  nombreFuncionario0: string,
  cargoFuncionario0: string,
  institucionFuncionario0: string,
  parentescoFuncionario1: string,
  apellidosFuncionario1: string,
  nombreFuncionario1: string,
  cargoFuncionario1: string,
  institucionFuncionario1: string,
  parentescoFuncionario2: string,
  apellidosFuncionario2: string,
  nombreFuncionario2: string,
  cargoFuncionario2: string,
  institucionFuncionario2: string,
}

export interface IComputed {
  mostrarAnexoPep: boolean;
  informacionFinancieraCompletado: boolean;
}


export interface IMethods extends IMethodsFomulario {
  postDatosPep(): void;
  seleccionarPep(): void;
}

