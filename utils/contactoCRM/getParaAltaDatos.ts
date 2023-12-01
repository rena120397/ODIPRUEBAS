import { CAPACIDAD_AHORRO_ANUAL_POR_DEFECTO, CUENTA_BANCARIA_INCLUIR_INFORMA_POR_DEFECTO, tipoCorreoEnum } from "~/config/crm.config";
import { IUsuarioCRMRequest } from "~/types/CRM.types"


const getParaAltaDatos = (usuarioCRMRequest: IUsuarioCRMRequest) => {
    usuarioCRMRequest.rs_origen = 'odi';
    usuarioCRMRequest.rs_tipodecorreo = tipoCorreoEnum.PERSONAL;
    usuarioCRMRequest.rs_contact_rs_informacionadicional_cliente?.forEach(it => {
        it.rs_capacidaddeahorroanual = CAPACIDAD_AHORRO_ANUAL_POR_DEFECTO;
    });

    usuarioCRMRequest.rs_contact_rs_cuentasbancarias_Cliente?.forEach(it => {
        it.rs_incluireninforme = CUENTA_BANCARIA_INCLUIR_INFORMA_POR_DEFECTO;
    })

    return usuarioCRMRequest;
}

export default getParaAltaDatos;
