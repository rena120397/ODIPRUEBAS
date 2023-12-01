<template>
  <v-expansion-panel v-if="mostrarDatosConyugue">
    <v-expansion-panel-header class="cabecera-panel">
      <div class="p-titulo-bold">
        Datos del cónyuge o conviviente
      </div>
      <span v-if="esFormularioCompleto" class="icon-check1" />
    </v-expansion-panel-header>
    <v-expansion-panel-content value="3">
      <div>
        <v-btn
          v-if="!showBotonEnviarFormulario && porcentajeRegistroTotal < 100"
          id="editar_form_conyuge"
          icon
          :color="tema.colorSecundario"
          class="icon-edit"
          @click="editarFormulario"
        >
          Editar <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-form ref="form3" v-model="valid3" :lazy-validation="lazy3">
          <div class="row-infoUsuario">
            <label
              for=""
              :class="showBotonEnviarFormulario ? '' : ' label-disabled'"
            >
              Tipo de documento<span class="dat-ob">*</span> </label><br>
            <v-select
              v-model="tipoDocumento"
              :items="documentos"
              item-text="name"
              item-value="id"
              label="Ingrese el número de documento"
              class="input-profile"
              :disabled="!showBotonEnviarFormulario"
              solo
              :rules="[(v) => !!v || 'Seleccione un tipo documento']"
              required
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
            >Número de documento<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-if="tipoDocumento === '1'"
              v-model="dniConyugue"
              :disabled="!showBotonEnviarFormulario"
              :rules="[(v) => !!v || 'Ingrese el número de documento']"
              placeholder="Ingresar número de documento"
              maxlength="8"
              class="input-profile"
              required
              solo
              @keypress="validaSoloNumeros"
            />
            <v-text-field
              v-if="tipoDocumento === '2'"
              v-model="dniConyugue"
              :disabled="!showBotonEnviarFormulario"
              :rules="[(v) => !!v || 'Ingrese el número de documento']"
              placeholder="Ingresar número de documento"
              maxlength="11"
              class="input-profile"
              required
              solo
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
            >Nombres<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="nombreConyugue"
              :disabled="!showBotonEnviarFormulario"
              :rules="[(v) => !!v || 'Ingresa los nombres de su cónyugue']"
              placeholder="Ingresar nombres"
              class="input-profile"
              required
              solo
              @keypress="validarEspaciosEnBlanco"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
            >Apellido paterno<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="ApePatConyugue"
              :disabled="!showBotonEnviarFormulario"
              :rules="[(v) => !!v || 'Ingresa el apellido paterno']"
              placeholder="Ingresar apellido paterno"
              class="input-profile"
              required
              solo
              @keypress="validarEspaciosEnBlanco"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
            >Apellido materno<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="ApeMatConyugue"
              :disabled="!showBotonEnviarFormulario"
              :rules="[(v) => !!v || 'Ingresa el apellido materno']"
              placeholder="Ingresar apellido materno"
              class="input-profile"
              required
              solo
              @keypress="validarEspaciosEnBlanco"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
            >Fecha de nacimiento<span class="dat-ob">*</span></label>
            <br>
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="computedDateConyugueFormatted"
                  readonly
                  :class="
                    showBotonEnviarFormulario
                      ? 'input-profile'
                      : 'input-profile-disabled'
                  "
                  placeholder="Ingrese su fecha de nacimiento"
                  solo
                  v-bind="attrs"
                  required
                  :rules="[(v) => !!v || 'Ingrese su fecha de nacimiento']"
                  v-on="on"
                />
              </template>
              <v-date-picker
                ref="picker1"
                v-model="fecNacConyugue"
                scrollable
                required
                locale="es-PE"
                :max="new Date().toISOString().substr(0, 10)"
                min="1930-01-01"
                :disabled="!showBotonEnviarFormulario"
                @input="menu1 = false"
              />
            </v-menu>
          </div>
          <div class="row-infoUsuario-check">
            <label
              for=""
              :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
            >Régimen Conyugal<span class="dat-ob">*</span>
            </label>
            <v-radio-group
              v-model="regimenConyugal"
              row
              :disabled="!showBotonEnviarFormulario"
              :color="tema.colorSecundario"
              required
              :rules="[(v) => !!v || 'Selecciona una opción']"
            >
              <v-radio
                label="Régimen de ganancias"
                value="regimenGanancias"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Separación de Bienes"
                value="separacionBienes"
                :color="tema.colorSecundario"
              />
            </v-radio-group>
          </div>
          <div v-if="showBotonEnviarFormulario" class="row-infoUsuario">
            <p
              v-if="mensajesError.msjErrorDatosConyugue.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorDatosConyugue.mensaje }}
            </p>
            <p
              v-if="mensajesError.msjErrorDatosConyugue.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorDatosConyugue.mensaje }}
            </p>
            <v-btn
              id="guardar_form_conyuge"
              :disabled="!valid3 || esLoadingFormulario"
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
import { IComputed, IData, IMethods } from '~/types/InformacionConyuge.types';
import { IUsuarioInformacionConyugue } from '~/types/Usuario.types';
import { getURLContactIBK } from '~/config';
import { getHeaderAPIM } from '~/utils/clienteFormulario';
import { APIM_ONBOARDING_KEY } from '~/config/enviroment.config';

