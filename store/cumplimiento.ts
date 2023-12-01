import { ICumplimientoState } from "./types";
import { ActionTree, MutationTree } from 'vuex';
import { ICumplimientoCosmosRequest } from "~/types";

export const state = (): ICumplimientoState => ({
    saveCumplimientoResponse: undefined
});

export const mutations: MutationTree<ICumplimientoState> = {
    setSaveCumplimientoResponse(newState, payload) {
        newState.saveCumplimientoResponse = payload;
      },
}


export const actions: ActionTree<ICumplimientoState, ICumplimientoState> = {
    saveCumplimiento({commit}, payload: ICumplimientoCosmosRequest) {
        this.$axios
        .post('/api/compliance-information', payload)
        .then(() => commit('setSaveCumplimientoResponse', { success: true }))
        .catch((error) => commit('setSaveCumplimientoResponse', { success: false, error }))
    }
};
