<template>
  <div v-if="isLogged">
    <PerfilUsuario>
      <InformacionUsuario ref="infUsu" />
      <InformacionPersonal ref="infPer" />
      <InformacionConyuge />
      <AnexoW9 />
      <AnexoW8 />
      <DatosLaborales />
      <InformacionFinanciera />
      <AnexoPEP />
      <CuentasBancarias />
      <AvisosLegales 
        @send-api-cumplimiento="handleApiCumplimientoResponse"
      >
          <template v-slot:title>
            <h2>¡Felicitaciones ha completado su registro como cliente de {{nombreEmpresa}}!</h2>
            <p>Su <strong>Perfil</strong> está a un <strong>100%</strong></p>
          </template>
          <template v-slot:emailMessage>
            <h3>Le enviaremos un correo electrónico para terminar el proceso y pueda empezar a invertir con nosotros.</h3>
          </template>
        </AvisosLegales>
    </PerfilUsuario>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { formatDataActualizarCRM, getParaAltaDatos } from '~/utils/contactoCRM';
import { IHandleSendDataUsuarioCRM } from "~/types/PerfilUsuario.types";

export default Vue.extend({
  layout: 'usuario',
  computed: {
    ...mapGetters(['isLogged', 'nombreEmpresa']),
  },
  methods: {
    handleApiCumplimientoResponse(dataCumplimiento: IHandleSendDataUsuarioCRM): void {

      const {idContactoCRMBD, idInfoAdicionalCRMBD, usuarioCRMUpdateRequest, tramaCRM, usuarioCRMRequest} = dataCumplimiento;
      
      if(idContactoCRMBD !== '' && idInfoAdicionalCRMBD !== ''){
        
        const newDatCRM = formatDataActualizarCRM(usuarioCRMUpdateRequest, idContactoCRMBD, idInfoAdicionalCRMBD, tramaCRM);
        this.$store.dispatch('contactoCRM/actualizarContactoCRM', { data: newDatCRM });
      }else {
        usuarioCRMRequest.rs_trama = JSON.stringify(tramaCRM).replace(
          '&quot',
          ''
        )
        this.$store.dispatch('contactoCRM/crearContactoCRM', { data: getParaAltaDatos(usuarioCRMRequest) });
      }
    }
  },
})
</script>
