<template>
  <div>
    <h3>Update Perfil</h3>
    <hr />
    <div v-if="isLogged">
      <PerfilUsuario>
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
            <h2>¡Felicitaciones, ha completado su proceso de actualización de ficha de {{nombreEmpresa}}!</h2>
          </template>
          <template v-slot:emailMessage>
            <h3>Le enviaremos un correo electrónico para terminar el proceso y pueda continuar invirtiendo con nosotros.</h3>
          </template>
        </AvisosLegales>
      </PerfilUsuario>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { formatDataActualizarCRM } from '~/utils/contactoCRM';
import { IHandleSendDataUsuarioCRM } from "~/types/PerfilUsuario.types";

export default Vue.extend({
  layout: 'usuario',
  computed: {
    ...mapGetters(['isLogged', 'nombreEmpresa']),
  },
  methods: {
    handleApiCumplimientoResponse(dataCumplimiento: IHandleSendDataUsuarioCRM): void {
       const {idContactoCRMBD, idInfoAdicionalCRMBD, usuarioCRMUpdateRequest, tramaCRM} = dataCumplimiento;
       
      if(idContactoCRMBD !== '' && idInfoAdicionalCRMBD !== ''){
        
        const newDatCRM = formatDataActualizarCRM(usuarioCRMUpdateRequest, idContactoCRMBD, idInfoAdicionalCRMBD, tramaCRM);
        this.$store.dispatch('contactoCRM/actualizarContactoCRM', { data: newDatCRM });
      }else {
        alert('El usuario no tiene un Id asignado');
      }
    }
  },
})
</script>

<style>
.row-infoUsuario .v-btn {
  color: #ffffff !important;
  font-weight: 600;
}
.row-infoUsuario {
  margin-bottom: 24px;
}
</style>
