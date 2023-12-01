<template>
  <v-expansion-panel v-if="mostrarAnexoW8">
    <v-expansion-panel-header class="cabecera-panel">
      <div class="p-titulo-bold">
        Anexo W8
      </div>
      <span v-if="esFormularioCompleto" class="icon-check1" />
    </v-expansion-panel-header>
    <v-expansion-panel-content value="5">
      <div>
        <v-btn
          v-if="!showBotonEnviarFormulario && porcentajeRegistroTotal < 100"
          id="editar_form_w8"
          icon
          :color="tema.colorSecundario"
          class="icon-edit"
          @click="editarFormulario"
        >
          Editar <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-form ref="form7" v-model="valid7" :lazy-validation="lazy7">
          <div class="row-infoUsuario">
            <label
              for=""
              :class="showBotonEnviarFormulario ? '' : ' label-disabled'"
            >¿Ud. tiene RUC personal?<span class="dat-ob">*</span></label>
            <br>
            <v-radio-group
              v-model="consultaRucPersonal"
              row
              :disabled="!showBotonEnviarFormulario"
              :color="tema.colorSecundario"
              :rules="[(v) => !!v || 'Selecciona una opción']"
              required
              @change="iptRUCpersonal = ''"
            >
              <v-radio
                label="Si"
                value="si"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="No"
                value="no"
                :color="tema.colorSecundario"
              />
            </v-radio-group>
          </div>
          <div v-if="consultaRucPersonal === 'si'" class="row-infoUsuario">
            <label
              for=""
              :class="showBotonEnviarFormulario ? '' : ' label-disabled'"
            >RUC (personal)<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="iptRUCpersonal"
              :disabled="!showBotonEnviarFormulario"
              :rules="[(v) => !!v || 'Ingrese su RUC']"
              placeholder="Ingresar su número de RUC"
              class="input-profile"
              required
              solo
              maxlength="11"
              @keypress="validaSoloNumeros"
            />
          </div>
          <div v-if="showBotonEnviarFormulario" class="row-infoUsuario">
            <p
              v-if="mensajesError.msjErrorW8.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorW8.mensaje }}
            </p>
            <p
              v-if="mensajesError.msjErrorW8.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorW8.mensaje }}
            </p>
            <v-btn
              id="guardar_form_w8"
              :disabled="!valid7 || !!esLoadingFormulario"
              :loading="esLoadingFormulario"
              :color="tema.colorSecundario"
              height="65px"
              @click="onClickGuardarFormulario"
            >
              {{botonGuardarText}}
            </v-btn>
          </div>
          <div v-if="formGeneradorCompletado" class="error-msj">
            {{ errorFormGeneradorCompletado }}
          </div>
        </v-form>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script lang="ts">
import { mapState } from 'vuex';
import FormularioMixin from '~/mixins/formulario.mixin';
import { IComputed, IData, IMethods } from '~/types/AnexoW8.types';
import { IUsuarioInformacionAnexo8 } from '~/types/Usuario.types';

export default FormularioMixin.extend<IData, IMethods, IComputed>({
  data() {
    return {
      formGeneradorCompletado: false,
      errorFormGeneradorCompletado: 'Por favor guarde su información personal',
      btnEditarw8: false,
      valid7: true,
      lazy7: false,
      mensajesError: {
        msjErrorW8: {
          mensaje: 'Ocurrió un error al guardar los avisos legales',
          mostrar: false,
        },
      },
      consultaRucPersonal: '',
      mostrarRucPersonal: false,
      iptRUCpersonal: '',
    }
  },
  computed: {
    ...mapState([
      'mostrarAnexoW8',
      'informacionPersonalCompletado',
    ])
  },
  mounted() {
    this.obtenerDatosParaFormulario()
  },
  methods: {
    onClickGuardarFormulario() {
      if (this.informacionPersonalCompletado) {
        const dataAnexo = {
          id: this.informacionUsuario.id,
          annexed_w8: {
            has_personalRUC: this.consultaRucPersonal,
            personalRUC: this.iptRUCpersonal,
            date: new Date(),
            annexed_w8_completed: true,
          },
        }
        this.esLoadingFormulario = true;
        this.$axios
          .post('/api/annexed-w8', dataAnexo)
          .then(() => {
            this.showBotonEnviarFormulario = false;
            this.esFormularioCompleto = true;
            this.esLoadingFormulario = false;
            this.mensajesError.msjErrorW8.mostrar = false;
            this.$store.commit('setInformacionAnexo8Completado', true);
            this.actualizarInformacionUsuario();
            this.clearPanelSelected();
          })
          .catch((error) => {
            alert(error);
            this.mensajesError.msjErrorW8.mostrar = true;
            this.esLoadingFormulario = false;
          })
        this.formGeneradorCompletado = false
      } else {
        this.formGeneradorCompletado = true
      }
    },
    actualizarInformacionUsuario() {
      const annexed_w8: IUsuarioInformacionAnexo8 = !!this.informacionUsuario.annexed_w8?{...this.informacionUsuario.annexed_w8}: {};
        annexed_w8.has_personalRUC = this.consultaRucPersonal;
        annexed_w8.personalRUC = this.iptRUCpersonal;
        this.actionUpdateInformacionUsuario({...this.informacionUsuario, annexed_w8});
    },
    obtenerDatosParaFormulario() {
      this.showBotonEnviarFormulario = !this.informacionUsuario.annexed_w8?.annexed_w8_completed;
      if (this.informacionUsuario.annexed_w8) {        
        this.esFormularioCompleto = this.informacionUsuario.annexed_w8.annexed_w8_completed || false;

        this.consultaRucPersonal = this.informacionUsuario.annexed_w8.has_personalRUC || null;
        this.iptRUCpersonal = this.informacionUsuario.annexed_w8.personalRUC || null;
        this.$store.commit(
          'setInformacionAnexo8Completado',
          this.informacionUsuario.annexed_w8.annexed_w8_completed
        )
      }
    },
  },
})
</script>
