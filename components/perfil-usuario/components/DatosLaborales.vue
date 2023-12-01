<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="cabecera-panel">
      <div class="p-titulo-bold">Datos laborales</div>
      <span v-if="esFormularioCompleto" class="icon-check1" />
    </v-expansion-panel-header>
    <v-expansion-panel-content value="6">
      <div>
        <v-btn
          v-if="!showBotonEnviarFormulario && porcentajeRegistroTotal < 100"
          id="editar_form_datosLaborales"
          icon
          :color="tema.colorSecundario"
          class="icon-edit"
          @click="editarFormulario"
        >
          Editar <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-form ref="form4" v-model="valid4" :lazy-validation="lazy4">
          <div class="row-infoUsuario-check">
            <label
              for=""
              :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
              >Trabajador<span class="dat-ob">*</span></label
            >
            <v-radio-group
              v-model="trabajador"
              row
              :disabled="!showBotonEnviarFormulario"
              :rules="[(v) => !!v || 'Selecciona un valor']"
              required
              @change="seleccionartipoTrabajador"
            >
              <v-radio
                label="Dependiente"
                value="dependiente"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Independiente"
                value="independiente"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Jubilado"
                value="jubilado"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Otro"
                value="otro"
                :color="tema.colorSecundario"
              />
            </v-radio-group>
          </div>
          <div v-if="trabajador === 'otro'" class="row-infoUsuario">
            <label
              for=""
              :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
              >Otro<span class="dat-ob">*</span></label
            >
            <br />
            <v-autocomplete
              v-model="cargo"
              :items="listaCargosotros"
              item-text="rs_name"
              item-value="rs_id"
              :disabled="!showBotonEnviarFormulario"
              :rules="[(v) => !!v || 'Ejemplo: Estudiante']"
              placeholder="Ejemplo: Estudiante"
              class="input-profile"
              solo
            />
          </div>
          <div v-if="trabajador === 'dependiente'">
            <div class="row-infoUsuario">
              <label
                for=""
                :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                >RUC de la empresa<span class="dat-ob">*</span></label
              >
              <br />
              <v-text-field
                v-model="ruc"
                :counter="15"
                :disabled="!showBotonEnviarFormulario"
                :rules="rucRules"
                placeholder="Ingresar RUC"
                class="input-profile"
                solo
                maxlength="15"
                @keypress="onKeypressChangeRuc"
                @change="buscarRUC"
              />
              <div v-if="mostrarErrorRUCdep" class="error--text">
                <small class=""
                  >Ocurrió un problema durante la validación. Por favor de
                  volver a intentarlo</small
                >
              </div>
              <div
                v-if="!!mostrarMensajeNoExisteSunat"
                class="error--text mt-2"
              >
                <small class="">El RUC no se encontró en SUNAT</small>
              </div>
            </div>
            <div class="row-infoUsuario">
              <label
                for=""
                :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                >Empresa donde labora<span class="dat-ob">*</span></label
              >
              <br />
              <v-text-field
                v-model="dondeLabora"
                :disabled="!showBotonEnviarFormulario || bloquearRegistroRuc"
                placeholder="Ingresar empresa"
                class="input-profile"
                solo
                required
                :rules="[(v) => !!v || 'Ingresar nombre de la empresa']"
              />
            </div>
            <div class="row-infoUsuario">
              <label
                for=""
                :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                >Dirección de empresa<span class="dat-ob">*</span></label
              >
              <br />
              <v-text-field
                v-model="DireccionEmpresa"
                :disabled="!showBotonEnviarFormulario || bloquearRegistroRuc"
                placeholder="Ingresar dirección de la empresa"
                class="input-profile"
                solo
                required
                :rules="[(v) => !!v || 'Ingresa la dirección']"
              />
            </div>
            <div class="row-infoUsuario">
              <label
                for=""
                :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                >Cargo/Ocupación<span class="dat-ob">*</span></label
              >
              <br />
              <v-autocomplete
                v-model="cargo"
                :items="listaCargos"
                item-text="rs_name"
                item-value="rs_id"
                :disabled="!showBotonEnviarFormulario"
                :rules="[(v) => !!v || 'Ingresa un cargo']"
                placeholder="Ingresar cargo"
                class="input-profile"
                solo
              />
            </div>
            <div class="row-infoUsuario">
              <label
                for=""
                :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                >Fecha de Ingreso<span class="dat-ob">*</span></label
              >
              <br />
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
                    placeholder="Ingrese su fecha de ingreso"
                    solo
                    required
                    :rules="[(v) => !!v || 'Ingrese su fecha de ingreso']"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="fecIngreso"
                  scrollable
                  required
                  locale="es-PE"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1930-01-01"
                  :disabled="!showBotonEnviarFormulario"
                  @input="menu = false"
                />
              </v-menu>
            </div>
          </div>
          <div v-if="trabajador === 'independiente'">
            <div class="row-infoUsuario">
              <label
                for=""
                :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                >RUC<span class="dat-ob">*</span></label
              >
              <br />
              <v-text-field
                v-model="ruc"
                :disabled="!showBotonEnviarFormulario"
                :counter="15"
                :rules="rucRules"
                placeholder="Ingresar RUC"
                class="input-profile"
                solo
                maxlength="15"
                @keypress="onKeypressChangeRuc"
                @change="buscarRUC"
              />
              <div
                v-if="!!mostrarMensajeNoExisteSunat"
                class="error--text d-mt-10"
              >
                <small class="">El RUC no se encontró en SUNAT</small>
              </div>
            </div>
            <div class="row-infoUsuario">
              <label
                for=""
                :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                >Nombre de la empresa</label
              >
              <br />
              <v-text-field
                v-model="dondeLabora"
                :disabled="!showBotonEnviarFormulario || bloquearRegistroRuc"
                placeholder="Ingresar nombre de la empresa"
                class="input-profile"
                solo
              />
            </div>
            <div class="row-infoUsuario">
              <label
                for=""
                :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                >Dirección de empresa</label
              >
              <br />
              <v-text-field
                v-model="DireccionEmpresa"
                :disabled="!showBotonEnviarFormulario || bloquearRegistroRuc"
                placeholder="Ingresar dirección de la empresa"
                class="input-profile"
                solo
              />
            </div>
            <div class="row-infoUsuario">
              <label
                for=""
                :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                >Cargo/Ocupación<span class="dat-ob">*</span></label
              >
              <br />
              <v-autocomplete
                v-model="cargo"
                :items="listaCargos"
                item-text="rs_name"
                item-value="rs_id"
                :disabled="!showBotonEnviarFormulario"
                :rules="[(v) => !!v || 'Ingresa un cargo']"
                placeholder="Ingresar cargo"
                class="input-profile"
                solo
              />
            </div>
          </div>
          <div class="row-infoUsuario">
            <label for="" class=""
              >¿Es usted colaborador o Directivo de Intéligo SAB o de una
              empresa del grupo Intercorp?<span class="dat-ob">*</span></label
            >
            <v-radio-group
              v-model="esColaborador"
              :disabled="!showBotonEnviarFormulario"
              required
              row
              :rules="[(v) => !!v || 'Selecciona un valor']"
            >
              <v-radio :color="tema.colorSecundario" label="Sí" value="si" />
              <v-radio :color="tema.colorSecundario" label="No" value="no" />
            </v-radio-group>
          </div>
          <div v-if="esColaborador === 'si'">
            <div class="row-infoUsuario">
              <label
                for=""
                :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                >Nombre de la empresa<span class="dat-ob">*</span></label
              >
              <br />
              <v-text-field
                v-model="nombreEmpresaColaborador"
                :disabled="!showBotonEnviarFormulario"
                :rules="[(v) => !!v || 'Ingresa un nombre']"
                placeholder="Ingresar nombre"
                class="input-profile"
                solo
                @keypress="validarEspaciosEnBlanco"
              />
            </div>
            <div class="row-infoUsuario">
              <label
                for=""
                :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                >Cargo<span class="dat-ob">*</span></label
              >
              <br />
              <v-text-field
                v-model="cargoColaborador"
                :disabled="!showBotonEnviarFormulario"
                :rules="[(v) => !!v || 'Ingresa un cargo']"
                placeholder="Ingresar cargo"
                class="input-profile"
                solo
                @keypress="validarEspaciosEnBlanco"
              />
            </div>
          </div>
          <div class="row-infoUsuario">
            <label for="" class=""
              >¿Es usted pariente de Colaborador o Directivo de Intéligo
              SAB?<span class="dat-ob">*</span></label
            >
            <v-radio-group
              v-model="esParienteColaborador"
              :disabled="!showBotonEnviarFormulario"
              required
              row
              :rules="[(v) => !!v || 'Selecciona un valor']"
            >
              <v-radio :color="tema.colorSecundario" label="Sí" value="si" />
              <v-radio :color="tema.colorSecundario" label="No" value="no" />
            </v-radio-group>
          </div>
          <div v-if="esParienteColaborador === 'si'">
            <div class="row-infoUsuario">
              <label
                for=""
                :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                >Nombre del pariente<span class="dat-ob">*</span></label
              >
              <br />
              <v-text-field
                v-model="nombreParienteInteligo"
                :disabled="!showBotonEnviarFormulario"
                :rules="[(v) => !!v || 'Ingresa un nombre']"
                placeholder="Ingresar nombre"
                class="input-profile"
                solo
                @keypress="validarEspaciosEnBlanco"
              />
            </div>
            <div class="row-infoUsuario">
              <label
                for=""
                :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                >Cargo<span class="dat-ob">*</span></label
              >
              <br />
              <v-text-field
                v-model="cargoParienteInteligo"
                :disabled="!showBotonEnviarFormulario"
                :rules="[(v) => !!v || 'Ingresa un cargo']"
                placeholder="Ingresar nombre del cargo del pariente"
                class="input-profile"
                solo
                @keypress="validarEspaciosEnBlanco"
              />
            </div>
          </div>
          <div v-if="showBotonEnviarFormulario" class="row-infoUsuario mb-10">
            <p
              v-if="mensajesError.msjErrorDatosLaborales.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorDatosLaborales.mensaje }}
            </p>
            <p
              v-if="mensajesError.msjErrorDatosLaborales.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorDatosLaborales.mensaje }}
            </p>
            <v-btn
              id="guardar_form_datosLaborales"
              :disabled="!valid4 || esLoadingFormulario"
              :loading="esLoadingFormulario"
              :color="tema.colorSecundario"
              height="65px"
              @click="onClickGuardarFormulario"
            >
              {{ botonGuardarText }}
            </v-btn>
          </div>
        </v-form>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script lang="ts">