export default FormularioMixin.extend<IData, IMethods, IComputed>({
  data() {
    return {
     
      formGeneradorCompletado: false,
      errorFormGeneradorCompletado: 'Por favor guarde su información personal',
      valid3: true,
      lazy3: false,
      menu1: false,
      dniConyugue: '',
      tipoDocumento: '1',
      ApePatConyugue: '',
      ApeMatConyugue: '',
      fecNacConyugue: new Date().toISOString().substr(0, 10),
      nombreConyugue: '',
      documentos: [
        { id: '1', name: 'DNI' },
        { id: '2', name: 'CE' },
      ],
      mensajesError: {
        msjErrorDatosConyugue: {
          mensaje: 'Ocurrió un error al guardar la información de su cónyugue',
          mostrar: false,
        },
      },
      regimenConyugal: '',
    }
  },
  computed: {
    ...mapState([
      'mostrarDatosConyugue',
      'informacionPersonalCompletado',
    ]),
    computedDateConyugueFormatted() {
      return this.formatDate(this.fecNacConyugue)
    },
  },
  watch: {
    menu1(val) {
      val && setTimeout(() => ((this.$refs.picker1 as any).activePicker = 'YEAR'))
    },
  },
  mounted() {
    this.obtenerDatosParaFormulario()
  },
  methods: {
    onClickGuardarFormulario() {
      if (this.informacionPersonalCompletado) {
        this.esLoadingFormulario = true;
        const dataDatosUsuario = {
          id: this.informacionUsuario.id,
          couple_information: {
            type_document: this.tipoDocumento,
            couple_document: this.dniConyugue,
            couple_names: this.nombreConyugue,
            couple_first_last_name: this.ApePatConyugue,
            couple_second_last_name: this.ApeMatConyugue,
            couple_birthdate: this.fecNacConyugue,
            couple_regime_status: this.regimenConyugal,
            date: new Date(),
            couple_information_completed: true,
          },
        }
        this.$axios
          .post('/api/couple-information', dataDatosUsuario)
          .then(() => {
            this.showBotonEnviarFormulario = false;
            this.esFormularioCompleto = true;
            this.esLoadingFormulario = false;
            this.$store.commit('setInformacionConyugeCompletado', true);
            this.mensajesError.msjErrorDatosConyugue.mostrar = false;
            this.actualizarInformacionUsuario();
            this.clearPanelSelected();
          })
          .catch((error) => {
            alert(error);
            this.mensajesError.msjErrorDatosConyugue.mostrar = true;
            this.esLoadingFormulario = false;
          })
        this.formGeneradorCompletado = false
      } else {
        this.formGeneradorCompletado = true
      }
    },
    actualizarInformacionUsuario() {
      const couple_information:IUsuarioInformacionConyugue  = !!this.informacionUsuario.couple_information ? {...this.informacionUsuario.couple_information} :{};
      couple_information.type_document = this.tipoDocumento;
      couple_information.couple_document = this.dniConyugue;
      couple_information.couple_names = this.nombreConyugue;
      couple_information.couple_first_last_name = this.ApePatConyugue;
      couple_information.couple_second_last_name = this.ApeMatConyugue;
      couple_information.couple_birthdate = this.fecNacConyugue;
      couple_information.couple_regime_status = this.regimenConyugal;

      this.actionUpdateInformacionUsuario({...this.informacionUsuario, couple_information});
    },
    obtenerDatosParaFormulario() {
      this.showBotonEnviarFormulario = !this.informacionUsuario.couple_information?.couple_information_completed;
      if (this.informacionUsuario.couple_information) {
        this.esFormularioCompleto = this.informacionUsuario.couple_information.couple_information_completed || false;

        this.tipoDocumento = this.informacionUsuario.couple_information.type_document || '';
        this.dniConyugue = this.informacionUsuario.couple_information.couple_document || '';
        this.nombreConyugue = this.informacionUsuario.couple_information.couple_names || '';
        this.ApePatConyugue = this.informacionUsuario.couple_information.couple_first_last_name || '';
        this.ApeMatConyugue = this.informacionUsuario.couple_information.couple_second_last_name || '';
        this.fecNacConyugue = this.informacionUsuario.couple_information.couple_birthdate || '';
        this.regimenConyugal = this.informacionUsuario.couple_information.couple_regime_status || '';
        this.$store.commit(
          'setInformacionConyugeCompletado',
          this.informacionUsuario.couple_information
            .couple_information_completed
        )
      } else if (
        this.informacionUsuario.confirm_ibk_mail &&
        this.informacionUsuario.ibk_acceptance
      ) {
        this.getInformacionIBK(
          this.informacionUsuario.identityDocument.number,
          this.informacionUsuario.identityDocument.type
        )
      }
    },
    async getInformacionIBK(doc, typeDoc) {
      await this.$axios
        .get(getURLContactIBK(doc,typeDoc),{
          headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
        })
        .then((res) => {
          const spouse = res.data.spouse

          this.tipoDocumento = spouse.identityDocument.type === 'CE' ? '2' : '1'
          this.dniConyugue = spouse.identityDocument.number
          this.nombreConyugue = spouse.names
          this.ApePatConyugue = ''
          this.ApeMatConyugue = ''
          this.fecNacConyugue = spouse.birthDate
        })
    },
  },
})
</script>
