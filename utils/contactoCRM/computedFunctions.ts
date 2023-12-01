
// valores computados

import { objetivosInversiones, statecodeEnum, toleranciaRiesgoArray } from "~/config/crm.config"
import { currencyType, empresasType, estadoCivilType, fuenteFondoType, ICargo, INacionalidad, IPais, IPaisResidenciaFiscal, IUsuarioCRM, IUsuarioCRMCuentasBancarias, IUsuarioCRMInformacionAdicional, IUsuarioInformacionBancoCuentas, trabajadorType } from "~/types"

export function computedGenero(obj?: string | null) {
  let valObj = 0
  switch (obj) {
    case 'masculino':
      valObj = 1
      break
    case 'femenino':
      valObj = 2
      break
    default:
      break
  }
  return valObj
}

export const computedGeneroFromCRM = (value?: number | null): string => {
  switch (value) {
    case 1:
      return 'masculino';
    case 2:
      return 'femenino';
    default:
      return '';
  }
}
export function computedEstadoCivil(obj?: string | null) {
  let valObj = 0
  switch (obj) {
    case 'soltero':
      valObj = 1
      break
    case 'casado':
      valObj = 2
      break
    case 'divorciado':
      valObj = 3
      break
    case 'viudo':
      valObj = 4
      break
    case 'conviviente':
      valObj = 5
      break
    default:
      break
  }
  return valObj
}

export const computedEstadoCivilFromCRM = (value: number | null): estadoCivilType => {
  switch (value) {
    case 1:
      return 'soltero';
    case 2:
      return 'casado';
    case 3:
      return 'divorciado';
    case 4:
      return 'viudo';
    case 5:
      return 'conviviente';
    default:
      return '';
  }
}
export function computedSociedadCnyugal(obj: string) {
  let valObj = 0
  switch (obj) {
    case 'regimenGanancias':
      valObj = 1
      break
    case 'separacionBienes':
      valObj = 2
      break
    default:
      break
  }
  return valObj
}

export const computedSociedadCnyugalFromCRM = (value: number): string => {
  switch (value) {
    case 1:
      return 'regimenGanancias';
    case 2:
      return 'separacionBienes';
    default:
      return '';
  }
}

export function computedTipoCliente(obj?: string | null) {
  let valObj = 0
  switch (obj) {
    case 'dependiente':
      valObj = 1
      break
    case 'independiente':
      valObj = 2
      break
    case 'jubilado':
      valObj = 3
      break
    case 'otro':
      valObj = 4
      break
    default:
      break
  }
  return valObj
}

export const computedTipoClienteFromCRM = (value: number | null): trabajadorType => {
  switch (value) {
    case 1:
      return 'dependiente';
    case 2:
      return 'independiente';
    case 3:
      return 'jubilado';
    case 4:
      return 'otro';
    default:
      return '';
  }
}

export function computedTaxClasification(tax: any, val: any) {
  return tax === val;
}

export const computedTaxClasificationFromCRM = (
  rs_propietarioindividual: boolean,
  rs_corporacinc: boolean,
  rs_corporacins: boolean,
  rs_partnership: boolean,
  rs_companialimitada: boolean,
  rs_fideicomisopatrimonio: boolean,
  rs_otrosw9: boolean
): string => {
  if (rs_propietarioindividual === true) {
    return 'proprietor';
  } else if (rs_corporacinc === true) {
    return 'CCorporation';
  } else if (rs_corporacins === true) {
    return 'SCorporation';
  } else if (rs_partnership === true) {
    return 'Partnership';
  } else if (rs_companialimitada === true) {
    return 'LimitedLiability';
  } else if (rs_fideicomisopatrimonio === true) {
    return 'TrustEstate';
  } else if (rs_otrosw9 === true) {
    return 'Other';
  } else {
    return '';
  }
}

export function computedSegmento(val: string) {
  let valObj: number | null = 0
  switch (val) {
    case 'sab':
      valObj = null
      break
    case 'certia':
      valObj = 3
      break
    default:
      break
  }
  return valObj
}

export const computedSegmentoFromCRM = (value?: number | null): empresasType => {
  if (value === 3) {
    return 'certia';
  } else {
    return 'sab';
  }
}
export function computedIngresoMensual(obj: string) {
  let valObj = 0
  switch (obj) {
    case 'Menos de US$ 5,000':
      valObj = 1
      break
    case 'De US$ 5,001 a US$ 10,000':
      valObj = 2
      break
    case 'De US$ 10,001 a US$ 50,000':
      valObj = 3
      break
    case 'Más de US$ 50,001':
      valObj = 4
      break
    default:
      break
  }
  return valObj
}

