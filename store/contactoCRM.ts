import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex';
import { CODIGO_ERROR_ACTUALIZAR_SERVICIO_CRM, CODIGO_ERROR_ALTA_SERVICIO_CRM, APIM_CRM_CONTACT_CREATE_URL, APIM_CRM_CONTACT_UPDATE_URL, APIM_ONBOARDING_KEY } from '~/config';
import { getHeaderAPIM } from '~/utils/clienteFormulario';
import { IContactoCRMState } from "./types";

export const state = (): IContactoCRMState => ({
    saveContactoCRM: undefined,
});

export const getters: GetterTree<IContactoCRMState, IContactoCRMState> = {
    getSaveContactoCRM: (contextState) => {
        return contextState.saveContactoCRM;
    },
}

export const mutations: MutationTree<IContactoCRMState> = {
    setSaveContactoCRM(newState, payload) {
        newState.saveContactoCRM = payload;
    },
}

const contactoCRMResponse = async (request: Promise<any>, esActualizar: boolean, { commit, dispatch }: ActionContext<IContactoCRMState, IContactoCRMState>) => {

    request.then(_ => {
        commit('setSaveContactoCRM', true);
    })
        .catch(() => {
            dispatch('formulario/openModalRequestFail', `Código de error: ${esActualizar ? CODIGO_ERROR_ACTUALIZAR_SERVICIO_CRM : CODIGO_ERROR_ALTA_SERVICIO_CRM}`, { root: true });
        })
}

export const actions: ActionTree<IContactoCRMState, IContactoCRMState> = {
    crearContactoCRM(context, payload) {
        contactoCRMResponse(
            this.$axios({
                method: 'post',
                url: APIM_CRM_CONTACT_CREATE_URL,
                data: payload,
                headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
            }),
            false,
            context
        );
    },
    actualizarContactoCRM(context, payload) {
        contactoCRMResponse(
            this.$axios({
                method: 'post',
                url: APIM_CRM_CONTACT_UPDATE_URL,
                data: payload,
                headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
            }),
            true,
            context
        );
    }

};
