import { ActionTree, GetterTree, MutationTree } from "vuex";
import { procentajePerfilEnum, SESSION_KEY } from "~/config";
import { SAB_IMAGES, SAB_THEME } from "~/config/lookFeel.config";
import { IPorcentajeRegistro, IUsuarioInformacion } from "~/types";
import { getPorcentajeRegistroTotal } from "~/utils/clienteFormulario";
import { IState, IUsuarioLogeadoPayload } from "./types";

export const strict = false;

export const state = (): IState => ({
  isAppLoading: false,
  formularioPanel: null,
  esActualizarUsuario: false,
  modalValidacion: true,
  modalValidacionCliente: false,
  productosUsuario: [],
  mostrarCerrarSesion: false,
  modalRegistro: false,
  tema: undefined,
  empresa: "",
  logos: {},
  nombreEmpresa: "",
  clienteEmpresa: "", // valor si es ibk o sab, de ninguno se queda en vacio
  idContactoCRM: {},
  correo: "",
  usuarioId: "",
  usuario: {},
  preguntasValidacionIden: [],
  mostrarDatosConyugue: false,
  mostrarAnexoW9: false,
  mostrarAnexoW8: false,
  mostrarAnexoClienteIndependiente: false,
  mostrarAnexoPep: null,
  porcentajeRegistro: {
    informacionUsuario: 0,
    informacionPersonal: 0,
    datosLaborales: 0,
    informacionFinanciera: 0,
    cuentasBancarias: 0,
    avisosLegales: 0,
  },
  autorizacionIbk: false,
  datosIncorrectosIbk: false,
  dataAuth: {},
  informacionUsuario: undefined,
  informacionFinanciera: {},
  esSujetoObligado: "",
  error: "",
  informacionPersonalCompletado: false,
  informacionDatosLaboralCompletado: false,
  informacionFinancieraCompletado: false,
  informacionAnexo8Completado: false,
  informacionAnexo9Completado: false,
  informacionClientIndepCompletado: false,
  informacionConyugeCompletado: false,
  informacionAnexoPEPCompletado: false,
  isLogged: false,
  datosPersonalesEquifax: {},
  dataIbk: {},
  datosReniec: {},
  modalPreguntasValidacion: false,
  modalErrorValidacion: false,
  modalSeguirConoc: false,
  esPersonaRegistrada: false,
});

export type RootState = IState;

export const getters: GetterTree<RootState, RootState> = {
  isAppLoading(state) {
    return state.isAppLoading;
  },
  informacionUsuario: (contextState) => {
    return contextState.informacionUsuario;
  },
  isLogged: (contextState) => {
    return contextState.isLogged;
  },
  esActualizarUsuario: (contextState) => {
    return contextState.esActualizarUsuario;
  },
  nombreEmpresa: (contextState) => {
    return contextState.nombreEmpresa;
  },
  porcentajeRegistroTotal: (contextState) => {
    return getPorcentajeRegistroTotal(contextState.porcentajeRegistro);
  },
  formularioPanel: (contextState) => {
    return contextState.formularioPanel;
  },
  usuario: (contextState) => {
    return contextState.usuario;
  },
};