export const computedIngresoMensualFromCRM = (value: number): string => {
  switch (value) {
    case 1:
      return 'Menos de US$ 5,000';
    case 2:
      return 'De US$ 5,001 a US$ 10,000';
    case 3:
      return 'De US$ 10,001 a US$ 50,000';
    case 4:
      return 'Más de US$ 50,001';
    default:
      return '';
  }
}

export function computedBsInVehiInv(obj: string) {
  let valObj = 0
  switch (obj) {
    case 'De 0 a US$ 10,000':
      valObj = 1
      break
    case 'De US$ 10,001 a US$ 50,000':
      valObj = 2
      break
    case 'De US$ 50,001 a US$ 200,000':
      valObj = 3
      break
    case 'Más de US$ 200,001':
      valObj = 4
      break
    default:
      break
  }
  return valObj
}

export const computedBsInVehiInvFromCRM = (value: number): string => {
  switch (value) {
    case 1:
      return 'De 0 a US$ 10,000';
    case 2:
      return 'De US$ 10,001 a US$ 50,000';
    case 3:
      return 'De US$ 50,001 a US$ 200,000';
    case 4:
      return 'Más de US$ 200,001';
    default:
      return '';
  }
}

export function cmputedProductoInteres(obj: string): string | null {
  let valObj = null
  switch (obj) {
    case 'productos_general':
      valObj = '3'
      break
    case 'acciones':
      valObj = '2'
      break
    default:
      break
  }
  return valObj
}

export const cmputedProductoInteresFromCRM = (value: string | null): string | null => {
  switch (value) {
    case '3':
      return 'productos_general';
    case '2':
      return 'acciones';
    default:
      return null;
  }
}

export const computedFuenteFondosFromCRM = (value: IUsuarioCRMInformacionAdicional, fuenteOtros?: string | null): fuenteFondoType => {
  if (!!value.rs_fuentefondos1) {
    return 'fuenteSueldo';
  } else if (!!value.rs_fuentefondos2) {
    return 'fuenteUtilidades';
  } else if (!!value.rs_fuentefondos3) {
    return 'fuenteCobros';
  } else if (!!value.rs_fuentefondos4) {
    return 'fuenteVentaInmueble';
  } else if (!!value.rs_fuentefondos5) {
    return 'fuenteFinanciacionterceros';
  } else if (!!value.rs_fuentefondos6) {
    return 'fuenteHerencia';
  } else if (!!value.rs_fuentefondos7) {
    return 'fuenteArrendamientos';
  } else if (!!fuenteOtros?.length) {
    return 'fuenteOtros';
  } else {
    return '';
  }
}

export const computedRelacionPrincipalFromCRM = (value: IUsuarioCRMInformacionAdicional) => {
  if (!!value.rs_relacionsab1) {
    return 'compraVentaInstrumentosFinancieros';
  } else if (!!value.rs_relacionsab2) {
    return 'asesoriaInversiones';
  } else if (!!value.rs_relacionsab3) {
    return 'opFuturos';
  } else if (!!value.rs_relacionsab4) {
    return 'custodiaValores';
  } else if (!!value.rs_relacionsab5) {
    return 'administrarCartera';
  } else if (!!value.rs_relacionsab6) {
    return 'operacionesReporte';
  } else {
    return '';
  }
}

export function computedPaisResidenciaFiscal(paisesResidenciaFiscal: IPaisResidenciaFiscal[], paisid: string) {
  const paisCRM = paisesResidenciaFiscal.filter(x => x.rs_id === paisid)
  return paisCRM[0]?.rs_pasesresidenciaid
}

export const computedPaisResidenciaFiscalFromCRM = (paisesResidenciaFiscal: IPaisResidenciaFiscal[], rs_pasesresidenciaid?: string | null) => {
  return paisesResidenciaFiscal.find(it => it.rs_pasesresidenciaid === rs_pasesresidenciaid)?.rs_id || '01';
}

export function computedProfesionesOcupaciones(cargos: ICargo[], id: string) {
  const cargoCRM = cargos.filter(x => x.rs_id === id);
  let hasProfOcupId = cargoCRM.length && cargoCRM[0].hasOwnProperty('rs_profesionocupacionid')
  return hasProfOcupId ? cargoCRM[0].rs_profesionocupacionid : '';
}

