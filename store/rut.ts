import { ActionTree } from 'vuex';
import { APIM_CREAR_RUT, APIM_CREAR_RUT_KEY } from '~/config/enviroment.config';
import { IUsuarioInformacionRUT } from "~/types";
import { getHeaderAPIM } from '~/utils/clienteFormulario';



export const actions: ActionTree<any, any> = {
    enviarRut({ dispatch }, payload: IUsuarioInformacionRUT) {        
        this.$axios({
            method: 'post',
            url: APIM_CREAR_RUT,
            headers: getHeaderAPIM(APIM_CREAR_RUT_KEY),
            data: {
                resource_message_name: 'sbq-onboarding-rpa-prod',
                application_label: 'onboarding',
                payload
            },
        }).catch(() => {
            dispatch('formulario/openModalRequestFail', 'No se pudo registrar el RUT', { root: true });
        });
    }
};
