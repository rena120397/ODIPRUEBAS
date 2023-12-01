<template>
  <v-expansion-panel class="p-3">
    <v-expansion-panel-header class="cabecera-panel">
      <div class="p-titulo-bold">
        Información personal
      </div>
      <span v-if="esFormularioCompleto" class="icon-check1" />
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div>
        <v-btn
          v-if="!showBotonEnviarFormulario && porcentajeRegistroTotal < 100"
          id="editar_form_infoPersonal"
          icon
          :color="tema.colorSecundario"
          class="icon-edit"
          @click="editarFormulario"
        >
          Editar <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-form ref="form2" v-model="valid2" :lazy-validation="lazy2">
          <div v-if="esActualizarUsuario" class="row-infoUsuario">
            <label for="">Correo electrónico<span class="dat-ob">*</span></label><br>
            <v-text-field
              v-model="email"
              class="input-profile"
              :rules="emailRules"
              placeholder="Ingresar un correo electrónico"
              required
              solo
              :disabled="!(showBotonEnviarFormulario)"
            />
          </div>

          <div v-if="esActualizarUsuario" class="row-infoUsuario">
            <label for="">Celular<span class="dat-ob">*</span></label><br>
            <v-text-field
              v-model="celular"
              class="input-profile"
              :rules="[(v) => !!v || 'Ingresa un celular Ej: 999999999']"
              placeholder="Ingresar celular"
              maxlength="15"
              required
              solo
              :disabled="!(showBotonEnviarFormulario)"
              @keypress="validaSoloNumeros"
            />
          </div>

          <div class="row-infoUsuario">
            <label
              for=""
              :class="
                showBotonEnviarFormulario ? '' : ' label-disabled'
              "
            >
              Tipo de documento<span class="dat-ob">*</span></label><br>
            <v-select
              v-model="tipoDocumento"
              :items="documentos"
              item-text="name"
              item-value="id"
              label="Seleccione un tipo documento"
              class="input-profile"
              disabled
              solo
              :rules="[(v) => !!v || 'Seleccione un tipo documento']"
              required
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="
                showBotonEnviarFormulario ? '' : ' label-disabled'
              "
            >Número de documento<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="dni"
              disabled
              class="input-profile"
              solo
            />
          </div>

          <div class="row-infoUsuario">
            <label
              for=""
              :class="
                showBotonEnviarFormulario ? '' : ' label-disabled'
              "
            >Nombres<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="nombre"
              :rules="[(v) => !!v || 'Ingrese su nombre']"
              required
              disabled
              class="input-profile"
              solo
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="
                showBotonEnviarFormulario ? '' : ' label-disabled'
              "
            >Apellido paterno<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="apPat"
              :rules="[(v) => !!v || 'Ingrese su apellido paterno']"
              required
              disabled
              class="input-profile"
              solo
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="
                showBotonEnviarFormulario ? '' : ' label-disabled'
              "
            >Apellido materno<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="apMat"
              :rules="[(v) => !!v || 'Ingrese su apellido materno']"
              required
              disabled
              class="input-profile"
              solo
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="
                showBotonEnviarFormulario ? '' : ' label-disabled'
              "
            >Fecha de nacimiento<span class="dat-ob">*</span></label>
            <br>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="computedDateFormatted"
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
                ref="picker"
                v-model="fecNacimiento"
                scrollable
                required
                locale="es-PE"
                :max="new Date().toISOString().substr(0, 10)"
                min="1930-01-01"
                :disabled="!(showBotonEnviarFormulario)"
                @input="menu = false"
              />
            </v-menu>
          </div>
          <div class="row-infoUsuario-check">
            <label
              for=""
              :class="
                showBotonEnviarFormulario ? '' : ' label-disabled'
              "
            >Sexo<span class="dat-ob">*</span></label>
            <v-radio-group
              v-model="sexo"
              row
              :color="tema.colorSecundario"
              :disabled="!(showBotonEnviarFormulario)"
              :rules="[(v) => !!v || 'Selecciona una opción']"
              required
            >
              <v-radio
                label="Masculino"
                value="masculino"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Femenino"
                value="femenino"
                :color="tema.colorSecundario"
              />
            </v-radio-group>
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="
                showBotonEnviarFormulario ? '' : ' label-disabled'
              "
            >Lugar de nacimiento<span class="dat-ob">*</span></label>
            <br>
            <v-autocomplete
              v-model="lugarNacimiento"
              :items="paises"
              item-text="rs_name"
              item-value="rs_paisid"
              label="País"
              class="input-profile"
              :disabled="!(showBotonEnviarFormulario)"
              solo
              :rules="[(v) => !!v || 'Seleccione un país']"
              required
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="
                showBotonEnviarFormulario ? '' : ' label-disabled'
              "
            >Nacionalidad<span class="dat-ob">*</span></label>
            <br>
            <v-autocomplete
              v-model="nacionalidad"
              :items="nacionalidades"
              item-text="rs_name"
              item-value="rs_nacionalidadid"
              label="País"
              class="input-profile"
              :disabled="!(showBotonEnviarFormulario)"
              solo
              :rules="[(v) => !!v || 'Seleccione una nacionalidad']"
              required
            />
          </div>

          <div class="row-infoUsuario">
            <label
              for=""
              :class="
                showBotonEnviarFormulario  ? '' : ' label-disabled'
              "
            >
              País de domicilio<span class="dat-ob">*</span> </label><br>
            <v-autocomplete
              v-model="direccionPais"
              :items="paises"
              item-text="rs_name"
              item-value="rs_paisid"
              label="País"
              class="input-profile"
              :disabled="!(showBotonEnviarFormulario)"
              solo
              :rules="[(v) => !!v || 'Seleccione un país']"
              required
              @change="limpiarUbigeo"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="
                showBotonEnviarFormulario ? '' : ' label-disabled'
              "
            >
              Departamento de domicilio<span
                v-if="esUbigeoRequerido"
                class="dat-ob"
              >*</span> </label><br>
            <v-autocomplete
              v-model="direccionDepartamento"
              :items="departamentosIP"
              item-text="rs_name"
              item-value="rs_departamentoid"
              label="Departamento"
              class="input-profile"
              :disabled="!(showBotonEnviarFormulario)"
              solo
              :required="esUbigeoRequerido"
              :rules="ubigeoRules"
              @change="seleccionarProvincia"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="
                showBotonEnviarFormulario ? '' : ' label-disabled'
              "
            >
              Provincia<span
                v-if="esUbigeoRequerido"
                class="dat-ob"
              >*</span> </label><br>
            <v-autocomplete
              v-model="direccionProvincia"
              :items="provinciasIP"
              item-text="rs_name"
              item-value="rs_provinciaid"
              label="Provincia"
              class="input-profile"
              :disabled="!(showBotonEnviarFormulario)"
              :required="esUbigeoRequerido"
              :rules="ubigeoRules"
              solo
              @change="seleccionarDistrito"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="
                showBotonEnviarFormulario ? '' : ' label-disabled'
              "
            >
              Distrito de Dirección de Domicilio<span
                v-if="esUbigeoRequerido"
                class="dat-ob"
              >*</span> </label><br>
            <v-autocomplete
              v-model="direccionDistrito"
              :items="distritosIP"
              :disabled="!(showBotonEnviarFormulario)"
              :required="esUbigeoRequerido"
              :rules="ubigeoRules"
              item-text="rs_name"
              item-value="rs_distritoid"
              class="input-profile"
              label="Distrito"
              solo
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="
                showBotonEnviarFormulario ? '' : ' label-disabled'
              "
            >Dirección de domicilio<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="domicilio"
              :disabled="!(showBotonEnviarFormulario)"
              :rules="[(v) => !!v || 'Ingrese su dirección']"
              placeholder="Ingresar dirección"
              class="input-profile"
              required
              solo
              @keypress="validarEspaciosEnBlanco"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="
                showBotonEnviarFormulario ? '' : ' label-disabled'
              "
            >Teléfono fijo</label>
            <br>
            <v-text-field
              v-model="telefonoFijo"
              :disabled="!(showBotonEnviarFormulario)"
              placeholder="Ingresar su número de teléfono fijo"
              class="input-profile"
              maxlength="15"
              solo
              @keypress="validaSoloNumeros"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="
                showBotonEnviarFormulario ? '' : 'label-disabled'
              "
            >Profesión/Ocupación<span class="dat-ob">*</span></label>
            <br>
            <v-autocomplete
              v-model="cargo"
              :items="listaProfesiones"
              item-text="rs_name"
              item-value="rs_id"
              :disabled="!(showBotonEnviarFormulario)"
              :rules="[(v) => !!v || 'Ingresa un cargo']"
              placeholder="Ingresar cargo"
              class="input-profile"
              solo
            />
          </div>
          <div class="row-infoUsuario-check">
            <label
              for=""
              :class="
                showBotonEnviarFormulario? '' : ' label-disabled'
              "
            >Estado civil<span class="dat-ob">*</span></label>
            <v-radio-group
              v-model="estadoCivil"
              row
              :disabled="!(showBotonEnviarFormulario)"
              :color="tema.colorSecundario"
              :rules="[(v) => !!v || 'Selecciona una opción']"
              required
              @change="seleccionarEstadoCivil"
            >
              <v-radio
                label="Soltero"
                value="soltero"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Conviviente"
                value="conviviente"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Casado"
                value="casado"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Divorciado"
                value="divorciado"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Viudo"
                value="viudo"
                :color="tema.colorSecundario"
              />
            </v-radio-group>
          </div>
          <div class="row-infoUsuario-check">
            <label
              for=""
              :class="
                showBotonEnviarFormulario ? '' : ' label-disabled'
              "
            >¿Es ciudadano o residente americano?<span
              class="dat-ob"
            >*</span></label>
            <br>
            <v-radio-group
              v-model="ciudadanoAmericano"
              row
              :disabled="!(showBotonEnviarFormulario)"
              :color="tema.colorSecundario"
              :rules="[(v) => !!v || 'Selecciona una opción']"
              required
              @change="seleccionarCiudadanoAmericano"
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
          <v-container fluid class="mt-30">
            <v-row>
              <v-col cols="12" md="4">
                <div class="row-infoUsuario">
                  <label for="" class="">
                    País de residencia fiscal<span class="dat-ob">*</span>
                    <v-tooltip bottom color="text-white">
                      <template #activator="{ on, attrs }">
                        <span
                          v-bind="attrs"
                          class="icon-pregunta txt-color__principal"
                          v-on="on"
                        />
                      </template>
                      <span>
                        Es el país en donde realiza el pago de tus impuestos.
                      </span>
                    </v-tooltip>
                  </label>
                  <br>
                  <v-autocomplete
                    v-model="paisresidenciafiscal0"
                    :items="paisesResidenciaFiscal"
                    item-text="rs_name"
                    item-value="rs_id"
                    label="País"
                    class="input-profile"
                    :disabled="!(showBotonEnviarFormulario)"
                    solo
                    :rules="[(v) => !!v || 'Seleccione un país']"
                    required
                    @change="tin_rut0 = ''"
                  />
                </div>
                <div
                  v-if="paisresidenciafiscal0 !== '01'"
                  class="row-infoUsuario"
                >
                  <label
                    for=""
                    :class="
                      showBotonEnviarFormulario
                        ? ''
                        : ' label-disabled'
                    "
                  >
                    NIT / RUT / TIN / otro<span class="dat-ob">*</span>
                    <v-tooltip bottom color="text-white">
                      <template #activator="{ on, attrs }">
                        <span
                          v-bind="attrs"
                          class="icon-pregunta txt-color__principal"
                          v-on="on"
                        />
                      </template>
                      <span> Ingresar su código </span>
                    </v-tooltip>
                  </label>
                  <br>
                  <v-text-field
                    v-model="tin_rut0"
                    :disabled="!(showBotonEnviarFormulario)"
                    :rules="[(v) => !!v || 'Ingresa un valor']"
                    placeholder="Ingresar NIT / RUT / TIN / otro"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
              <v-col v-if="cantidadTin > 1" cols="12" md="4">
                <div class="row-infoUsuario">
                  <label for="" class="">
                    País de residencia fiscal<span class="dat-ob">*</span>
                  </label>
                  <br>
                  <v-autocomplete
                    v-model="paisresidenciafiscal1"
                    :items="paisesResidenciaFiscal"
                    item-text="rs_name"
                    item-value="rs_id"
                    label="País"
                    class="input-profile"
                    :disabled="!(showBotonEnviarFormulario)"
                    solo
                    :rules="[(v) => !!v || 'Seleccione un país']"
                    required
                    @change="tin_rut1 = ''"
                  />
                </div>
                <div
                  v-if="paisresidenciafiscal1 !== '01'"
                  class="row-infoUsuario"
                >
                  <label
                    for=""
                    :class="
                      showBotonEnviarFormulario
                        ? ''
                        : ' label-disabled'
                    "
                  >
                    NIT / RUT / TIN / otro<span class="dat-ob">*</span>
                  </label>
                  <br>
                  <v-text-field
                    v-model="tin_rut1"
                    :disabled="!(showBotonEnviarFormulario)"
                    :rules="[(v) => !!v || 'Ingresa un valor']"
                    placeholder="Ingresar NIT / RUT / TIN / otro"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
              <v-col v-if="cantidadTin > 2" cols="12" md="4">
                <div class="row-infoUsuario">
                  <label for="" class="">
                    País de residencia fiscal<span class="dat-ob">*</span>
                  </label>
                  <br>
                  <v-autocomplete
                    v-model="paisresidenciafiscal2"
                    :items="paisesResidenciaFiscal"
                    item-text="rs_name"
                    item-value="rs_id"
                    label="País"
                    class="input-profile"
                    :disabled="!(showBotonEnviarFormulario)"
                    solo
                    :rules="[(v) => !!v || 'Seleccione un país']"
                    required
                    @change="tin_rut2 = ''"
                  />
                </div>
                <div
                  v-if="paisresidenciafiscal2 !== '01'"
                  class="row-infoUsuario"
                >
                  <label
                    for=""
                    :class="
                      showBotonEnviarFormulario
                        ? ''
                        : ' label-disabled'
                    "
                  >
                    NIT / RUT / TIN / otro<span class="dat-ob">*</span>
                  </label>
                  <br>
                  <v-text-field
                    v-model="tin_rut2"
                    :disabled="!(showBotonEnviarFormulario)"
                    :rules="[(v) => !!v || 'Ingresa un valor']"
                    placeholder="Ingresar NIT / RUT / TIN / otro"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
            </v-row>
          </v-container>

          <v-btn
            v-if="
              cantidadTin < 3 &&
                !showBotonEnviarFormulario &&
                paisresidenciafiscal0 !== '01'
            "
            class="btn-profile mb-3"
            height="65px"
            @click="cantidadTin++"
          >
            AGREGAR RESIDENCIA FISCAL
          </v-btn>
          <div v-if="showBotonEnviarFormulario" class="row-infoUsuario">
            <p
              v-if="mensajesError.msjErrorInformacionPerso.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorInformacionPerso.mensaje }}
            </p>
            <p
              v-if="mensajesError.msjErrorPais.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorPais.mensaje }}
            </p>
            <p
              v-if="mensajesError.msjErrorImagen.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorImagen.mensaje }}
            </p>
            <p
              v-if="mensajesError.msjErrorInformacionPerso.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorInformacionPerso.mensaje }}
            </p>
            <v-btn
              id="guardar_form_infoPersonal"
              class="mk_btnguardar"
              :disabled="!valid2 || !!esLoadingFormulario"
              :loading="esLoadingFormulario"
              :color="tema.colorSecundario"
              height="65px"
              @click="onClickGuardarFormulario"
            >
              {{botonGuardarText}}
            </v-btn>
          </div>
        </v-form>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script lang="ts">
