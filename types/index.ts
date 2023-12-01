export * from './AvisosLegales.types';
export * from './CRM.types';
export * from './cumplimiento.types';
export * from './general.types';
export * from './legalInformacion.types';
export * from './response.types';
export * from './Usuario.types';

export type encryptType = 'base64' | 'aes';


export enum familystatuscodeType {
    'soltero' = 1,
    'casado' = 2,
    'divorciado' = 3,
    'viudo' = 4,
    'conviviente' = 5
}

export type mensajeFormularioVarianteType = 'SUCCESS' | 'ERROR';

export type estadoCivilType = 'soltero' | 'casado' | 'divorciado' | 'viudo' | 'conviviente' | '';
export type trabajadorType = 'dependiente' | 'independiente' | 'jubilado' | 'otro' | '';
export type siNoType = "no" | "si" | '';
export type fuenteFondoType = "fuenteSueldo" | "fuenteUtilidades" | "fuenteCobros" | "fuenteVentaInmueble" | "fuenteFinanciacionterceros" | "fuenteHerencia" | "fuenteArrendamientos" | "fuenteOtros" | "";
export type currencyType = 'PEN' | 'USD';
export type cuentaType = 'SAVING' | 'CURRENT' | 'IMPACS';
export type cuentaTipoType = '557' | '558';
export type empresasType = 'sab' | 'certia';

export interface IKeyValue<T = string> {
    id: T;
    name: string;
}

export interface IMensajeFormulario {
    mensaje: string;
    variante: mensajeFormularioVarianteType,
  }


export interface IMethodsFomulario {
    onClickGuardarFormulario(): void;    
    actualizarInformacionUsuario(): void;
    obtenerDatosParaFormulario(): void;
}

export interface IPorcentajeRegistro {
    informacionUsuario: number;
    informacionPersonal: number;
    datosLaborales: number;
    informacionFinanciera: number;
    cuentasBancarias: number;
    avisosLegales: number;
}