const mutations: MutationTree<RootState> = {
  changeAppLoading(state, payload) {
    state.isAppLoading = payload;
  },
  setFormularioPanel(contextState, payload: number | null) {
    contextState.formularioPanel = payload;
  },
  setDatosPersonalesEquifax(contextState, payload) {
    contextState.datosPersonalesEquifax = payload;
  },
  setInformacionPersonalCompletado(contextState, payload) {
    contextState.informacionPersonalCompletado = payload;
  },
  setInformacionDatosLaboralCompletado(contextState, payload) {
    contextState.informacionDatosLaboralCompletado = payload;
  },
  setInformacionFinancieraCompletado(contextState, payload) {
    contextState.informacionFinancieraCompletado = payload;
  },
  setInformacionAnexo8Completado(contextState, payload) {
    contextState.informacionAnexo8Completado = payload;
  },
  setInformacionAnexo9Completado(contextState, payload) {
    contextState.informacionAnexo9Completado = payload;
  },
  setInformacionClientIndepCompletado(contextState, payload) {
    contextState.informacionClientIndepCompletado = payload;
  },
  setInformacionConyugeCompletado(contextState, payload) {
    contextState.informacionConyugeCompletado = payload;
  },
  setInformacionAnexoPEPCompletado(contextState, payload) {
    contextState.informacionAnexoPEPCompletado = payload;
  },
  setInformacionUsuario(contextState, payload) {
    contextState.informacionUsuario = payload;
  },
  setInformacionFinanciera(contextState, payload) {
    contextState.informacionFinanciera = payload;
  },
  setSujetoObligado(contextState, payload) {
    contextState.esSujetoObligado = payload;
  },
  setAuth(contextState, payload) {
    contextState.dataAuth = payload;
  },
  setMostrarDatosConyugue(contextState, payload) {
    contextState.mostrarDatosConyugue = payload;
  },
  setMostrarAnexoW9(contextState, payload) {
    contextState.mostrarAnexoW9 = payload;
  },
  setMostrarAnexoW8(contextState, payload) {
    contextState.mostrarAnexoW8 = payload;
  },
  setRegistroAutorizacionIbk(contextState, payload) {
    contextState.autorizacionIbk = payload;
  },
  setDatosIncorrectosIbk(contextState, payload) {
    contextState.datosIncorrectosIbk = payload;
  },
  setMostrarAnexoPEP(contextState, payload) {
    contextState.mostrarAnexoPep = payload;
  },
  setMostrarAnexoClienteIndependiente(contextState, payload) {
    contextState.mostrarAnexoClienteIndependiente = payload;
  },
  setUsuario(contextState, payload) {
    contextState.usuario = payload;
  },
  setCorreo(contextState, payload) {
    contextState.correo = payload;
  },
  setUsuarioId(contextState, payload) {
    contextState.usuarioId = payload;
  },
  setClientempresa(contextState, payload) {
    contextState.clienteEmpresa = payload;
  },
  setIdContactoCRM(contextState, payload) {
    contextState.idContactoCRM = payload;
  },
  setColorTema(contextState, payload) {
    contextState.tema = payload;
  },
  setLogo(contextState, payload) {
    contextState.logos = payload;
  },
  setEmpresa(contextState, payload) {
    contextState.empresa = payload;
  },
  setMostrarCerrarSesion(contextState, payload) {
    contextState.mostrarCerrarSesion = payload;
  },
  setmodalPreguntasValidacion(contextState, payload) {
    contextState.modalPreguntasValidacion = payload;
  },
  setmodalErrorValidacion(contextState, payload) {
    contextState.modalErrorValidacion = payload;
  },
  setmodalSeguirConoc(contextState, payload) {
    contextState.modalSeguirConoc = payload;
  },
  setPersonaRegistrada(contextState, payload) {
    contextState.esPersonaRegistrada = payload;
  },
  setEsActualizarUsuario(contextState, payload) {
    contextState.esActualizarUsuario = payload;
  },
  setModalValidacion(contextState, payload) {
    contextState.modalValidacion = payload;
  },
  setModalValidacionCliente(contextState, payload) {
    contextState.modalValidacionCliente = payload;
  },
  setNombreEmpresa(contextState, payload) {
    contextState.nombreEmpresa = payload;
  },
  setDataIbk(contextState, payload) {
    contextState.dataIbk = payload;
  },
  setDatosReniec(contextState, payload) {
    contextState.datosReniec = payload;
  },
  setError(contextState, payload) {
    contextState.error = payload;
  },
  setLoged(contextState, payload) {
    contextState.isLogged = payload;
  },
  setPorcentajeRegistro(contextState, payload: IPorcentajeRegistro) {
    contextState.porcentajeRegistro = payload;
    sessionStorage.setItem(
      SESSION_KEY.PORCENTAJE_REGISTRO,
      JSON.stringify(payload),
    );
  },
};
const actions: ActionTree<RootState, RootState> = {
  showLoadApp({ commit }) {
    commit("changeAppLoading", true);
  },
  hideLoadApp({ commit }) {
    commit("changeAppLoading", false);
  },
  clearPanelSelected({ commit }) {
    commit("setFormularioPanel", null);
  },
  actionUpdateInformacionUsuario({ commit }, payload: IUsuarioInformacion) {
    commit("setInformacionUsuario", payload);
    if (process.env.NODE_ENV !== "production") {
      sessionStorage.setItem(
        SESSION_KEY.TEMP_DATA_UPDATE,
        JSON.stringify(payload),
      );
    }
  },
  setCertia({ commit }, isHashSab = false) {
    const nombreCertia = "certia";
    const nombreEmpresa = "Inteligo SAB";

    if (this.$router.currentRoute.hash === "#certia" || isHashSab) {
      commit("setColorTema", SAB_THEME);
      commit("setEmpresa", nombreCertia);
      commit("setLogo", SAB_IMAGES);
      commit("setNombreEmpresa", nombreEmpresa);
    }
  },
  setSAB({ commit }, isHashSab = false) {
    const nombreSab = "sab";
    const nombreEmpresa = "Inteligo SAB";

    if (this.$router.currentRoute.hash === "#sab" || isHashSab) {
      commit("setColorTema", SAB_THEME);
      commit("setEmpresa", nombreSab);
      commit("setLogo", SAB_IMAGES);
      commit("setNombreEmpresa", nombreEmpresa);
    }
  },
  registrarPorcentajeAvisosLegales({ dispatch }) {
    const newPorcentajeRegistro: IPorcentajeRegistro = {
      ...this.state.porcentajeRegistro,
      avisosLegales: procentajePerfilEnum.avisosLegales,
    };
    dispatch("actualizarPorcentajeRegistro", newPorcentajeRegistro);
  },
  registrarPorcentajeCuentasBancarias({ dispatch }) {
    const newPorcentajeRegistro: IPorcentajeRegistro = {
      ...this.state.porcentajeRegistro,
      cuentasBancarias: procentajePerfilEnum.cuentasBancarias,
    };
    dispatch("actualizarPorcentajeRegistro", newPorcentajeRegistro);
  },
  registrarPorcentajeDatosLaborales({ dispatch }) {
    const newPorcentajeRegistro: IPorcentajeRegistro = {
      ...this.state.porcentajeRegistro,
      datosLaborales: procentajePerfilEnum.datosLaborales,
    };
    dispatch("actualizarPorcentajeRegistro", newPorcentajeRegistro);
  },
  registrarPorcentajeInformacionFinanciera({ dispatch }) {
    const newPorcentajeRegistro: IPorcentajeRegistro = {
      ...this.state.porcentajeRegistro,
      informacionFinanciera: procentajePerfilEnum.informacionFinanciera,
    };
    dispatch("actualizarPorcentajeRegistro", newPorcentajeRegistro);
  },
  registrarPorcentajeInformacionPersonal({ dispatch }) {
    const newPorcentajeRegistro: IPorcentajeRegistro = {
      ...this.state.porcentajeRegistro,
      informacionPersonal: procentajePerfilEnum.informacionPersonal,
    };
    dispatch("actualizarPorcentajeRegistro", newPorcentajeRegistro);
  },
  registrarPorcentajeInformacionUsuario({ dispatch }) {
    const newPorcentajeRegistro: IPorcentajeRegistro = {
      ...this.state.porcentajeRegistro,
      informacionUsuario: procentajePerfilEnum.informacionUsuario,
    };
    dispatch("actualizarPorcentajeRegistro", newPorcentajeRegistro);
  },
  actualizarPorcentajeRegistro(
    { commit },
    porcentajeRegistro: IPorcentajeRegistro,
  ) {
    const porcentaje = getPorcentajeRegistroTotal(porcentajeRegistro);
    const data = {
      id: this.state.informacionUsuario?.id,
      completed_profile_percentage: porcentaje,
    };
    this.$axios.post("/api/completed-percentage", data).then(() => {
      commit("setPorcentajeRegistro", porcentajeRegistro);
    });
  },
  async obtenerUsuarioDesdeCosmosYSetLogin(
    { dispatch },
    payload: { cuenta: string },
  ) {
    const responseGetLead: { data: IUsuarioInformacion } =
      await this.$axios.post("/api/getLead", payload);
    const porcentajeRegistro: IPorcentajeRegistro = {
      avisosLegales: !!responseGetLead.data.legal_information
        ?.legal_information_completed
        ? procentajePerfilEnum.avisosLegales
        : 0,
      cuentasBancarias: !!responseGetLead.data.main_bank_ccount
        ?.main_bank_ccount_completed
        ? procentajePerfilEnum.cuentasBancarias
        : 0,
      datosLaborales: !!responseGetLead.data.job_information
        ?.job_information_completed
        ? procentajePerfilEnum.datosLaborales
        : 0,
      informacionFinanciera: !!responseGetLead.data.financial_information
        ?.financial_information_completed
        ? procentajePerfilEnum.informacionFinanciera
        : 0,
      informacionPersonal: !!responseGetLead.data.personal_information
        ?.personal_information_completed
        ? procentajePerfilEnum.informacionPersonal
        : 0,
      informacionUsuario: !!responseGetLead.data.user_data_completed
        ? procentajePerfilEnum.informacionUsuario
        : 0,
    };
    const usuarioLogeado: IUsuarioLogeadoPayload = {
      usuarioId: responseGetLead.data.id,
      informacionUsuario: responseGetLead.data,
      usuario: {
        identityDocument: responseGetLead.data.identityDocument,
        correo: responseGetLead.data.emailAdress,
      },
      porcentajeRegistro,
    };
    dispatch("setUsuarioLogeado", usuarioLogeado);
  },
  async setUsuarioLogeado(
    { commit, dispatch },
    payload: IUsuarioLogeadoPayload,
  ) {
    commit("setUsuarioId", payload.usuarioId);
    dispatch("actionUpdateInformacionUsuario", payload.informacionUsuario);
    commit("setUsuario", payload.usuario);
    commit("setPorcentajeRegistro", payload.porcentajeRegistro);
    if (payload.informacionUsuario?.financial_information) {
      commit(
        "setSujetoObligado",
        payload.informacionUsuario.financial_information.is_obliged_subject,
      );
    }
    commit("setLoged", true);
  },
};

export default {
  getters,
  namespaced: true,
  mutations,
  actions,
  state,
};
