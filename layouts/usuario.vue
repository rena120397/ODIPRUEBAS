<template>
  <v-app>
    <NavUsuario />
    <loader-global />
    <request-fail />
    <nuxt v-if="isLogged" />
    <v-overlay v-else>
      <v-progress-circular :size="70" :width="7" color="purple" indeterminate />
    </v-overlay>
  </v-app>
</template>
<script lang="ts">
import * as Msal from "msal";
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import NavUsuario from "~/components/NavUsuario.vue";
import { SESSION_KEY } from "~/config";
import { IUsuarioLogeadoPayload } from "~/store/types";
import { IUsuarioInformacion } from "~/types";
import { getObjectFormFromCRM } from "~/utils/contactoCRM";
import { loginRequest, msalConfig } from "~/utils/msal";

export default Vue.extend({
  components: {
    NavUsuario,
  },
  computed: {
    ...mapGetters([
      "informacionUsuario",
      "isLogged",
      "esActualizarUsuario",
      "usuario",
    ]),
    ...mapGetters({
      cargos: "general/getCargos",
      paisesResidenciaFiscal: "general/getPaisesResidenciaFiscal",
    }),
  },
  async created() {
    if (process.browser) {
      (window as any).completarSecciones = this.completarSecciones;
      await this.loadListasGenerales();
      if (!this.esActualizarUsuario) {
        this.getAccountFromMSAL();
      } else {
        this.getAccountFromStorage();
      }
    }
  },
  methods: {
    ...mapActions([
      "setCertia",
      "setSAB",
      "setUsuarioLogeado",
      "obtenerUsuarioDesdeCosmosYSetLogin",
    ]),
    ...mapActions({
      loadListasGenerales: "general/loadListasGenerales",
    }),
    completarSecciones() {
      const informacionUsuario: IUsuarioInformacion = this.informacionUsuario;
      const usuarioLogeado: IUsuarioLogeadoPayload = {
        usuarioId: this.informacionUsuario.id,
        informacionUsuario: {
          ...informacionUsuario,
          user_data_completed: true,
          main_bank_ccount: {
            ...informacionUsuario.main_bank_ccount,
            main_bank_ccount_completed: true,
          },
          financial_information: {
            ...informacionUsuario.financial_information,
            financial_information_completed: true,
          },
          job_information: {
            ...informacionUsuario.job_information,
            job_information_completed: true,
          },
          personal_information: {
            ...informacionUsuario.personal_information,
            personal_information_completed: true,
          },
          legal_information: {
            ...informacionUsuario.legal_information,
            accept_terms_and_conditions: true,
            customer_policy: true,
            accept_waiver: true,
            accept_clause: true,
            data_privacy: true,
          },
          annexed_pep: {
            ...informacionUsuario.annexed_pep,
            annexed_pep_completed: true,
          },
        },
        usuario: this.usuario,
        porcentajeRegistro: {
          informacionUsuario: 10,
          informacionPersonal: 20,
          datosLaborales: 20,
          informacionFinanciera: 30,
          cuentasBancarias: 10,
          avisosLegales: 0,
        },
      };
      this.setUsuarioLogeado(usuarioLogeado);
    },
    async getAccountFromMSAL() {
      const client = new Msal.UserAgentApplication(msalConfig);

      if (client.getAccount() && !this.isLogged) {
        const response = await client.acquireTokenSilent(loginRequest);
        if (response.idToken.rawIdToken) {
          this.obtenerUsuarioDesdeCosmosYSetLogin({
            cuenta: response.account.accountIdentifier,
          });
        }
      }
    },
    async getAccountFromStorage() {
      const sessionObject = sessionStorage.getItem(SESSION_KEY.DATA_USER_CMR);

      if (!sessionObject) {
        this.$router.push("/");
        return;
      }
      const informacionUsuario: IUsuarioInformacion = getObjectFormFromCRM(
        JSON.parse(sessionObject),
        this.cargos,
        this.paisesResidenciaFiscal,
      );
      const usuario = {
        identityDocument: informacionUsuario.identityDocument,
        correo: informacionUsuario.emailAdress,
      };
      const usuarioLogeado: IUsuarioLogeadoPayload = {
        usuarioId: informacionUsuario.id,
        informacionUsuario,
        usuario,
        porcentajeRegistro: {
          informacionUsuario: 10,
          informacionPersonal: 0,
          datosLaborales: 0,
          informacionFinanciera: 0,
          cuentasBancarias: 0,
          avisosLegales: 0,
        },
      };
      this.setUsuarioLogeado(usuarioLogeado);
    },
  },
  watch: {
    informacionUsuario: function (newValue) {
      if (newValue?.companyJoined === "sab") {
        this.setSAB(true);
      } else if (newValue?.companyJoined === "certia") {
        this.setCertia(true);
      }
    },
  },
});
</script>
