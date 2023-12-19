<template>
  <v-expansion-panel class="mb-10">
    <v-expansion-panel-header class="cabecera-panel">
      <div class="p-titulo-bold">Aceptación</div>
      <span v-if="btnguardarAvisosLegales" class="icon-check1" />
    </v-expansion-panel-header>
    <v-expansion-panel-content value="11">
      <div>
        <v-form ref="form7" v-model="valid7" :lazy-validation="lazy7">
          <div class="row-infoUsuario-check">
            <v-checkbox
              v-model="aceptarTerminosYcondiciones"
              :disabled="!disableAvisosLegales"
              input-value="true"
              value
              :color="tema.colorSecundario"
              :rules="[(v) => !!v || 'Verifica la casilla']"
              required
            >
              <template #label>
                <div>
                  He leído y acepto los
                  <a
                    target="_blank"
                    :href="linkTyC"
                    :class="tema.class_color"
                    @click.stop
                  >
                    Términos y condiciones del contrato de intermediación
                  </a>
                </div>
              </template>
            </v-checkbox>
          </div>
          <div class="row-infoUsuario-check">
            <v-checkbox
              v-model="aceptarPoliticaClientes"
              :disabled="!disableAvisosLegales"
              input-value="true"
              value
              :color="tema.colorSecundario"
              :rules="[(v) => !!v || 'Verifica la casilla']"
              required
            >
              <template #label>
                <div>
                  He leído y acepto la
                  <a
                    target="_blank"
                    :href="linkPoliticas"
                    :class="tema.class_color"
                    @click.stop
                  >
                    Política de clientes
                  </a>
                </div>
              </template>
            </v-checkbox>
          </div>
          <div class="row-infoUsuario-check">
            <v-checkbox
              v-model="aceptarPrivacidadDatos"
              :disabled="!disableAvisosLegales"
              input-value="true"
              value
              :color="tema.colorSecundario"
              :rules="[(v) => !!v || 'Verifica la casilla']"
              required
            >
              <template #label>
                <div>
                  He leído y acepto la
                  <a
                    target="_blank"
                    :href="linkPrivacidad"
                    :class="tema.class_color"
                    @click.stop
                  >
                    Política de privacidad de datos
                  </a>
                </div>
              </template>
            </v-checkbox>
          </div>
          <div class="row-infoUsuario-check">
            <v-checkbox
              v-model="aceptarClausula"
              :disabled="!disableAvisosLegales"
              input-value="true"
              value
              :color="tema.colorSecundario"
              :rules="[(v) => !!v || 'Verifica la casilla']"
              required
            >
              <template #label>
                <div>
                  He leído y acepto la
                  <a
                    target="_blank"
                    href="https://saonboardinginteligo.blob.core.windows.net/documentos/Persona%20Natural-Cla%CC%81usula%20de%20Tratamiento%20de%20Datos%20Personales%20OnBoarding%20Digital.pdf"
                    :class="tema.class_color"
                    @click.stop
                  >
                    Cláusula de tratamiento de datos personales
                  </a>
                </div>
              </template>
            </v-checkbox>
          </div>
          <div v-if="mostrarAnexoW9" class="row-infoUsuario-check">
            <v-checkbox
              v-model="aceptarWaiver"
              :disabled="!disableAvisosLegales"
              input-value="true"
              value
              :color="tema.colorSecundario"
              :rules="[(v) => !!v || 'Verifica la casilla']"
              required
            >
              <template #label>
                <div>
                  He leído y acepto el
                  <v-btn
                    id="formato_waiver"
                    text
                    :color="tema.colorPrimario"
                    class="btn-url"
                    @click="dialog = !dialog"
                  >
                    Formato de Waiver.
                  </v-btn>
                </div>
              </template>
            </v-checkbox>
          </div>
          <div
            v-if="
              !btnguardarAvisosLegales &&
              porcentajeRegistroTotal >= 90 &&
              esSujetoObligado === 'no'
            "
            class="row-infoUsuario"
          >
            <p
              v-if="mensajesError.msjErrorAvisosLegales.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorAvisosLegales.mensaje }}
            </p>
            <v-btn
              id="aceptar_y_finalizar"
              class="text-white"
              :disabled="!valid7 || loading"
              :loading="loading"
              :color="tema.colorSecundario"
              height="65px"
              @click="onClickGuardarFormulario"
            >
              ACEPTAR Y FINALIZAR
            </v-btn>
            {{ errorApi }}
            <p
              v-if="mensajesError.msjErrorAvisGlobal.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorAvisGlobal.mensaje }}
            </p>
          </div>
        </v-form>
        <v-dialog v-model="dialog" width="600px" content-class="dialog-waiver">
          <v-card>
            <button
              class="btn-cerrar icon-cerrar text-white"
              @click="dialog = !dialog"
            />
            <div :class="tema.class_color">
              <div class="title-waiver">
                <h3>Formato de Waiver</h3>
                <div>Mediante el presente documento declaro lo siguiente:</div>
              </div>
              <div class="content-waiver">
                <v-card-text>
                  {{ textWaiver }}
                </v-card-text>

                <div class="text-center">
                  <v-btn
                    id="aceptar_waiver"
                    :color="tema.colorSecundario"
                    x-large
                    class="text-white"
                    @click="
                      dialog = false;
                      aceptarWaiver = true;
                    "
                  >
                    ACEPTO
                  </v-btn>
                </div>
              </div>
            </div>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="showDialogSaveData"
          persistent
          width="600px"
          content-class="dialog-perfil-completado"
        >
          <v-card :class="['text-center', tema.class_color]">
            <div>
              <slot name="title"></slot>
              <span class="icon-check icon-ok-finalizar" />
            </div>
            <div>
              <slot name="emailMessage"></slot>
            </div>
            <v-btn
              id="aceptar_finalizar"
              class="text-white"
              height="48px"
              width="80%"
              :color="tema.colorSecundario"
              x-large
              @click="closeModal"
            >
              CERRAR
            </v-btn>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialog3"
          width="600px"
          content-class="dialog-perfil-completado"
        >
          <v-card :class="['text-center', tema.class_color]">
            <div>
              <div>
                <img src="@/assets/img/warning.svg" alt="error de validacion" />
              </div>
              <h2 class="pb-8 pt-8">
                ¡Queremos que siempre esté informado(a)!
              </h2>
              <p class="pb-4">
                Sus datos completados necesitan ser evaluados para brindarle la
                mejor experiencia con nosotros.
                <strong
                  >Le enviaremos un correo con la confirmación de su registro en
                  un plazo de 2 días laborales.</strong
                >
              </p>
            </div>
            <v-btn
              id="aceptar_evaluacion_final"
              class="text-white"
              height="48px"
              width="80%"
              :color="tema.colorSecundario"
              x-large
              @click="closeModal"
            >
              CONTINUAR
            </v-btn>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDNIvencido" content-class="dialog-dniVencido">
          <div class="text-center">
            <div :class="[tema.class_color]">
              <div>
                <p class="titulo-dialog_dniVencido">
                  SU DOCUMENTO NACIONAL DE IDENTIDAD (DNI) HA CADUCADO
                </p>
              </div>
              <div>
                <img
                  src="@/assets/img/alert_red.svg"
                  alt="error de validacion"
                />
              </div>
            </div>
            <div class="mb-8">
              Por favor, renueve su documento en
              <a
                href="https://apps.reniec.gob.pe/renovacionDni/"
                target="_blank"
                rel="noopener noreferrer"
                >RENIEC</a
              >
              y vuelva a ingresar para continuar con el proceso.
            </div>
            <v-btn
              :color="tema.colorPrimario"
              @click="dialogDNIvencido = !dialogDNIvencido"
            >
              ACEPTAR
            </v-btn>
          </div>
        </v-dialog>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script lang="ts">
