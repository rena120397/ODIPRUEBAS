import { IKeyValue } from "~/types";

export const CAPACIDAD_AHORRO_ANUAL_POR_DEFECTO = 1;
export const CUENTA_BANCARIA_INCLUIR_INFORMA_POR_DEFECTO = true;

export enum tipoCorreoEnum {
    "PERSONAL" = 1,
}

export enum tipoFormaPagoDividiendoEnum {
    "TRANSFERENCIA_CLIENTE_OTROS_BANCOS" = 4,
}

export enum tipoClienteIAEnum {
    "RETAIL" = 4,
}

export enum conocimientoDelMercadoEnum {
    MEDIO = 2,
}

export enum direccionEnvioEstadoCuentaEnum {
    CORREO_ELECTRONICO = 5,
}

export enum bolsaNegociarEnum {
    BOLSA_VALORES_LIMA = 1,
}


export enum siNoEnum {
    No = 0,
    Si = 1,
}

export enum tipoOrdenesEnum {
    ESCRITO = 1,
    TELEFONICO = 2,
}

export enum statecodeEnum {
    ACTIVO = 0,
    INACTIVO = 1,
}

export const objetivosInversiones: Array<IKeyValue<number>> = [
    { id: 1, name: 'Seguridad' },
    { id: 2, name: 'Proteccion' },
    { id: 3, name: 'Crecimiento y seguridad' },
    { id: 4, name: 'Crecimiento' },
    { id: 5, name: 'Maximo crecimiento' },
];

export const toleranciaRiesgoArray: Array<IKeyValue<number>> = [
    { id: 1, name: 'Muy Bajo' },
    { id: 2, name: 'Bajo' },
    { id: 3, name: 'Medio' },
    { id: 4, name: 'Alto' },
    { id: 5, name: 'Muy Alto' },
];
