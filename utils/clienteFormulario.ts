import { APIM_IBK_CUSTOMER_FIND, BOTON_ACTUALIZAR_TEXTO, BOTON_GUARDAR_TEXTO } from "~/config";
import { IPorcentajeRegistro } from "~/types";



export const getBotonGuardarTexto = (esActualizar: boolean): string => {
    return !esActualizar ? BOTON_GUARDAR_TEXTO : BOTON_ACTUALIZAR_TEXTO;
}

export const getPorcentajeRegistroTotal = (porcentajeRegistro: IPorcentajeRegistro): number => {
    return (
        porcentajeRegistro.avisosLegales +
        porcentajeRegistro.cuentasBancarias +
        porcentajeRegistro.datosLaborales +
        porcentajeRegistro.informacionFinanciera +
        porcentajeRegistro.informacionPersonal +
        porcentajeRegistro.informacionUsuario
    )
}


export const getHeaderAPIM = (apimKey: string) => ({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': apimKey,
});