import { mapActions, mapGetters, mapState } from "vuex";
import {
  POLITICAS_PDF,
  PRIVACIDAD_PDF,
  TERMINOS_Y_CONDICIONES_PDF,
  TEXT_WAIVER,
} from "~/config";
import {
  APIM_CUMPLIMIENTO_VALIDAR,
  APIM_ONBOARDING_KEY,
  ES_CREAR_RUT,
} from "~/config/enviroment.config";
import { getHeaderAPIM } from "~/utils/clienteFormulario";
import FormularioMixin from "~/mixins/formulario.mixin";
import {
  ICumplimientoCosmosRequest,
  IValidarCumplimientoResponse,
} from "~/types";
import { IComputed, IData, IMethods } from "~/types/AvisosLegales.types";
import { IUsuarioCRMRequest } from "~/types/CRM.types";
import { IDataCumplimiento } from "~/types/cumplimiento.types";
import { IHandleSendDataUsuarioCRM } from "~/types/PerfilUsuario.types";
import {
  IUsuarioInformacion,
  IUsuarioInformacionRUT,
} from "~/types/Usuario.types";
import {
  getParaActualizarDatos,
  getUsuarioCRMFromFormulario,
} from "~/utils/contactoCRM";
import {
  computedGenero,
  computedNacionalidadRUT,
  computedPaisRUT,
  formatDate,
} from "~/utils/contactoCRM/computedFunctions";
import { validarRut } from "~/validations/rut";

