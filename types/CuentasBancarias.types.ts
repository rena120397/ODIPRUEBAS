import { cuentaType, currencyType, IIbkApiResponse, IMethodsFomulario, IUsuarioInformacionBancoCuentas } from ".";

export interface ICuentaBancaria {
  currency: currencyType,
  id: string,
  type: cuentaType,
  subType: string,
}

export interface IData {
  valid6: boolean,
  validIBK: boolean,
  lazy6: boolean,
  tipoCuenta: string,
  numeroCuenta: string,
  tipoCuentas: Array<{ id: cuentaType, name: string }>,
  moneda: string,
  cuentas: Array<any>,
  autorizacionIbk: boolean,
  cuentasIbkSoles: Array<IUsuarioInformacionBancoCuentas>,
  cuentasIbkDolares: Array<IUsuarioInformacionBancoCuentas>,
  accountIbkValSoles: ICuentaBancaria,
  accountIbkValDolares: ICuentaBancaria,
  cuentaValidada: boolean,
  loadingCuenta: boolean,
}

export interface IComputed {}


export interface IMethods extends IMethodsFomulario {
  registrarPorcentajeCuentasBancarias(): void;
  getInformacionIBK(doc:string, typeDoc:string): void;
  guardarInformacionBancariaIBK(): void;
  ocultarCuenta(cuenta: string): string;
  seleccionarCuenta(): void;
  editarFormulario(): void;
  obtenerArrayCuentas(accounts: Array<IUsuarioInformacionBancoCuentas>, cuentaActual?: IUsuarioInformacionBancoCuentas, cuentaNueva?:ICuentaBancaria): void;
}