export const getOcupacionIdFromCRM = (cargos: ICargo[], rs_profesionocupacionid: string): string => cargos.find(it => it.rs_profesionocupacionid === rs_profesionocupacionid)?.rs_id || '';

export function computedPais(paises: Array<IPais>, paisid?: string) {
  const paisCRM = paises.filter(x => x.rs_paisid === paisid)
  return paisCRM[0]?.rs_cdigo
}
export function computedNacionalidad(nacionalidades: Array<INacionalidad>, nacionalidadid?: string) {
  const nacionalidadCRM = nacionalidades.filter(x => x.rs_nacionalidadid === nacionalidadid)
  return nacionalidadCRM[0]?.rs_codigonacionalidad
}
export function computedNacionalidadRUT(nacionalidades: Array<INacionalidad>, nacionalidadid?: string) {
  const nacionalidadCRM = nacionalidades.filter(x => x.rs_nacionalidadid === nacionalidadid)
  return nacionalidadCRM.length ? nacionalidadCRM[0].rs_name : ''
}
export function computedPaisRUT(paises: Array<IPais>, paisid?: string) {
  const paisCRM = paises.filter((x: IPais) => x.rs_paisid === paisid)
  return paisCRM.length ? paisCRM[0].rs_name : ''
}
export function formatDate(date?: string) {
  if (!date) { return null }
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

export const getCuentasBancarias = (cuentas: IUsuarioCRMCuentasBancarias[]): IUsuarioInformacionBancoCuentas[] => {
  const arr: IUsuarioInformacionBancoCuentas[] = [];
  const cuentaSoles = getCuenta(cuentas.find(it => it._transactioncurrencyid_value === process.env.monedaSoles && it.statecode === statecodeEnum.ACTIVO), 'PEN');
  const cuentaDolares = getCuenta(cuentas.find(it => it._transactioncurrencyid_value === process.env.monedaDolares && it.statecode === statecodeEnum.ACTIVO), 'USD');
  if (cuentaSoles) {
    arr.push(cuentaSoles);
  }
  if (cuentaDolares) {
    arr.push(cuentaDolares);
  }

  return arr;
}

const getCuenta = (cuentaCRM: IUsuarioCRMCuentasBancarias | undefined, currency: currencyType): IUsuarioInformacionBancoCuentas | null => {
  if (!cuentaCRM) {
    return {
      currency,
      id: '',
      type: '557',
    };
  }
  return {
    currency,
    id: cuentaCRM.rs_name,
    type: cuentaCRM._rs_tipodecuenta1_value === process.env.cuentaAhorro ? '557' : '558',
    rs_cuentasbancariasid: cuentaCRM.rs_cuentasbancariasid,
    statecode: cuentaCRM.statecode,
  };
}


export const computedToleranciaRiesgo = (value: string): number => {
  let valObj = 0
  switch (value) {
    case 'Muy Bajo':
      valObj = 1
      break
    case 'Bajo':
      valObj = 2
      break
    case 'Medio':
      valObj = 3
      break
    case 'Alto':
      valObj = 4
      break
    case 'Muy Alto':
      valObj = 5
      break
    default:
      break
  }
  return valObj
}

export const computedToleranciaRiesgoFromCRM = (value?: number | null) => {
  return toleranciaRiesgoArray.find(it => it.id === value)?.name || '';
}

export const computedObjInversion = (value: number | null): string => {
  return objetivosInversiones.find(it => it.id === value)?.name || '';
}

export const computedExperienciaMercado = (value: string): number => {
  let valObj = 0
  switch (value) {
    case 'Ninguna':
      valObj = 1
      break
    case 'Menos de 5 operaciones':
      valObj = 2
      break
    case 'Mas de 5 operaciones':
      valObj = 3
      break
    default:
      break
  }
  return valObj
}

export const computedExperienciaMercadoFromCRM = (value?: number | null): string => {
  switch (value) {
    case 1:
      return 'Ninguna';
    case 2:
      return 'Menos de 5 operaciones';
    case 3:
      return 'Mas de 5 operaciones';
    default:
      return '';
  }
}

export const computedIsPepFromCRM = (usuarioCRM: IUsuarioCRM): ('si' | 'no') => {

  return usuarioCRM["rs_contact_rs_informacionadicional_cliente"]?.[0]?.rs_erespep === 1 ? 'si' : 'no';

}

export const getDateToSaveCRM = (value?: string | null): string | null => {
  if (!value) {
    return null;
  }
  return value + 'T06:00:00';
}