export default FormularioMixin.extend<IData, IMethods, IComputed>({
  data() {
    return {
      dialog: false,
      showDialogSaveData: false,
      dialog3: false,
      valid7: true,
      lazy7: false,
      btnguardarAvisosLegales: false,
      mensajesError: {
        msjErrorAvisosLegales: {
          mensaje: "Ocurrió un error al guardar los avisos legales",
          mostrar: false,
        },
        msjErrorAvisGlobal: {
          mensaje: "Por favor complete todos los campos obligatorios",
          mostrar: false,
        },
      },
      disableAvisosLegales: true,
      aceptarTerminosYcondiciones: false,
      aceptarPoliticaClientes: false,
      aceptarWaiver: false,
      aceptarPrivacidadDatos: false,
      aceptarClausula: false,
      textWaiver: TEXT_WAIVER,
      linkTyC: TERMINOS_Y_CONDICIONES_PDF,
      linkPoliticas: POLITICAS_PDF,
      linkPrivacidad: PRIVACIDAD_PDF,
      infoUsuarioCRM: {},
      infoCuentaBancaria: {},
      infoFinanciera: {},
      infoConoceCliente: {},
      loading: false,
      errorApi: "",
      idContactoCRMBD: {},
      observado: false,
      datActualizarCRMNativo: {},
      tramaCRM: {},
      dialogDNIvencido: false,
      idInfoAdicionalCRMBD: {},
    };
  },
  computed: {
    ...mapState([
      "mostrarAnexoW9",
      "informacionUsuario",
      "usuario",
      "esSujetoObligado",
      "empresa",
      "nombreEmpresa",
      "informacionAnexo8Completado",
      "mostrarAnexoW8",
      "informacionAnexo9Completado",
      "mostrarDatosConyugue",
      "informacionConyugeCompletado",
      "informacionAnexoPEPCompletado",
      "mostrarAnexoPep",
    ]),
    ...mapGetters({
      saveContactoCRM: "contactoCRM/getSaveContactoCRM",
      saveLegalInformacionResponse:
        "legalInformacion/getSaveLegalInformacionResponse",
    }),
  },
  mounted() {
    this.obtenerDatosParaFormulario();

    (window as any).getRutRequest = () => {
      console.log(
        "rut request",
        this.getRutInformacionObject(this.informacionUsuario),
      );
    };
  },
  methods: {
    ...mapActions({
      registrarPorcentajeAvisosLegales: "registrarPorcentajeAvisosLegales",
      enviarRut: "rut/enviarRut",
      enviarCorreoColaRutDev: "sendMail/enviarCorreoColaRutDev",
      enviarCorreoErrorValidacionRut: "sendMail/enviarCorreoErrorValidacionRut",
    }),
    // guardar en cosmos db
    async onClickGuardarFormulario() {
      if (this.isAnexoYConyugueCompleto() && this.isNotObervadoPEP()) {
        this.loading = true;
        const { usuarioInformacion, dataCumplimiento, usuarioCRMRequest } =
          await this.getInformacionUsuarioCRM();
        this.actualizarDatosLocales(usuarioInformacion, usuarioCRMRequest);
        if (!!usuarioInformacion.idContactCRM) {
          this.idContactoCRMBD = usuarioInformacion.idContactCRM.crmContactId;
          this.idInfoAdicionalCRMBD =
            usuarioInformacion.idContactCRM.crmAddionalInformationId;
        }

        this.guardarInformacionRUT(usuarioInformacion);
        this.consultaCumplimiento(dataCumplimiento, usuarioCRMRequest);
      }
    },
    isAnexoYConyugueCompleto() {
      const completoAnexo8 =
        !this.mostrarAnexoW8 ||
        (this.mostrarAnexoW8 && this.informacionAnexo8Completado);
      const completoAnexo9 =
        !this.mostrarAnexoW9 ||
        (this.mostrarAnexoW9 && this.informacionAnexo9Completado);
      const completoDatosConyuge =
        !this.mostrarDatosConyugue ||
        (this.mostrarDatosConyugue && this.informacionConyugeCompletado);
      const completoAnexoPep =
        !this.mostrarAnexoPep ||
        (this.mostrarAnexoPep && this.informacionAnexoPEPCompletado);

      const isValid =
        completoAnexo8 &&
        completoAnexo9 &&
        completoDatosConyuge &&
        completoAnexoPep;

      if (!isValid) {
        this.mostrarMensajeValidacionCamposObligatorios();
      }
      return isValid;
    },
    isNotObervadoPEP() {
      const isValid =
        !this.informacionUsuario.is_observed_pep ||
        (!!this.informacionUsuario.is_observed_pep &&
          this.informacionUsuario.financial_information.is_pep === "si");

      if (!isValid) {
        this.mostrarMensajeObservadoPEP();
      }
      return isValid;
    },
    actualizarDatosLocales(
      informacionUsuarioObject: IUsuarioInformacion,
      dataInformacionCRM: IUsuarioCRMRequest,
    ) {
      this.tramaCRM.odi_db = informacionUsuarioObject;
      const { infoUsuarioCRM, datActualizarCRMNativo } = getParaActualizarDatos(
        informacionUsuarioObject,
        dataInformacionCRM,
        this.datActualizarCRMNativo,
        this.paises,
        this.nacionalidades,
      );
      this.infoUsuarioCRM = infoUsuarioCRM;
      this.datActualizarCRMNativo = datActualizarCRMNativo;
    },
    obtenerDatosParaFormulario() {
      if (this.informacionUsuario.legal_information) {
        this.btnguardarAvisosLegales =
          this.informacionUsuario.legal_information.legal_information_completed;
        this.disableAvisosLegales =
          !this.informacionUsuario.legal_information
            .legal_information_completed;

        this.aceptarTerminosYcondiciones =
          this.informacionUsuario.legal_information.accept_terms_and_conditions;
        this.aceptarPoliticaClientes =
          this.informacionUsuario.legal_information.customer_policy;
        this.aceptarPrivacidadDatos =
          this.informacionUsuario.legal_information.data_privacy;
        this.aceptarClausula =
          this.informacionUsuario.legal_information.accept_clause;
        this.aceptarWaiver =
          this.informacionUsuario.legal_information.accept_waiver;
      }
    },

    async getInformacionUsuarioCRM(): Promise<{
      usuarioInformacion: IUsuarioInformacion;
      usuarioCRMRequest: IUsuarioCRMRequest;
      dataCumplimiento: IDataCumplimiento;
    }> {
      let informacionUsuario;
      if (!this.esActualizarUsuario) {
        const data = {
          cuenta: this.informacionUsuario.accountIdentifier,
        };
        const response = await this.$axios.post("/api/getLead", data);
        informacionUsuario = response.data;
      } else {
        informacionUsuario = this.informacionUsuario;
      }
      return getUsuarioCRMFromFormulario(
        informacionUsuario,
        this.empresa,
        this.infoUsuarioCRM,
        this.paisesResidenciaFiscal,
        this.cargos,
      );
    },

    // funcion para consultar si el prspecto tiene una observacion de cumplimiento
    async consultaCumplimiento(
      data: IDataCumplimiento,
      usuarioCRMRequest: IUsuarioCRMRequest,
    ) {
      const dataSinConyuge = {
        apellidoPaterno: data.apellidoPaterno,
        apellidoMaterno: data.apellidoMaterno?.replace(".", " "),
        nombres: data.nombres,
        documentoIdentidad: data.id,
        documentoTipo: data.documentType,
        esActualizarUsuario: !!this.esActualizarUsuario,
      };

      await this.$axios
        .post(APIM_CUMPLIMIENTO_VALIDAR, dataSinConyuge, {
          headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
        })
        .then((res: { data: IValidarCumplimientoResponse }) => {
          this.tramaCRM.compliance_information = res.data;
          this.observado =
            res.data.hasCRMBlackListObservations === "S" ||
            res.data.hasComplianceNoRecomendadoObservations === "S" ||
            res.data.hasCompliancePEPObservations === "S" ||
            res.data.hasComplianceWordCheckObservations === "S" ||
            res.data.hasGoogleObservations === "S";
          const sendApiCumplimientoOject: IHandleSendDataUsuarioCRM = {
            idContactoCRMBD: this.idContactoCRMBD,
            idInfoAdicionalCRMBD: this.idInfoAdicionalCRMBD,
            usuarioCRMUpdateRequest: this.datActualizarCRMNativo,
            tramaCRM: this.tramaCRM,
            usuarioCRMRequest,
          };

          this.$emit("send-api-cumplimiento", sendApiCumplimientoOject);
          this.guarDatosCumplimiento({ ...res.data });
        })
        .catch(() => {
          this.openModalRequestFail(
            "No se pudo completar la validación de cumplimiento",
          );
          this.loading = false;
        });
    },
    // funcion para guardar el response del api cumplimiento en la bd de ODI
    guarDatosCumplimiento(dataC: IValidarCumplimientoResponse) {
      const data: ICumplimientoCosmosRequest = {
        id: this.informacionUsuario.id,
        compliance_information: {
          ...dataC,
          diligenceComplianceId: dataC.id,
          identityDocument: this.informacionUsuario.identityDocument,
          date: new Date(),
          id: undefined,
        },
        isUpdate: this.esActualizarUsuario,
      };
      this.$store.dispatch("cumplimiento/saveCumplimiento", data);
    },
    getRutInformacionObject(usuarioInformacion: IUsuarioInformacion) {
      return {
        nacionalidad: computedNacionalidadRUT(
          this.nacionalidades,
          usuarioInformacion.personal_information.nationality,
        ),
        paisResidencia: computedPaisRUT(
          this.paises,
          usuarioInformacion.personal_information.address_country,
        ),
        tipoDocumento: parseInt(usuarioInformacion.identityDocument.type),
        numeroDocumento: usuarioInformacion.identityDocument.number,
        nombres: usuarioInformacion.personal_information.firstName || "",
        apellidoPaterno: usuarioInformacion.personal_information.lastName || "",
        apellidoMaterno:
          usuarioInformacion.personal_information.motherLastName || "",
        fechaNacimiento: formatDate(
          usuarioInformacion.personal_information.birthdate,
        ),
        razonSocial:
          usuarioInformacion.job_information.occupation_enterprise_name || "",
        direccion: usuarioInformacion.personal_information.address || "",
        correo: usuarioInformacion.emailAdress,
        telefono: usuarioInformacion.cellphone?.trim(),
        genero: computedGenero(usuarioInformacion.personal_information.gender),
        departamento:
          this.computedDepartamentoRUT(
            usuarioInformacion.personal_information.address_state,
          ) || "",
        provincia:
          this.computedProvinciaRUT(
            usuarioInformacion.personal_information.address_province,
          ) || "",
        distrito:
          this.computedDistritoRUT(
            usuarioInformacion.personal_information.address_district,
          ) || "",
      };
    },
    // fc para guardar informacion que requiere el RPA de RUT
    async guardarInformacionRUT(usuarioInformacion: IUsuarioInformacion) {
      const data: { id: string; rut_information: IUsuarioInformacionRUT } = {
        id: this.informacionUsuario.id,
        rut_information: this.getRutInformacionObject(usuarioInformacion),
      };
      await this.$axios.post("/api/rut-information", data);
    },
    async enviarColaCrearRUT(informacionRut: IUsuarioInformacionRUT) {
      const { esValido, mensajeValidacion } = validarRut(informacionRut);
      if (esValido) {
        if (ES_CREAR_RUT && !this.esActualizarUsuario) {
          this.enviarRut(informacionRut);
        } else if (!this.esActualizarUsuario) {
          this.enviarCorreoColaRutDev(JSON.stringify(informacionRut));
        }
      } else {
        this.enviarCorreoErrorValidacionRut({
          data: JSON.stringify(informacionRut),
          error: mensajeValidacion,
        });
      }
    },
    computedDepartamentoRUT(departamentoid?: string) {
      return this.departamentos.find(
        (element) => element.rs_departamentoid === departamentoid,
      )?.rs_name;
    },
    computedProvinciaRUT(provinciaid?: string) {
      return this.provincias.find(
        (element) => element.rs_provinciaid === provinciaid,
      )?.rs_name;
    },
    computedDistritoRUT(distritoid?: string) {
      return this.distritos.find(
        (element) => element.rs_distritoid === distritoid,
      )?.rs_name;
    },
    closeModal() {
      this.showDialogSaveData = false;
      this.dialog3 = false;
      this.$router.push("/logout?redirect=sab");
    },
    mostrarMensajeValidacionCamposObligatorios() {
      this.mensajesError.msjErrorAvisGlobal = {
        mensaje: "Por favor complete todos los campos obligatorios",
        mostrar: true,
      };
    },
    mostrarMensajeObservadoPEP() {
      this.openModal({
        text: "Para continuar con su solicitud debe completar la sección PEP (Persona Expuesta Políticamente)",
        title: "Obervado PEP",
        showIcon: false,
      });
    },
  },
  watch: {
    saveContactoCRM: function (newValue) {
      if (!!newValue) {
        const dataDatosUsuario = {
          id: this.informacionUsuario.id,
          legal_information: {
            accept_clause: this.aceptarClausula,
            accept_terms_and_conditions: this.aceptarTerminosYcondiciones,
            accept_waiver: this.aceptarWaiver,
            customer_policy: this.aceptarPoliticaClientes,
            data_privacy: this.aceptarPrivacidadDatos,
            date: new Date(),
            identityDocument: this.informacionUsuario.identityDocument,
            legal_information_completed: true,
            policy_pdf: this.linkPoliticas,
            terms_and_conditions_pdf: this.linkTyC,
            waiver_text: this.textWaiver,
          },
          isUpdate: this.esActualizarUsuario,
        };
        this.$store.commit("contactoCRM/setSaveContactoCRM", undefined);
        this.$store.dispatch(
          "legalInformacion/saveLegalInformacion",
          dataDatosUsuario,
        );
      }
    },
    saveLegalInformacionResponse: async function (newValue) {
      if (newValue?.success === true) {
        this.mensajesError.msjErrorAvisosLegales.mostrar = false;
        this.registrarPorcentajeAvisosLegales();
        this.btnguardarAvisosLegales = true;
        this.disableAvisosLegales = false;
        this.loading = !this.loading;
        this.clearPanelSelected();

        const sendMailAvisosLegalesParams = {
          operation: this.esActualizarUsuario ? "Update" : "Register",
          infoReplace: {
            nombres: `${this.infoUsuarioCRM.nombres}`,
            apellidoPaterno: `${this.infoUsuarioCRM.apellidoPaterno}`,
            apellidoMaterno: `${this.infoUsuarioCRM.apellidoMaterno}`,
            tipoDocumento:
              this.infoUsuarioCRM.tipoDocumento === 1 ? "DNI" : "CE",
            numeroDocumento: `${this.infoUsuarioCRM.numeroDocumento}`,
          },
        };
        if (this.observado) {
          await this.$store.dispatch(
            "sendMail/enviarCorreoCumplimiento",
            sendMailAvisosLegalesParams,
            { root: true },
          );
          this.dialog3 = true;
        } else {
          await this.$store.dispatch(
            "sendMail/enviarCorreoCustomerSupport",
            sendMailAvisosLegalesParams,
            { root: true },
          );
          this.showDialogSaveData = true;
          this.enviarColaCrearRUT(
            this.getRutInformacionObject(this.informacionUsuario),
          );
        }
      } else if (newValue?.success === false) {
        newValue?.error && alert(newValue.error);
        this.mensajesError.msjErrorAvisosLegales.mostrar = true;
      }
      this.$store.commit(
        "legalInformacion/setSaveLegalInformacionResponse",
        undefined,
      );
    },
  },
});
</script>
<style scoped>
.dialog-perfil-completado .v-card {
  padding: 70px 40px !important;
}
.dialog-perfil-completado .v-card h3 {
  padding-top: 30px;
  padding-bottom: 30px;
}
.title-waiver {
  background-color: #f6f6f7;
  padding: 15px 50px;
}
.content-waiver {
  padding: 15px 30px;
}
.icon-ok-finalizar {
  background-color: #039644;
  border-radius: 100%;
  padding: 30px;
  font-size: 50px;
  display: inline-block;
}
.icon-ok-finalizar::before {
  color: #ffffff !important;
}
</style>
