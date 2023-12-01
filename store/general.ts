import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { ActionTree, Commit, Dispatch, GetterTree, MutationTree } from 'vuex';
import { APIM_ONBOARDING_KEY, getCatalogUrl } from '~/config';
import { getHeaderAPIM } from '~/utils/clienteFormulario';
import { IGeneralState } from "./types";
import VueRouter from 'vue-router'

export const state = (): IGeneralState => ({
  paises: [],
  departamentos: [],
  provincias: [],
  distritos: [],
  nacionalidades: [],
  canales: [],
  cargos: [],
  paisesResidenciaFiscal: [],
  apiPaises: 'rs_paises',
  apiDepartamentos: 'rs_departamentos',
  apiProvincias: 'rs_provincias',
  apiDistritos: 'rs_distritos',
  apiNacionalidades: 'rs_nacionalidads',
  apiCanales: 'rs_canals',
  apiProfesionOcupacion: 'rs_profesionocupacions',
  apiPaisesResidenciaFiscal: 'rs_pasesresidencias',
});

export const getters: GetterTree<IGeneralState, IGeneralState> = {
  getPaises: (contextState) => {
    return contextState.paises;
  },
  getDepartamentos: (contextState) => {
    return contextState.departamentos;
  },
  getProvincias: (contextState) => {
    return contextState.provincias;
  },
  getDistritos: (contextState) => {
    return contextState.distritos;
  },
  getNacionalidades: (contextState) => {
    return contextState.nacionalidades;
  },
  getCanales: (contextState) => {
    return contextState.canales;
  },
  getCargos: (contextState) => {
    return contextState.cargos;
  },
  getPaisesResidenciaFiscal: (contextState) => {
    return contextState.paisesResidenciaFiscal;
  },
  getApiDepartamentos: (contextState) => {
    return contextState.apiDepartamentos;
  },
  getApiProvincias: (contextState) => {
    return contextState.apiProvincias;
  },
  getApiDistritos: (contextState) => {
    return contextState.apiDistritos;
  },
}

export const mutations: MutationTree<IGeneralState> = {
  setPaises(contextState, payload) {
    contextState.paises = payload
  },
  setNacionalidades(contextState, payload) {
    contextState.nacionalidades = payload
  },
  setCanales(contextState, payload) {
    contextState.canales = payload
  },
  setCargos(contextState, payload) {
    contextState.cargos = payload
  },
  setDepartamentos(contextState, payload) {
    contextState.departamentos = payload
  },
  setProvincias(contextState, payload) {
    contextState.provincias = payload
  },
  setDistritos(contextState, payload) {
    contextState.distritos = payload
  },
  setPaisesResidencia(contextState, payload) {
    contextState.paisesResidenciaFiscal = payload
  },
}

const loadGeneral = async (sessionKey: string, contextKey: string, contextPath: string, commit: Commit, dispatch: Dispatch, axios: NuxtAxiosInstance, router: VueRouter) => {

  const elementoInSession = sessionStorage.getItem(sessionKey);

  if (!!elementoInSession) {
    commit(contextKey, JSON.parse(elementoInSession));
  } else {
    await axios
      .get(getCatalogUrl(contextPath), {
        headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
      })
      .then((res) => {
        sessionStorage.setItem(sessionKey, JSON.stringify(res.data));
        commit(contextKey, res.data);
      }).catch(_ => {
        dispatch('formulario/openModalRequestFailWithActionClose', {
          onclose: () => {
            router.push('/error');
          }
        }, { root: true });
      });
  }
}


export const actions: ActionTree<IGeneralState, IGeneralState> = {

  async loadListasGenerales({ dispatch }) {
    const arrayPromises = [
      dispatch('loadPaises'),
      dispatch('loadDepartamentos'),
      dispatch('loadProvincias'),
      dispatch('loadDistritos'),
      dispatch('loadNacionalidades'),
      dispatch('loadCanales'),
      dispatch('loadOcupaciones'),
      dispatch('loadPaisesResidenciaFiscal'),
    ];
    await Promise.allSettled(arrayPromises);

  },
  async loadPaises({ commit, dispatch, state: contextState }) {
    await loadGeneral('paises', 'setPaises', contextState.apiPaises, commit, dispatch, this.$axios, this.$router);
  },
  async loadDepartamentos({ commit, dispatch, state: contextState }) {
    await loadGeneral('departamentos', 'setDepartamentos', contextState.apiDepartamentos, commit, dispatch, this.$axios, this.$router);
  },
  async loadProvincias({ commit, dispatch, state: contextState }) {
    await loadGeneral('provincias', 'setProvincias', contextState.apiProvincias, commit, dispatch, this.$axios, this.$router);
  },
  async loadDistritos({ commit, dispatch, state: contextState }) {
    await loadGeneral('distritos', 'setDistritos', contextState.apiDistritos, commit, dispatch, this.$axios, this.$router);
  },
  async loadNacionalidades({ commit, dispatch, state: contextState }) {
    await loadGeneral('nacionalidades', 'setNacionalidades', contextState.apiNacionalidades, commit, dispatch, this.$axios, this.$router);
  },
  async loadCanales({ commit, dispatch, state: contextState }) {
    await loadGeneral('canales', 'setCanales', contextState.apiCanales, commit, dispatch, this.$axios, this.$router);
  },
  async loadOcupaciones({ commit, dispatch, state: contextState }) {
    await loadGeneral('cargos', 'setCargos', contextState.apiProfesionOcupacion, commit, dispatch, this.$axios, this.$router);
  },
  async loadPaisesResidenciaFiscal({ commit, dispatch, state: contextState }) {
    await loadGeneral('paisesResidencia', 'setPaisesResidencia', contextState.apiPaisesResidenciaFiscal, commit, dispatch, this.$axios, this.$router);
  },

};