import { mapActions } from "vuex";
import {
  APIM_ONBOARDING_KEY,
  CONSULTAR_DNI_RUC_APIS_PERU,
  CONSULTAR_DNI_RUC_APIS_PERU_TOKEN,
} from "~/config/enviroment.config";
import FormularioMixin from "~/mixins/formulario.mixin";
import { IUsuarioInformacionOcupacion } from "~/types";
import { IComputed, IData, IMethods } from "~/types/DatosLaborales.types";
import { RUC_PERU_MAX_LENGTH, RUC_RULES } from "~/validations/rules";
import { getURLContactIBK } from "~/config";
import { getHeaderAPIM } from "~/utils/clienteFormulario";

export default FormularioMixin.extend<IData, IMethods, IComputed>({
  data() {
    return {
      rucRules: RUC_RULES,
      bloquearRegistroRuc: true,
      mostrarMensajeNoExisteSunat: false,
      showBotonEnviarFormulario: false,
      esFormularioCompleto: false,
      esLoadingFormulario: false,
      valid4: true,
      lazy4: false,
      menu: false,
      trabajador: "",
      ruc: "",
      rucIndependiente: "",
      dondeLabora: "",
      dondeLaboraIndependiente: "",
      DireccionEmpresaIndependiente: "",
      cargo: "",
      DireccionEmpresa: "",
      mensajesError: {
        msjErrorDatosLaborales: {
          mensaje: "Ocurrió un error al guardar su información laboral",
          mostrar: false,
        },
      },
      esParienteColaborador: "",
      esColaborador: "",
      fecIngreso: new Date().toISOString().substr(0, 10),
      tieneNegocio: "",
      nombreEmpresaColaborador: "",
      cargoColaborador: "",
      nombreParienteInteligo: "",
      cargoParienteInteligo: "",
      mostrarErrorRUCdep: false,
      listaCargos: [],
      listaCargosotros: [],
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.fecIngreso);
    },
  },
  watch: {
    menu(val) {
      val &&
        setTimeout(() => ((this.$refs.picker as any).activePicker = "YEAR"));
    },
  },
  mounted() {
    this.obtenerDatosParaFormulario();
    this.getCargos();
    this.getCargosOtros();
  },
  methods: {
    ...mapActions(["registrarPorcentajeDatosLaborales"]),
    getCargos() {
      this.listaCargos = this.cargos.filter((cargo) => {
        if (cargo.rs_id !== null) {
          return (
            cargo.rs_id.charAt(0) === "C" &&
            cargo.statecode === 0 &&
            cargo.rs_id !== "C109" &&
            cargo.rs_id !== "C019"
          );
        }
        return false;
      });
    },
    getCargosOtros() {
      this.listaCargosotros = this.cargos.filter((cargo) => {
        if (cargo.rs_id !== null) {
          return (
            cargo.rs_id.charAt(0) === "C" &&
            cargo.statecode === 0 &&
            (cargo.rs_id === "C109" || cargo.rs_id === "C019")
          );
        }
        return false;
      });
    },
    getCargoOcupacional() {
      return this.trabajador === "jubilado" ? "C062" : this.cargo;
    },
    onClickGuardarFormulario() {
      const cargoOcupacion = this.getCargoOcupacional();
      const data = {
        id: this.informacionUsuario.id,
        job_information: {
          occupation_status: this.trabajador,
          occupation_enterprise_ruc: this.ruc,
          occupation_enterprise_name: this.dondeLabora,
          occupation_enterprise_address: this.DireccionEmpresa,
          occupation_enterprise_position: cargoOcupacion,
          occupation_date_admission: this.fecIngreso,
          has_business: this.tieneNegocio,
          is_collaborator: this.esColaborador,
          collaborator_enterprise_name: this.nombreEmpresaColaborador,
          collaborator_enterprise_position: this.cargoColaborador,
          is_related_collaborator: this.esParienteColaborador,
          related_collaborator_name: this.nombreParienteInteligo,
          related_collaborator_position: this.cargoParienteInteligo,
          date: new Date(),
          job_information_completed: true,
        },
      };
      this.esLoadingFormulario = true;
      this.$axios
        .post("/api/job-information", data)
        .then(() => {
          this.showBotonEnviarFormulario = false;
          this.esFormularioCompleto = true;
          this.esLoadingFormulario = false;
          this.mensajesError.msjErrorDatosLaborales.mostrar = false;
          this.registrarPorcentajeDatosLaborales();
          this.actualizarInformacionUsuario();
          this.clearPanelSelected();
          this.$store.commit("setInformacionDatosLaboralCompletado", true);
        })
        .catch((error) => {
          alert(error);
          this.mensajesError.msjErrorDatosLaborales.mostrar = true;
          this.esLoadingFormulario = false;
        });
    },
    onKeypressChangeRuc(e: any) {
      this.mostrarMensajeNoExisteSunat = false;
      this.validaAlfaNumerico(e);
    },
    buscarRUC() {
      this.mostrarErrorRUCdep = false;

      if (
        this.ruc.length === RUC_PERU_MAX_LENGTH &&
        /^\d+$/.test(this.ruc) === true
      ) {
        this.dondeLabora = "";
        this.DireccionEmpresa = "";
        this.bloquearRegistroRuc = true;
        this.mostrarMensajeNoExisteSunat = false;
        this.$store.dispatch("showLoadApp");
        this.$axios
          .get(
            `${CONSULTAR_DNI_RUC_APIS_PERU}/${this.ruc}?token=${CONSULTAR_DNI_RUC_APIS_PERU_TOKEN}`,
          )
          .then((response) => {
            if (
              response.data.estado === "ACTIVO" &&
              response.data.condicion === "HABIDO"
            ) {
              this.dondeLabora = response.data.razonSocial;
              this.DireccionEmpresa = response.data.direccion;
              this.actionUpdateInformacionUsuario({
                ...this.informacionUsuario,
                job_information: {
                  ...this.informacionUsuario.job_information,
                  occupation_enterprise_name: response.data.razonSocial,
                  occupation_enterprise_address: response.data.direccion,
                },
              });
            } else {
              this.bloquearRegistroRuc = false;
              this.mostrarMensajeNoExisteSunat = true;
              this.dondeLabora = "";
              this.DireccionEmpresa = "";
            }
            this.$store.dispatch("hideLoadApp");
          })
          .catch(() => {
            this.$store.dispatch("hideLoadApp");
            this.mostrarErrorRUCdep = true;
            this.dondeLabora = "";
            this.DireccionEmpresa = "";
          });
      } else {
        this.mostrarMensajeNoExisteSunat = true;
        this.bloquearRegistroRuc = false;
        this.dondeLabora = "";
        this.DireccionEmpresa = "";
      }
    },
    seleccionarTrabajador() {
      if (this.trabajador === "independiente") {
        this.$store.commit("setMostrarAnexoClienteIndependiente", true);
      } else {
        this.$store.commit("setMostrarAnexoClienteIndependiente", false);
      }
    },
    seleccionartipoTrabajador() {
      // this.$refs.form4.reset()
      this.ruc = "";
      this.dondeLabora = "";
      this.DireccionEmpresa = "";
      this.cargo = "";
      this.tieneNegocio = "";
      this.fecIngreso = "";
      this.seleccionarTrabajador();
    },
    obtenerDatosParaFormulario() {
      this.showBotonEnviarFormulario =
        !this.informacionUsuario.job_information?.job_information_completed;
      if (this.informacionUsuario.job_information) {
        this.esFormularioCompleto =
          this.informacionUsuario.job_information.job_information_completed ||
          false;

        this.trabajador =
          this.informacionUsuario.job_information.occupation_status || "";
        this.ruc =
          this.informacionUsuario.job_information.occupation_enterprise_ruc ||
          "";
        this.dondeLabora =
          this.informacionUsuario.job_information.occupation_enterprise_name ||
          "";
        this.DireccionEmpresa =
          this.informacionUsuario.job_information
            .occupation_enterprise_address || "";
        this.cargo =
          this.informacionUsuario.job_information
            .occupation_enterprise_position || "";
        this.fecIngreso =
          this.informacionUsuario.job_information.occupation_date_admission ||
          "";
        this.tieneNegocio =
          this.informacionUsuario.job_information.has_business || "";
        this.esColaborador =
          this.informacionUsuario.job_information.is_collaborator || "";
        this.nombreEmpresaColaborador =
          this.informacionUsuario.job_information
            .collaborator_enterprise_name || "";
        this.cargoColaborador =
          this.informacionUsuario.job_information
            .collaborator_enterprise_position || "";
        this.esParienteColaborador =
          this.informacionUsuario.job_information.is_related_collaborator || "";
        this.nombreParienteInteligo =
          this.informacionUsuario.job_information.related_collaborator_name ||
          "";
        this.cargoParienteInteligo =
          this.informacionUsuario.job_information
            .related_collaborator_position || "";

        if (!!this.ruc && !this.DireccionEmpresa) {
          this.buscarRUC();
        }
        this.$store.commit(
          "setInformacionDatosLaboralCompletado",
          this.informacionUsuario.job_information.job_information_completed,
        );
        this.seleccionarTrabajador();
      } else if (
        this.informacionUsuario.confirm_ibk_mail &&
        this.informacionUsuario.ibk_acceptance
      ) {
        this.getInformacionIBK(
          this.informacionUsuario.identityDocument.number,
          this.informacionUsuario.identityDocument.type,
        );
      }
    },
    actualizarInformacionUsuario() {
      const job_information: IUsuarioInformacionOcupacion = !!this
        .informacionUsuario.job_information
        ? { ...this.informacionUsuario.job_information }
        : {};
      job_information.occupation_status = this.trabajador;
      job_information.occupation_enterprise_ruc = this.ruc;
      job_information.occupation_enterprise_name = this.dondeLabora;
      job_information.occupation_enterprise_address = this.DireccionEmpresa;
      job_information.occupation_enterprise_position = this.cargo;
      job_information.occupation_date_admission = this.fecIngreso;
      job_information.has_business = this.tieneNegocio;
      job_information.is_collaborator = this.esColaborador;
      job_information.collaborator_enterprise_name =
        this.nombreEmpresaColaborador;
      job_information.collaborator_enterprise_position = this.cargoColaborador;
      job_information.is_related_collaborator = this.esParienteColaborador;
      job_information.related_collaborator_name = this.nombreParienteInteligo;
      job_information.related_collaborator_position =
        this.cargoParienteInteligo;
      this.actionUpdateInformacionUsuario({
        ...this.informacionUsuario,
        job_information,
      });
    },

    async getInformacionIBK(doc: string, typeDoc: string) {
      await this.$axios
        .get(getURLContactIBK(doc, typeDoc), {
          headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
        })
        .then((res) => {
          const company = res.data.company;

          this.trabajador = company.positionDescripcion.toLowerCase();
          this.cargo = company.occupation;
          this.fecIngreso = company.admissionDate;
          this.dondeLabora = company.name;
          this.DireccionEmpresa = company.address;
        });
    },
  },
});
</script>
