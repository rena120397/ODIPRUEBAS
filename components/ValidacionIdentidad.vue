<template>
  <div>
    <div v-if="modalValidacion" class="modal100-mobile">
      <div :class="['content-form-registroVal', tema.class_color]">
        <div class="text-center">
          <img :src="logos.logoLogin" alt="logo inteligo" />
          <div class="p-titulo-bold mb-8">
            ¡{{ tema.textos.tituloValidacionIdentidad }}!
          </div>
          <div>
            {{ tema.textos.subTituloValIdentidad }}.<br />
            {{ tema.textos.datosValIdentidad }}.
          </div>
        </div>
        <v-form
          v-if="usuario.identityDocument.type === '1'"
          ref="form"
          v-model="valid"
          class="form-validar pb-8 text-uppercase"
          :lazy-validation="lazy"
        >
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <div class="row-infoUsuariovi">
                  <label for="">Nombres<span class="dat-ob">*</span></label>
                  <br />
                  <v-text-field
                    v-model.trim="nombres"
                    placeholder="Ingresar nombres"
                    class="input-profile"
                    :rules="[(v) => !!v || 'Ingrese su nombre completo']"
                    solo
                  />
                </div>
                <div class="row-infoUsuariovi">
                  <label for=""
                    >Apellido Paterno<span class="dat-ob">*</span></label
                  >
                  <br />
                  <v-text-field
                    v-model.trim="apPat"
                    placeholder="Ingresar apellido paterno"
                    class="input-profile"
                    :rules="[(v) => !!v || 'Ingrese su apellido paterno']"
                    solo
                  />
                </div>
                <div class="row-infoUsuariovi">
                  <label for=""
                    >Apellido Materno<span class="dat-ob">*</span></label
                  >
                  <br />
                  <v-text-field
                    v-model.trim="apMat"
                    placeholder="Ingresar Apellido materno"
                    class="input-profile"
                    :rules="[(v) => !!v || 'Ingrese su apellido materno']"
                    solo
                  />
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div>
                  <img
                    src="@/assets/img/dni.png"
                    alt="usuario"
                    class="mb-3 mt-2 img-val-id"
                  />
                </div>
                <div class="row-infoUsuariovi">
                  <label for=""
                    >Dígito Verificador<span class="dat-ob">*</span></label
                  >
                  <br />
                  <v-text-field
                    v-model.trim="digito"
                    placeholder="Ingresar dígito"
                    class="input-profile"
                    :rules="[(v) => !!v || 'Ingrese el dígito verificador']"
                    solo
                    maxlength="1"
                    @keypress="validaSoloNumeros"
                  />
                </div>
              </v-col>
            </v-row>
          </v-container>
          <div class="text-center">
            <v-btn
              id="getPreguntasEquifax"
              :disabled="!valid || loading"
              :loading="loading"
              class="btn-comenzar__validacion"
              :color="tema.colorSecundario"
              height="60px"
              @click="getPreguntasEquifax"
            >
              COMENZAR
            </v-btn>
          </div>
        </v-form>
        <v-form
          v-if="usuario.identityDocument.type === '2'"
          ref="form"
          v-model="valid"
          class="form-validar pt-2 text-uppercase text-center"
          :lazy-validation="lazy"
        >
          <div class="row-infoUsuariovi pb-2">
            <label for="">Nombres<span class="dat-ob">*</span></label>
            <br />
            <v-text-field
              v-model.trim="nombres"
              placeholder="Ingresar nombres"
              class="input-profile"
              :rules="[(v) => !!v || 'Ingrese su nombre completo']"
              solo
            />
          </div>
          <div class="row-infoUsuariovi pb-2">
            <label for="">Apellido Paterno<span class="dat-ob">*</span></label>
            <br />
            <v-text-field
              v-model.trim="apPat"
              placeholder="Ingresar apellido paterno"
              class="input-profile"
              :rules="[(v) => !!v || 'Ingrese su apellido paterno']"
              solo
            />
          </div>
          <div class="row-infoUsuariovi">
            <label for="">Apellido Materno<span class="dat-ob">*</span></label>
            <br />
            <v-text-field
              v-model.trim="apMat"
              placeholder="Ingresar Apellido materno"
              class="input-profile"
              solo
            />
          </div>
          <div class="text-center pt-4">
            <v-btn
              id="getPreguntasEquifax"
              :disabled="!valid || loading"
              :loading="loading"
              class="btn-comenzar__validacion"
              :color="tema.colorSecundario"
              height="60px"
              @click="getPreguntasEquifax"
            >
              COMENZAR
            </v-btn>
          </div>
        </v-form>
      </div>
    </div>
    <div v-if="modalPreguntasValidacion" class="">
      <div :class="['content-form-registroVal text-center', tema.class_color]">
        <img :src="logos.logoLogin" alt="logo inteligo" />
        <div class="text-center">
          <p class="p-titulo-bold">Validación de identidad</p>
          <p class="p-titulo-normal">
            {{
              preguntasValidacionIden[indexPreguntaValidacion]
                .descripcionPregunta
            }}
          </p>

          <div
            v-for="item in preguntasValidacionIden[indexPreguntaValidacion]
              .Opciones.Opcion"
            :key="item.numeroOpcion"
          >
            <button
              :class="['btn-sel__validacion', tema.class_input]"
              @click="
                sgtePreguntaValidacion(
                  item.numeroOpcion,
                  preguntasValidacionIden[indexPreguntaValidacion]
                )
              "
            >
              {{ item.descripcionOpcion }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="modalErrorValidacion" class="modal100-mobile">
      <div :class="['content-form-registroVal text-center', tema.class_color]">
        <div class="text-center p-titulo-normal mt-10">
          <img src="@/assets/img/warning.svg" alt="error de validacion" />
          <p class="my-10">
            {{ mensajeError }}
          </p>
          <p>
            {{ mensajeError2 }}
          </p>
          <v-btn
            id="errorValidacion"
            width="45%"
            :color="tema.colorSecundario"
            height="48px"
            @click="errorValidacionVolver"
          >
            Volver a intentar
          </v-btn>
        </div>
      </div>
    </div>
    <div v-if="loadingSeguirConoc">
      <v-progress-circular :size="50" color="primary" indeterminate />
    </div>
    <div v-if="modalSeguirConoc" class="modal100-mobile">
      <div>
        <div
          :class="['content-form-registroVal text-center', tema.class_color]"
        >
          <div class="text-center p-titulo-normal mt-10">
            <div class="pt-8">
              <span class="icon-check icon-ok" />
            </div>
            <p class="text-validacion-ok">
              ¡{{ tema.textos.valIdentidadCorrecta }}!
            </p>
            <div class="text-center mt-8">
              <v-btn
                id="validacionCorrecta"
                width="45%"
                :color="tema.colorSecundario"
                height="48px"
                @click="seguirConociendonos"
              >
                Continuar
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="modalErrorPreguntas" class="modal100-mobile">
      <div :class="['content-form-registroVal text-center', tema.class_color]">
        <div class="text-center p-titulo-normal mt-10">
          <img src="@/assets/img/warning.svg" alt="error de validacion" />
          <p class="my-10">
            {{ mensajeError }}
          </p>
          <p v-if="mensajeError2 === 'USUARIO BLOQUEADO'">
            {{ tema.textos.userBloqValIdentidad }}.
          </p>
          <p>{{ mensajeError2 }}</p>
          <v-btn
            id="retornarValidacion"
            width="45%"
            :color="tema.colorSecundario"
            height="48px"
            @click="retornarFormulario"
          >
            Volver a intentar
          </v-btn>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialogDNIvencido" content-class="dialog-dniVencido">
      <div class="text-center">
        <div :class="[tema.class_color]">
          <div>
            <p class="titulo-dialog_dniVencido">
              SU DOCUMENTO NACIONAL DE IDENTIDAD (DNI) HA CADUCADO
            </p>
          </div>
          <div>
            <img src="@/assets/img/alert_red.svg" alt="error de validacion" />
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
</template>

<script>
import { mapState } from 'vuex'
import {
  APIM_EQUIFAX_PREGUNTAS,
  APIM_EQUIFAX_PREGUNTAS_VALIDAR,
  APIM_ONBOARDING_KEY,
} from '~/config/enviroment.config'
import { getHeaderAPIM } from '~/utils/clienteFormulario'
export default {
  layout: 'usuario',
  data() {
    return {
      indexPreguntaValidacion: 0,
      rptasIngresadasValidacion: {
        numeroOperacion: '',
        respuestas: [],
      },
      rptasCorrectasValidacion: {},
      modalPreguntasValidacion: false,
      modalErrorValidacion: false,
      modalSeguirConoc: false,
      preguntasValidacionIden: [],
      digito: '',
      apMat: '',
      apPat: '',
      nombres: '',
      valid: true,
      lazy: false,
      mensajeError: '',
      mensajeError2: '',
      modalErrorPreguntas: false,
      loading: false,
      loadingSeguirConoc: false,
      dialogDNIvencido: false,
    }
  },
  computed: {
    ...mapState([
      'modalValidacion',
      'logos',
      'empresa',
      'tema',
      'apiPreguntasEquifax',
      'apiValidPregeEquifax',
      'usuarioId',
      'usuario',
    ]),
  },
  methods: {
    // fc para traer la lista de preguntas de equifax
    getPreguntasEquifax() {
      this.loading = true
      this.dialogDNIvencido = false
      const typeDocEquifax =
        this.usuario.identityDocument.type === '2' ? '3' : '1'
      if (this.$refs.form.validate()) {
        const data = {
          document: this.usuario.identityDocument.number,
          documentType: typeDocEquifax,
          name: this.nombres,
          surname: this.apPat,
          lastName: this.apMat,
          verificationCode: this.digito,
        }
        this.$store.commit('setDatosPersonalesEquifax', data)
        this.$axios
          .post(APIM_EQUIFAX_PREGUNTAS, data, {
            headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
          })
          .then(({ data: equifaxData }) => {
            this.loading = false
            this.preguntasValidacionIden = equifaxData.preguntas
            this.rptasIngresadasValidacion.numeroOperacion =
              equifaxData.numeroOperacion
            this.comenzarValidacion()
          })
          .catch((error) => {
            this.loading = false
            if (error?.response?.data) {
              this.mensajeError = error.response.data.evaluationResult
              this.mensajeError2 = error.response.data.explanation2
            }
            this.errorPreguntas()
          })
      }
    },
    // fc para validar si las preguntas de son aprobadas o rechazadas
    async getValidarPreguntas(data) {
      await this.$axios
        .post(APIM_EQUIFAX_PREGUNTAS_VALIDAR, data, {
          headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
        })
        .then(({ data: equifaxData }) => {
          this.rptasCorrectasValidacion = equifaxData
          this.loadingSeguirConoc = false
          this.modalSeguirConoc = true
          this.guardarInformacion()
        })
        .catch((error) => {
          if (error?.response?.data?.mensaje) {
            this.mensajeError =
              'Tus respuestas fueron incorrectas ¿Probamos nuevamente?'
            this.loadingSeguirConoc = false
            this.modalErrorValidacion = true
          } else {
            alert(error)
          }
        })
    },
    // funcion para mostrar preguntas
    comenzarValidacion() {
      this.$store.commit('setModalValidacion', false)
      this.modalPreguntasValidacion = true
    },
    errorValidacionVolver() {
      this.modalErrorValidacion = false
      this.loadingSeguirConoc = true
      this.indexPreguntaValidacion = 0
      this.rptasIngresadasValidacion.respuestas = []

      const typeDocEquifax =
        this.usuario.identityDocument.type === '2' ? '3' : '1'
      const data = {
        document: this.usuario.identityDocument.number,
        documentType: typeDocEquifax,
        name: this.nombres,
        surname: this.apPat,
        lastName: this.apMat,
        verificationCode: this.digito,
      }

      this.$axios
        .post(APIM_EQUIFAX_PREGUNTAS, data, {
          headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
        })
        .then(({ data: equifaxData }) => {
          this.loading = !this.loading
          this.loadingSeguirConoc = false
          this.modalPreguntasValidacion = true
          this.preguntasValidacionIden = equifaxData.preguntas
          this.rptasIngresadasValidacion.numeroOperacion =
            equifaxData.numeroOperacion
        })
        .catch((error) => {
          this.loading = !this.loading
          this.loadingSeguirConoc = false
          if (error?.response?.data) {
            this.mensajeError = error.response.data.evaluationResult
            this.mensajeError2 = error.response.data.explanation2
          }
          this.errorPreguntas()
        })
    },
    // funcion para mostrar modal de error
    errorValidacion() {
      this.modalErrorValidacion = false
      this.modalPreguntasValidacion = true
      this.indexPreguntaValidacion = 0
      this.rptasIngresadasValidacion.respuestas = []
    },
    sgtePreguntaValidacion(numeroOpcion, item) {
      this.rptasIngresadasValidacion.respuestas.push({
        categoriaPregunta: item.categoriaPregunta,
        numeroPregunta: item.numeroPregunta,
        numeroOpcion,
      })
      if (this.indexPreguntaValidacion < 3) {
        this.indexPreguntaValidacion++
      } else {
        this.modalPreguntasValidacion = false
        this.loadingSeguirConoc = true
        this.getValidarPreguntas(this.rptasIngresadasValidacion)
      }
    },
    seguirConociendonos() {
      this.getInformacionUsuario()
      this.$store.commit('setmodalSeguirConoc', false)
    },
    async guardarInformacion() {
      const datos = {
        id: this.usuarioId,
        equifax_information: {
          envio: this.rptasIngresadasValidacion,
          respuesta: this.rptasCorrectasValidacion,
          isValidate: true,
        },
        equifax_values: {
          firstName: this.nombres.toUpperCase(),
          lastName: this.apPat.toUpperCase(),
          motherLastName: this.apMat.toUpperCase(),
        },
      }
      await this.$axios
        .post('/api/equifax-information', datos)
        .then(() => undefined)
    },
    getInformacionUsuario() {
      const cuenta = sessionStorage.getItem('account')

      const data = {
        cuenta,
      }

      this.$axios.post('/api/getLead', data).then((response) => {
        this.$store.dispatch('actionUpdateInformacionUsuario', response.data)
        if (response.data.financial_information) {
          this.$store.commit(
            'setSujetoObligado',
            response.data.financial_information.is_obliged_subject
          )
        }
        if (response.data.ibk_acceptance && response.data.confirm_ibk_mail) {
          // this.getDataIbk(
          //   response.data.identityDocument.number,
          //   response.data.identityDocument.type
          // )
          this.$store.commit('setRegistroAutorizacionIbk', true)
          this.$router.push('/mensaje-ibk')
        } else {
          this.$router.push('/perfil-usuario')
        }
      })
    },
    getDataIbk(document, typeDocyment) {
      this.$axios
        .get(
          `${this.state.apiDatosIbk}/${document}/${typeDocyment}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=W2UocNq052As0hrHR06EOqK5qHUNM_g6D7Q7EMLvhR8`
        )
        .then((res) => {
          this.$store.commit('setDataIbk', res.data)
        })
    },
    errorPreguntas() {
      this.modalErrorPreguntas = true
      this.$store.commit('setModalValidacion', false)
    },
    retornarFormulario() {
      this.modalErrorPreguntas = false
      this.$store.commit('setModalValidacion', true)
    },
    soloNumeros(e) {
      const key = e.charCode
      return key >= 48 && key <= 57
    },
    validaSoloNumeros(e) {
      if (!this.soloNumeros(e)) {
        e.preventDefault()
      }
    },
  },
}
</script>

<style>
.content-form-registroVal {
  padding: 30px 15px;
}
.img-val-id {
  height: 150px !important;
}
.btn-comenzar__validacion {
  width: 371px;
  color: #ffffff !important;
}
#retornarValidacion {
  color: #ffffff !important;
}
.form-validar .row-infoUsuariovi {
  margin-bottom: 15px;
  width: 100%;
}
.form-validar .input-profile,
.form-validar .input-profile-disabled {
  height: 50px;
  margin: 0px auto !important;
}
.form-validar .v-input input {
  text-transform: uppercase;
}
#validacionCorrecta {
  color: #ffffff;
  margin-bottom: 30px;
}
.text-validacion-ok {
  padding: 65px 0px 30px 0px;
  font-size: 20px;
}
#errorValidacion {
  color: #ffffff;
}

@media (min-width: 768px) {
  .content-form-registroVal {
    padding: 30px 20px;
  }
}
@media (min-width: 1025px) {
  .content-form-registroVal {
    padding: 30px 70px;
  }
}
@media (min-width: 1400px) {
}
</style>
