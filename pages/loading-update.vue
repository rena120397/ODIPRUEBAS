<template>
  <div>
    <div v-if="!showErrors">
      <v-overlay>
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        />
      </v-overlay>
    </div>
    <div v-if="!!showErrors">
    <div class="h-100 text-center">
      <div class="d-flex align-center justify-center mt-10">
        <div>
          <img src="~/assets/img/error2.svg" alt="error">
        </div>
      </div>
      <h3>
        ¡Ups! Ocurrio un inconveniente al cargar la data de tu ficha de cliente. <br/> Por favor contáctate con tu asesor para que pueda ayudarte.
      </h3>
      <h4 class="mt-10">Códigos de consulta:</h4>
      <v-card class="cod-errors-container d-flex justify-center mx-auto" elevation="0" max-width="100">
         <v-list-item 
            v-for="(error, i) in errors" 
            :key="i">{{error}}</v-list-item>
      </v-card>
      <br/>
      <br/>
      <NuxtLink to="/">
        Volver al inicio
      </NuxtLink>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { 
  APIM_ONBOARDING_KEY,
  CODIGO_DUPLICADO_CRM, 
  CODIGO_NO_EXISTE_CRM, 
  CODIGO_NO_EXISTE_COSMOS, 
  CODIGO_DUPLICADO_COSMOS,
  getCrmContactFindUrl,
  OBTENER_USUARIO_QUERY,
  SESSION_KEY, 
} from '~/config';
import { getCookie } from '~/utils/cookies';
import { getHeaderAPIM } from '~/utils/clienteFormulario';
import Vue from 'vue';

export default Vue.extend({
  data() {
    return { 
      errors: [],
      showErrors: false,
    }
  },
  created() {
    if (process.browser) {
      this.init();
    }
  },
  methods: {
    async init() {
      const stringJson = getCookie('client-request');
      try {
        const objectJson = JSON.parse(stringJson);
        if (!('tipo_doc' in objectJson && 'num_doc' in objectJson && 'createdate' in objectJson)) {
          throw new Error("No tiene el formato correcto");
        }
        let { tipo_doc, num_doc } = objectJson;
        const usuarioCRM = await this.getUsuarioCRM(tipo_doc, num_doc);
        const account = await this.getAccountIdentifier(tipo_doc, num_doc);

        const oJsonCli = this.getValueToSendClient(usuarioCRM, account);

        if(!!oJsonCli.codigosError){
          this.showErrors = true;
          this.errors = oJsonCli.codigosError;
          return;
        }
        
        sessionStorage.setItem(SESSION_KEY.ACCOUNT, oJsonCli.accountIdentifier);
        sessionStorage.setItem(SESSION_KEY.DATA_USER_CMR, JSON.stringify(oJsonCli));
        

        this.$router.push('/perfil-usuario-update');
      } catch (error) {
        this.$router.push('/');
      }
    }, 
    async getAccountIdentifier(typeDoc: string, nroDoc: string){
      const response = await this.$axios({
        data: {
          dni: nroDoc,
          tipo: typeDoc
        },
        method: 'POST',
        url: `/api/get-account-identifier`
      });
      return response.data;
    },
    async getUsuarioCRM(typeDoc: string, nroDoc: string) {
      const response = await this.$axios.get(getCrmContactFindUrl(typeDoc,nroDoc),{
        params: {
          select: OBTENER_USUARIO_QUERY.select,
          expand: OBTENER_USUARIO_QUERY.expand,
        },
        headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
      });
      return response.data;
    },
    getValueToSendClient(usuarioCRM: any, account: any){
      const errors: Array<any> = [];

      this.checkExistErrorInCRM(usuarioCRM, errors);
      this.checkExistErrorInCosmos(account, errors);


      if(!!errors?.length){
        return {
          codigosError: errors
        }
      }
      return {
        ...usuarioCRM[0],
        accountIdentifier: account[0]?.accountIdentifier,
        id: account[0]?.id,
        is_observed_pep: account[0]?.is_observed_pep,
      };

    },

    checkExistErrorInCRM(usuarioCRM: any, errors: any){
      if (!usuarioCRM?.length) {
        errors.push(CODIGO_NO_EXISTE_CRM);

      } else if (usuarioCRM?.length > 1) {
        errors.push(CODIGO_DUPLICADO_CRM);
      }
    },

    checkExistErrorInCosmos(account: any, errors: any){
      if (!account?.length) {
        errors.push(CODIGO_NO_EXISTE_COSMOS);

      } else if (account?.length > 1) {
        errors.push(CODIGO_DUPLICADO_COSMOS);
      }
    }
  },
  
});
</script>
