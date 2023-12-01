import { IFormularioState, IModalData, IModalDataParam } from "./types";
import { ActionTree, GetterTree, MutationTree } from 'vuex'

export const state = (): IFormularioState => ({
    modalRequestFail: {
        isOpen: false,
        showIcon: true,
    },
});

export const getters: GetterTree<IFormularioState, IFormularioState> = {
    modalRequestFail: (contextState) => {
      return contextState.modalRequestFail;
    }
};

export const mutations: MutationTree<IFormularioState> = {
    setModalRequestFail(contextState, payload: IModalData) {    
      contextState.modalRequestFail = payload;
    },
};

export const actions: ActionTree<IFormularioState, IFormularioState> = {
    closeModalRequestFail({ commit }) {
        commit('setModalRequestFail', {
            isOpen: false
        });
    },
    openModalRequestFail({ commit }, payload?: string) {
        commit('setModalRequestFail', {
            isOpen: true,
            isRequestError: true,
            text: payload,
        });
    },
    openModalRequestFailWithActionClose({ commit }, { text, onclose }: { text?: string, onclose: () => void }) {
        commit('setModalRequestFail', {
            isOpen: true,
            isRequestError: true,
            text,
            onclose,
        });
    },
    openModal({ commit }, {isRequestError, text, title, showIcon, onClose }: IModalDataParam) {
        commit('setModalRequestFail', {
            isOpen: true,
            isRequestError,
            text,
            title,
            showIcon: showIcon === undefined ? true : showIcon,
            onClose,
        });
    },
};
