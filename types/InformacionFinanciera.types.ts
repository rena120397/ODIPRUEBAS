import { fuenteFondoType, IKeyValue, IMethodsFomulario, siNoType } from ".";

export interface IData {
  dialogPerfilador: boolean,
  dialog: boolean,
  valid5: boolean,
  lazy5: boolean,
  fuentedefondos: fuenteFondoType,
  fuenteUtilidades: boolean,
  fuenteSueldo: boolean,
  fuenteHerencia: boolean,
  fuenteCobros: boolean,
  fuenteVentaInmueble: boolean,
  fuenteArrendamientos: boolean,
  fuenteOtros: boolean,
  ingresoMensual: string,
  ipDeudaBanc: string,
  ipinvValoAho: string,
  ipVehicEmb: string,
  ipBienesInmu: string,
  esSujetoObligado: siNoType,
  esPEP: siNoType,
  paisfondos?: string,
  otraOcupacion: string,
  otraFuenteFondos?: string | null,
  mensajesError: {
    msjErrorInfoFinanciera: {
      mensaje: string,
      mostrar: boolean,
    },
    msjCheck: {
      mensaje: string,
      mostrar: boolean,
    },
    msjrazon: {
      mensaje: string,
      mostrar: boolean,
    },
    msjPerfilador: {
      mensaje:
      string,
      mostrar: boolean,
    },
  },
  declaracionIncapacidad: siNoType,
  experienciaMercado: string,
  toleranciaRiesgo: string,
  toleranciaRiesgoValue?: number | null,
  objetivoInversion: number | null,
  razonPrincipalSAB: string,
  razonPrincipalCliente1: boolean,
  razonPrincipalCliente2: boolean,
  razonPrincipalCliente3: boolean,
  razonPrincipalCliente4: boolean,
  razonPrincipalCliente5: boolean,
  razonPrincipalCliente6: boolean,
  fuenteFinanciacionterceros: boolean,
  perfilador: {
    numPreguntaPerfilador: number,
    porcentajePerfilador: number,
    incompleto: boolean,
  },
  perfilDeInversor: string,
}

export interface IComputed {
  empresa: string;
  informacionFinanciera: any;
  objetivoInversionLabel: string;
  listaObjetivosInversiones: Array<IKeyValue<number>>;
  listaTolenciasRiesgo: Array<IKeyValue<number>>;
}


export interface IMethods extends IMethodsFomulario {
  registrarPorcentajeInformacionFinanciera(): void;
  postInformacionFinanciera(): void;
  seleccionarPEP(): void;
  seleccionarSujetoObligado(): void;
  obtenerInformacionPerfilador(): void;
  abrirPerfilador(): void;
  validarPerfilador(): void;
  changeFuenteDeFondos(): void;
  onChangeToleranciaRiesgo():void;
}
