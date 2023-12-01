<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="cabecera-panel">
      <div class="p-titulo-bold">
        Datos de usuario
      </div>
      <span v-if="esFormularioCompleto" class="icon-check1" />
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div>
        <v-btn
          v-if="!showBotonEnviarFormulario && porcentajeRegistroTotal < 100"
          id="editar_form_infoUsuario"
          icon
          :color="tema.colorSecundario"
          class="icon-edit"
          @click="editarFormulario"
        >
          Editar <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
          <div class="row-infoUsuario">
            <label
              for=""
              class="label-disabled"
            >Correo electrónico<span class="dat-ob">*</span>
            </label>
            <br>
            <v-text-field
              v-model="correo"
              disabled
              class="input-profile"
              solo
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              class="label-disabled"
            >Contraseña<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="contrasenia"
              disabled
              class="input-profile"
              solo
              type="password"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
            >Celular<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="celular"
              :disabled="!showBotonEnviarFormulario"
              :rules="[(v) => !!v || 'Ingresa un celular Ej: 999999999']"
              placeholder="Ingresar celular"
              maxlength="15"
              class="input-profile"
              required
              solo
              @keypress="validaSoloNumeros"
            />
          </div>
          <div v-if="showBotonEnviarFormulario" class="row-infoUsuario">
            <div
              v-if="mensajesError.msjErrorDatosUsuario.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorDatosUsuario.mensaje }}
            </div>
            <v-btn
              id="guardar_form_infoUsuario"
              :disabled="!valid || !!esLoadingFormulario"
              :loading="esLoadingFormulario"
              :color="tema.colorSecundario"
              height="65px"
              @click="onClickGuardarFormulario"
            >
              GUARDAR
            </v-btn>
          </div>
        </v-form>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script lang="ts">
import { mapActions } from 'vuex';
import FormularioMixin from '~/mixins/formulario.mixin';
import { IData, IMethods } from '~/types/InformacionUsuario.types';
import { getURLContactIBK } from '~/config';
import { getHeaderAPIM } from '~/utils/clienteFormulario';
import { APIM_ONBOARDING_KEY } from '~/config/enviroment.config';

export default FormularioMixin.extend<IData, IMethods, {}>({
  data() {
    return {
      valid: true,
      lazy: false,
      correo: '',
      celular: '',
      contrasenia: '',
      mensajesError: {
        msjErrorDatosUsuario: {
          mensaje:
            'Ocurrió un error al guardar tus datos, verifica el número de celular',
          mostrar: false,
        },
      },
    }
  },
  mounted() {
    this.obtenerDatosParaFormulario();
  },
  methods: {
    ...mapActions(['registrarPorcentajeInformacionUsuario']),
    onClickGuardarFormulario() {
      if ((this.$refs.form as any).validate()) {
        const data = {
          id: this.informacionUsuario.id,
          cellphone: this.celular,
          user_data_completed: true,
          date_user_information: new Date(),
        }
        this.esLoadingFormulario = true;
        this.$axios
          .post('/api/user-data', data)
          .then(() => {
            this.showBotonEnviarFormulario = true;
            this.showBotonEnviarFormulario = false;
            this.mensajesError.msjErrorDatosUsuario.mostrar = false;
            this.esLoadingFormulario = false;
            this.registrarPorcentajeInformacionUsuario();
            this.actualizarInformacionUsuario();
            this.clearPanelSelected();
          })
          .catch(() => {
            this.mensajesError.msjErrorDatosUsuario.mostrar = true;
            this.esLoadingFormulario = false;
          })
      }
    },
    actualizarInformacionUsuario() {
      this.actionUpdateInformacionUsuario({
          ...this.informacionUsuario,
          cellphone: this.celular
        });
    },
    obtenerDatosParaFormulario() {
      this.correo = this.informacionUsuario.emailAdress;
      this.contrasenia = this.informacionUsuario.emailAdress;
      this.showBotonEnviarFormulario = !this.informacionUsuario.user_data_completed;
      this.esFormularioCompleto = this.informacionUsuario.user_data_completed || false;
      if (this.informacionUsuario.cellphone) {
        // datos de usuario
        this.celular = this.informacionUsuario.cellphone;
      } else if (
        this.informacionUsuario.confirm_ibk_mail &&
        this.informacionUsuario.ibk_acceptance
      ) {
        this.getInformacionIBK(
          this.informacionUsuario.identityDocument.number,
          this.informacionUsuario.identityDocument.type
        )
      }

      if(this.esActualizarUsuario){
        this.registrarPorcentajeInformacionUsuario();
      }
    },
    async getInformacionIBK(doc, typeDoc) {
      await this.$axios
        .get(getURLContactIBK(doc,typeDoc),{
          headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
        })
        .then((res: any) => {
          const dataCel = res.data.phone?.[0]?.number;
          if(dataCel){
            this.celular = dataCel.substring(3, dataCel.length).trim();
          }
        });
    },
  },
})
</script>
