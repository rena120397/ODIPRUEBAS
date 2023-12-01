import { ILegalInformacionState } from "./types";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { ILegalInformacionRequest } from "~/types";

export const state = (): ILegalInformacionState => ({
  saveLegalInformacionResponse: undefined,
});

export const getters: GetterTree<
  ILegalInformacionState,
  ILegalInformacionState
> = {
  getSaveLegalInformacionResponse: (contextState) => {
    return contextState.saveLegalInformacionResponse;
  },
};

export const mutations: MutationTree<ILegalInformacionState> = {
  setSaveLegalInformacionResponse(newState, payload) {
    newState.saveLegalInformacionResponse = payload;
  },
};

export const actions: ActionTree<
  ILegalInformacionState,
  ILegalInformacionState
> = {
  saveLegalInformacion({ commit }, payload: ILegalInformacionRequest) {
    this.$axios
      .post("/api/legal-information", payload)
      .then(() => commit("setSaveLegalInformacionResponse", { success: true }))
      .catch((error) =>
        commit("setSaveLegalInformacionResponse", { success: false, error }),
      );
  },
};
