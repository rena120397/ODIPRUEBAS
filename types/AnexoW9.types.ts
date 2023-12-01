import { IMethodsFomulario } from ".";

export interface IData  {
  formGeneradorCompletado: boolean,
  errorFormGeneradorCompletado: string,
  btnEditarw9: boolean,
  valid7: boolean,
  lazy7: boolean,
  mensajesError: {
    msjErrorW9: {
      mensaje: string,
      mostrar: boolean,
    },
  },
  proprietor: boolean,
  SocialSecurity: string,
  Other: boolean,
  LimitedLiability: boolean,
  TrustEstate: boolean,
  Partnership: boolean,
  SCorporation: boolean,
  CCorporation: boolean,
  TaxClassification: string,
  iptOther: string,
  radioTaxClas: string,
  numeroIdentificacion: string,
  selectTIN: string,
  rules: {
    ssn: Array<any>,
  },
}

export interface IComputed {
  mostrarAnexoW9: boolean;
  informacionPersonalCompletado: boolean;
}


export interface IMethods extends IMethodsFomulario {
}