import { mapActions, mapGetters, mapState } from 'vuex';
import FormularioMixin from '~/mixins/formulario.mixin';
import { IUsuarioInformacionPersonalInformacion } from '~/types';
import { IComputed, IData, IMethods } from '~/types/InformacionPersonal.types';
import { SELECT_REQUIRED } from '~/validations/messages';
import { EMAIL_RULES } from '~/validations/rules';
import { getURLContactIBK } from '~/config';
import { getHeaderAPIM } from '~/utils/clienteFormulario';
import { APIM_ONBOARDING_KEY } from '~/config/enviroment.config';

export default FormularioMixin.extend<IData, IMethods, IComputed>({
  data() {
    return {
      emailRules: EMAIL_RULES,
      valid2: true,
      lazy2: false,
      sexo: '',
      estadoCivil: '',
      nombre: '',
      dni: '',
      apPat: '',
      apMat: '',
      fecNacimiento: '',
      domicilio: '',
      lugarNacimiento: `${process.env.paisEmpresa}`,
      documentos: [
        { id: '1', name: 'DNI' },
        { id: '2', name: 'CE' },
      ],
      mensajesError: {
        msjErrorInformacionPerso: {
          mensaje: 'Ocurrió un error al guardar su información personal',
          mostrar: false,
        },
        msjErrorPais: {
          mensaje: 'Por favor complete la información obligatoria (*)',
          mostrar: false,
        },
        msjErrorImagen: {
          mensaje: 'Por favor adjunte una imagen de su Documento de identidad',
          mostrar: false,
        },
      },
      ciudadanoAmericano: '',
      menu: false,
      nacionalidad: `${process.env.nacionalidad}`,
      direccionProvincia: '',
      direccionDistrito: '',
      tipoDocumento: '',
      email: '',
      celular: '',
      direccionPais: '',
      direccionDepartamento: '',
      ceimage: '',
      telefonoFijo: '',
      paisresidenciafiscal0: '01',
      tin_rut0: '',
      paisresidenciafiscal1: '',
      tin_rut1: '',
      paisresidenciafiscal2: '',
      tin_rut2: '',
      cantidadTin: 1,
      departamentosIP: [],
      provinciasIP: [],
      distritosIP: [],
      imagenvalor: '',
      cargo: '',
      listaProfesiones: [],
      paisPeru: `${process.env.paisEmpresa}`,
    }
  },
  computed: {
    ...mapState([
      'datosPersonalesEquifax',
    ]),
    ...mapGetters({
      paises: 'general/getPaises',
      nacionalidades: 'general/getNacionalidades',
      departamentos: 'general/getDepartamentos',
      provincias: 'general/getProvincias',
      distritos: 'general/getDistritos',
      cargos: 'general/getCargos',
      paisesResidenciaFiscal: 'general/getPaisesResidenciaFiscal',
      porcentajeRegistroTotal: 'porcentajeRegistroTotal'
    }),
    computedDateFormatted() {
      return this.formatDate(this.fecNacimiento);
    },
    esUbigeoRequerido() {
      return this.direccionPais === this.paisPeru;
    },
    ubigeoRules(){      
      const rules: Array<(value: string) => boolean | string> = [];
      if(this.esUbigeoRequerido){
        rules.push((v) => !!v || SELECT_REQUIRED);
      }
      return rules;
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => ((this.$refs.picker as any).activePicker = 'YEAR'))
    },
  },
  created(){
    this.getProfesiones();
  },
  mounted() {
    if (this.informacionUsuario?.equifax_values) {
      this.nombre = this.informacionUsuario.equifax_values.firstName
      this.apMat = this.informacionUsuario.equifax_values.motherLastName
      this.apPat = this.informacionUsuario.equifax_values.lastName
    } else {
      this.nombre = this.datosPersonalesEquifax.name
      this.apPat = this.datosPersonalesEquifax.surname
      this.apMat = this.datosPersonalesEquifax.lastName
    }

    this.obtenerDatosParaFormulario()
  },
  methods: {
    ...mapActions([
      'registrarPorcentajeInformacionPersonal',
    ]),
    onClickGuardarFormulario(){
     if ((this.$refs?.form2 as any)?.validate()) {
        if (
          this.direccionPais === `${process.env.paisEmpresa}` &&
          (this.direccionDepartamento === '' ||
            this.direccionProvincia === '' ||
            this.direccionDistrito === '')
        ) {
          this.mensajesError.msjErrorPais.mostrar = true
        } else {
          this.esLoadingFormulario = true;
          this.postInformacionPersonal();
          this.mensajesError.msjErrorPais.mostrar = false;
        }
      }
    },
    guardarImagen(file: any) {
      this.mensajesError.msjErrorImagen.mostrar = false
      const reader = new FileReader()
      reader.onload = (event) => {
        this.imagenvalor = (event.target as any).result
      }
      reader.readAsDataURL(file)
    },
    postInformacionPersonal() {
      const departamentoCRM =
        this.direccionDepartamento !== ''
          ? this.computedDepartamento(this.direccionDepartamento)
          : ''

      const provinciaCRM =
        this.direccionProvincia !== ''
          ? this.computedProvincia(this.direccionProvincia)
          : ''

      const distritoCRM =
        this.direccionDistrito !== ''
          ? this.computedDistrito(this.direccionDistrito)
          : ''

      const esCiudadanoAmericano = this.ciudadanoAmericano === 'si'
      const lspotencial = localStorage.getItem('potencial')
      const potencial = lspotencial || ''
      const lsProductoInteres = localStorage.getItem('producto')
      const productoInteres = lsProductoInteres || ''
      const lscanal = localStorage.getItem('canal')
      const canal = lscanal || ''
      const dataDatosUsuario = {
        id: this.informacionUsuario.id,
        personal_information: {
          firstName: this.nombre,
          lastName: this.apPat,
          motherLastName: this.apMat,
          nationality: this.nacionalidad,
          birthdate: this.fecNacimiento,
          gender: this.sexo,
          birthplace: this.lugarNacimiento,
          address_country: this.direccionPais,
          address_state: this.direccionDepartamento,
          address_province: this.direccionProvincia,
          address_district: this.direccionDistrito,
          address: this.domicilio.toUpperCase(),
          marital_status: this.estadoCivil,
          is_american: esCiudadanoAmericano,
          personal_information_completed: true,
          landline: this.telefonoFijo,
          profession: this.cargo,
          tin_rut0: this.tin_rut0,
          tin_rut1: this.tin_rut1,
          tin_rut2: this.tin_rut2,
          tax_residence_country0: this.paisresidenciafiscal0,
          tax_residence_country1: this.paisresidenciafiscal1,
          tax_residence_country2: this.paisresidenciafiscal2,
          address_stateCRM: departamentoCRM,
          address_provinceCRM: provinciaCRM,
          address_districtCRM: distritoCRM,
          number_tin_rut: this.cantidadTin,
          potential: potencial,
          productoInteres,
          canal,
          date: new Date(),
        },
      }
      this.$axios
        .post('api/personal-information', dataDatosUsuario)
        .then(() => {
          this.showBotonEnviarFormulario = false;
          this.esFormularioCompleto = true;
          this.esLoadingFormulario = false;
          this.mensajesError.msjErrorInformacionPerso.mostrar = false;
          this.registrarPorcentajeInformacionPersonal();
          this.actualizarInformacionUsuario();
          this.clearPanelSelected();
          this.$store.commit('setInformacionPersonalCompletado', true);
        })
        .catch((error:any) => {
          alert(error)
          this.mensajesError.msjErrorInformacionPerso.mostrar = true;
          this.esLoadingFormulario = false;
        })
    },
    limpiarUbigeo(){
      this.direccionDepartamento = '';
      this.direccionProvincia = '';
      this.direccionDistrito = '';
      this.seleccionarDepartamento();
    },
    seleccionarDepartamento() {
      this.departamentosIP = this.departamentos.filter(
        (departamento: any) => departamento._rs_pais_value === this.direccionPais
      )
    },
    seleccionarProvincia() {
      this.provinciasIP = this.provincias.filter(
        (provincia: any) =>
          provincia._rs_departamento_value === this.direccionDepartamento
      )
    },
    seleccionarDistrito() {
      this.distritosIP = this.distritos.filter(
        (distrito: any) => distrito._rs_provincia_value === this.direccionProvincia
      )
    },
    seleccionarEstadoCivil() {
      if (this.estadoCivil === 'conviviente' || this.estadoCivil === 'casado') {
        this.$store.commit('setMostrarDatosConyugue', true)
      } else {
        this.$store.commit('setMostrarDatosConyugue', false)
      }
    },
    seleccionarCiudadanoAmericano() {
      if (this.ciudadanoAmericano === 'si') {
        this.$store.commit('setMostrarAnexoW9', true)
        this.$store.commit('setMostrarAnexoW8', false)
      } else {
        this.$store.commit('setMostrarAnexoW9', false)
        this.$store.commit('setMostrarAnexoW8', true)
      }
    },
    obtenerDatosParaFormulario() {
      this.tipoDocumento = this.informacionUsuario.identityDocument.type
      this.email = this.informacionUsuario.emailAdress;
      this.celular = this.informacionUsuario.cellphone;
      this.dni = this.informacionUsuario.identityDocument.number

      this.showBotonEnviarFormulario = !this.informacionUsuario.personal_information?.personal_information_completed;
      if (this.informacionUsuario.personal_information) {
        this.esFormularioCompleto = this.informacionUsuario.personal_information.personal_information_completed || false;
        this.nombre = this.informacionUsuario.personal_information.firstName || '';
        this.apMat = this.informacionUsuario.personal_information.motherLastName || '';
        this.apPat = this.informacionUsuario.personal_information.lastName || '';
        this.fecNacimiento = this.informacionUsuario.personal_information.birthdate || '';
        this.sexo = this.informacionUsuario.personal_information.gender || '';
        this.lugarNacimiento = this.informacionUsuario.personal_information.birthplace || '';
        this.direccionPais = this.informacionUsuario.personal_information.address_country || '';
        this.direccionDepartamento = this.informacionUsuario.personal_information.address_state || '';
        this.direccionProvincia = this.informacionUsuario.personal_information.address_province || '';
        this.direccionDistrito = this.informacionUsuario.personal_information.address_district || '';
        this.domicilio = this.informacionUsuario.personal_information.address || '';
        this.nacionalidad = this.informacionUsuario.personal_information.nationality || '';
        this.estadoCivil = this.informacionUsuario.personal_information.marital_status || '';
        this.ciudadanoAmericano = this.informacionUsuario.personal_information
          .is_american
          ? 'si'
          : 'no'
        this.telefonoFijo = this.informacionUsuario.personal_information.landline
        this.cargo = this.informacionUsuario.personal_information.profession || '';

        this.tin_rut0 = this.informacionUsuario.personal_information.tin_rut0 || ''
        this.tin_rut1 = this.informacionUsuario.personal_information.tin_rut1 || ''
        this.tin_rut2 = this.informacionUsuario.personal_information.tin_rut2 || ''
        this.paisresidenciafiscal0 = this.informacionUsuario.personal_information.tax_residence_country0 || ''
        this.paisresidenciafiscal1 = this.informacionUsuario.personal_information.tax_residence_country1 || ''
        this.paisresidenciafiscal2 = this.informacionUsuario.personal_information.tax_residence_country2 || ''
        this.cantidadTin = this.informacionUsuario.personal_information.number_tin_rut
        this.seleccionarEstadoCivil()
        this.seleccionarCiudadanoAmericano()
        // informacion personal completado
        this.$store.commit(
          'setInformacionPersonalCompletado',
          this.informacionUsuario.personal_information
            .personal_information_completed
        )

        this.seleccionarDepartamento()
        this.seleccionarProvincia()
        this.seleccionarDistrito()
      } else if (
        this.informacionUsuario.confirm_ibk_mail &&
        this.informacionUsuario.ibk_acceptance
      ) {
        this.getInformacionIBK(this.dni, this.tipoDocumento)
      }
    },
    actualizarInformacionUsuario() {
        const personal_information: IUsuarioInformacionPersonalInformacion = !!this.informacionUsuario.personal_information ? {...this.informacionUsuario.personal_information} : {};
        personal_information.birthdate = this.fecNacimiento;
        personal_information.gender = this.sexo;
        personal_information.birthplace = this.lugarNacimiento;
        personal_information.address_country = this.direccionPais;
        personal_information.address_state = this.direccionDepartamento;
        personal_information.address_province = this.direccionProvincia;
        personal_information.address_district = this.direccionDistrito;
        personal_information.address = this.domicilio;
        personal_information.nationality = this.nacionalidad;
        personal_information.marital_status = this.estadoCivil;
        personal_information.is_american = this.ciudadanoAmericano === 'si';
        personal_information.landline = this.telefonoFijo;
        personal_information.profession = this.cargo;
        personal_information.tin_rut0 = this.tin_rut0;
        personal_information.tin_rut1 = this.tin_rut1;
        personal_information.tin_rut2 = this.tin_rut2;
        personal_information.tax_residence_country0 = this.paisresidenciafiscal0;
        personal_information.tax_residence_country1 = this.paisresidenciafiscal1;
        personal_information.tax_residence_country2 = this.paisresidenciafiscal2;
        personal_information.number_tin_rut = this.cantidadTin;
        
        const newInformacionUsuarioActualizar = {
          ...this.informacionUsuario,
          personal_information,
        };
        
        if(this.esActualizarUsuario){
          newInformacionUsuarioActualizar.emailAdress = this.email;
          newInformacionUsuarioActualizar.cellphone = this.celular;
        } else {
          newInformacionUsuarioActualizar.personal_information.firstName = this.nombre;
          newInformacionUsuarioActualizar.personal_information.lastName = this.apPat;
          newInformacionUsuarioActualizar.personal_information.motherLastName = this.apMat;
        }

        this.actionUpdateInformacionUsuario(newInformacionUsuarioActualizar);
    },
    getProfesiones() {
      this.listaProfesiones = this.cargos.filter(
        (cargo: any) => cargo.rs_id.charAt(0) === 'P' && cargo.statecode === 0
      )
    },
    async getInformacionIBK(doc: string, typeDoc: string) {
      await this.$axios
        .get(getURLContactIBK(doc,typeDoc),{
          headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
        })
        .then(async (res:any) => {
          const customer = res.data;
          const dataFijo = customer.phone?.[0]?.number || '';
          this.sexo = customer.gender.toLowerCase()
          this.estadoCivil = customer.maritalStatus.toLowerCase()
          this.fecNacimiento = customer.birthDate
          this.domicilio = customer.address?.[0]?.streetName || '';
          this.lugarNacimiento = await this.buscarPaisIBK(customer.birthCountry)
          this.nacionalidad = this.buscarNacionalidadIBK(
            customer.nationalityCountry
          )

          this.direccionPais = await this.buscarPaisIBK(
            customer.residenceCountry
          )
          this.seleccionarDepartamento()

          this.direccionDepartamento = this.buscarDepartamentoIBK(
            customer.address?.[0]?.department || ''
          )
          this.seleccionarProvincia()

          this.direccionProvincia = this.buscarProvinciaIBK(
            customer.address?.[0]?.province || ''
          )
          this.seleccionarDistrito()

          this.direccionDistrito = this.buscarDistritoIBK(
            customer.address?.[0]?.district || ''
          )

          this.telefonoFijo = dataFijo

          // validaciones
          this.seleccionarEstadoCivil()
        })
    },
    async buscarPaisIBK(paisP: string) {
      const paisIBK = await this.paises.find(
        (element: any) => element.rs_name === paisP
      )
      return paisIBK?.rs_paisid || '';
    },
    buscarNacionalidadIBK(nacionalidadP: string) {
      let nacionalidadIBK: {rs_nacionalidadid:string} = {rs_nacionalidadid: ''}

      if (nacionalidadP === 'PERU') {
        nacionalidadIBK = this.nacionalidades.find(
          (element: any) => element.rs_name === 'PERUANO(A)'
        )
      }
      return nacionalidadIBK.rs_nacionalidadid
    },
    buscarDepartamentoIBK(departamentoP: string) {
      const departamentoIBK = this.departamentos.find(
        (element: any) => element.rs_name === departamentoP
      )
      return departamentoIBK?.rs_departamentoid || '';
    },
    buscarProvinciaIBK(provinciaP: string) {
      const provinciaIBK = this.provincias.find(
        (element: any) => element.rs_name === provinciaP
      )
      return provinciaIBK?.rs_provinciaid || '';
    },
    buscarDistritoIBK(distritoP: string) {
      const distritoIBK = this.distritos.find(
        (element: any) => element.rs_name === distritoP
      )
      return distritoIBK?.rs_distritoid || '';
    },
    // VALORES COMPUTADOS DE UBIGEO PARA CRM
    computedDepartamento(departamentoid: string) {
      const departamentoCRM = this.departamentos.find(
        (departamento: any) => departamento.rs_departamentoid === departamentoid
      )
      return departamentoCRM?.rs_id || '';
    },
    computedProvincia(provinciaid: string) {
      const provinciaCRM = this.provincias.find(
        (provincia: any) => provincia.rs_provinciaid === provinciaid
      )
      return provinciaCRM?.rs_id || '';
    },
    computedDistrito(distritoid: string) {
      const distritoCRM = this.distritos.find(
        (distrito: any) => distrito.rs_distritoid === distritoid
      )
      return distritoCRM?.rs_id || '';
    },
  },
})
</script>

<style scoped>
.mk_tdocumento {
  display: inline-block;
  width: 10%;
}

.mk_ndocumento {
  display: inline-block;
  width: 20%;
  margin-left: 15px;
}

.mk_adocumento {
  margin-bottom: 0px;
}

.mk_npersonal {
  width: 31.2%;
}

.mk_appersonal {
  display: inline-block;
  width: 15%;
}

.mk_ampersonal {
  display: inline-block;
  width: 15%;
  margin-left: 15px;
}

.nn_01 div {
  padding-top: 0px;
}

.mk_pd1 {
  padding-bottom: 20px;
  margin-top: -15px;
}

.mk_str01 {
  margin-bottom: 0px !important;
}

.mk_btnguardar {
  width: 350px;
  margin-top: 0px !important;
  padding-top: 0px !important;
}
</style>
