<template>
  <div class="d-flex">
    <div class="cnt-left-inicial">
      <div>
        <img class="img-inicial" :src="logos.imgLogin" alt="inteligo login" />
      </div>
      <img
        :src="logos.logoBlanco"
        alt="logo inteligo group"
        class="logo-inteligogroup"
      />
      <img
        src="@/assets/img/Vector.svg"
        alt="isotipo inteligo"
        class="vector-inteligo"
      />
    </div>
    <div v-if="!clienteAutoriza" class="cnt-right-inicial w-100 h-100">
      <div class="cnt-form-registrese">
        <div>
          <img :src="logos.logoLogin" alt="logo inteligo" />
        </div>

        <v-form
          ref="form"
          v-model="valid1"
          :lazy-validation="lazy1"
          class="form-cliente-ibk"
        >
          <div class="msj-autorizacion">
            <div>
              <span class="icon-check icon-ok-ibk" />
            </div>

            <span class="spn-autrizacion">
              {{ tema.textos.autorizacionIbk }}
              {{ nombreEmpresa }}.
            </span>
          </div>
          <div class="chk-autorizacion">
            <v-checkbox
              v-model="formRegistro.declaracion"
              :label="labelCheckbox"
              :color="tema.colorSecundario"
              :rules="[(v) => !!v || '']"
              required
            />
          </div>
          <small class="error-form">{{ errorValidacionCorreo }}</small>
          <div class="btn-autorizacion">
            <v-btn
              id="registrarAutorizacionIBK"
              :disabled="!valid1"
              class="btn-registro_usuario"
              :color="tema.colorPrimario"
              height="48px"
              @click.prevent="registrarAutorizacion"
            >
              CONTINUAR
            </v-btn>
            <div class="text-center pt-4">
              <v-btn
                id="noCompartirInformacionIBK"
                text
                :color="tema.colorSecundario"
                class="btn-url btn-no__ibk"
                @click="noAccederInformacion"
              >
                No deseo que Interbank acceda a mi información
              </v-btn>
            </div>
          </div>
        </v-form>
      </div>
    </div>
    <div v-if="clienteAutoriza" class="cnt-right-inicial w-100 h-100">
      <div class="cnt-form-registrese">
        <div>
          <img :src="logos.logoLogin" alt="logo inteligo" />
        </div>
        <v-form
          ref="form6"
          v-model="valid6"
          :lazy-validation="lazy6"
          class="form-cliente-ibk"
        >
          <div class="msj-autorizacion">
            <div>
              <span class="icon-check icon-ok-ibk" />
            </div>

            <span class="spn-autrizacion">
              <strong
                >{{ tema.textos.graciasClienteIbk }} {{ nombreEmpresa }}.
              </strong>
              <br />
              Para empezar este proceso de apertura de cuenta, le enviaremos un
              código de verificación como medida de seguridad al siguiente
              correo:
            </span>
          </div>
          <div class="chk-autorizacion">
            <v-radio-group
              v-model="correoIbk"
              row
              :rules="[(v) => !!v || 'Selecciona una opción']"
              required
              :disabled="disableMail"
            >
              <v-radio
                :label="ocultarEmail(correoIbk)"
                :value="correoIbk"
                :color="tema.colorPrimario"
              />
            </v-radio-group>
            <p v-if="noSeEncontroCorreo">
              <small
                >{{ tema.textos.noSeEncontroCorreoIbk }} {{ correo }} haciendo
                clic en "¿NO SON TUS DATOS?"</small
              >
            </p>
          </div>

          <div class="mt-4 mb-4">
            <button id="noSonDatosIBK" @click.prevent="noCompartirInformacion">
              ¿NO SON TUS DATOS?
            </button>
            <v-btn
              id="sonDatosIBK"
              :disabled="!valid6"
              :color="tema.colorPrimario"
              @click.prevent="validate1"
            >
              CONTINUAR
            </v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>
<script>
import * as Msal from 'msal'
import { mapState } from 'vuex'
import { b2cPolicies, msalConfig } from '~/utils/msal'
import {
  APIM_IBK_CUSTOMER_CONTACT,
  APIM_ONBOARDING_KEY,
} from '~/config/enviroment.config'
import { getHeaderAPIM } from '~/utils/clienteFormulario'
export default {
  layout: 'default',
  data() {
    return {
      modelValidaCorreo: '',
      modalverificarCorreo: false,
      modalGuardalo: false,
      modalBienvenido: false,
      modalBtnRegistro: false,
      modalFormRegistro: false,
      formRegistro: {
        declaracion: false,
      },
      valid1: true,
      lazy1: false,
      lazy: false,
      valid: true,
      mensajeErrorRegistro: '',
      errorValidacionCorreo: '',
      labelCheckbox: `Autorizo a Interbank a compartir mi información con ${this.$store.state.nombreEmpresa}. Mi autorización también incluye la información de los números de mis cuentas.`,
      clienteAutoriza: false,
      correoIbk: '',
      dataRegistro: {},
      valid6: true,
      lazy6: false,
      disableMail: true,
      noSeEncontroCorreo: false,
    }
  },
  computed: {
    ...mapState([
      'modalRegistro',
      'tema',
      'empresa',
      'logoEmpresaPrincipal',
      'modalValidacion',
      'nombreEmpresa',
      'correo',
      'usuarioId',
      'usuario',
      'idContactoCRM',
      'logos',
    ]),
  },
  mounted() {
    this.obtenerCorreoIbk()
  },
  methods: {
    resetForm() {
      this.$refs.form.reset()
    },
    reiniciarMensajeError() {
      this.mensajeErrorRegistro = ''
    },
    registrarAutorizacion() {
      this.clienteAutoriza = true
      // this.$store.commit('setRegistroAutorizacionIbk', true)
      // this.guardarAutorizacion()
      // guardar la autorizacion del usuario
      this.dataRegistro.ibk_acceptance = true
    },
    validate1() {
      this.dataRegistro.confirm_ibk_mail = true
      this.registrarADIBK()
    },
    noAccederInformacion() {
      this.dataRegistro.ibk_acceptance = false
      this.registrarAD()
    },
    noCompartirInformacion() {
      this.dataRegistro.confirm_ibk_mail = false
      this.registrarAD()
    },
    guardarAutorizacion() {
      const data = {
        id: this.usuarioId,
        ibk_acceptance: {
          statement: this.formRegistro.declaracion,
          date: new Date(),
        },
      }
      this.$axios.post('/api/ibk-acceptance', data)
    },
    obtenerCorreoIbk() {
      this.$axios
        .get(
          `${APIM_IBK_CUSTOMER_CONTACT}/${this.usuario.identityDocument.type}/${this.usuario.identityDocument.number}`,
          {
            headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
          }
        )
        .then(({ data }) => {
          this.correoIbk = data.email.value
          this.disableMail = false
        })
        .catch(() => {
          this.noSeEncontroCorreo = true
        })
    },
    ocultarEmail(email) {
      let simbolos = ''
      let nEmail = ''
      let posArroba = 0

      posArroba = email.indexOf('@')

      for (let index = 0; index < posArroba - 4; index++) {
        simbolos += '*'
      }

      nEmail =
        email.substring(0, 3) +
        simbolos +
        email.substring(posArroba - 1, posArroba) +
        email.substring(posArroba, email.length)
      return nEmail
    },
    async crearLeadBD(paccountId) {
      const lsruta = localStorage.getItem('ruta')
      const ruta = lsruta || ''
      this.dataRegistro.emailAdress = this.usuario.correo
      this.dataRegistro.identityDocument = this.usuario.identityDocument
      this.dataRegistro.companyJoined = this.empresa
      this.dataRegistro.date = new Date()
      this.dataRegistro.is_ibk = true
      this.dataRegistro.is_sab = false
      this.dataRegistro.emailAdress_sab = null
      this.dataRegistro.accountIdentifier = paccountId
      this.dataRegistro.idContactCRM = this.idContactoCRM
      this.dataRegistro.route = ruta
      await this.$axios.post('/api/addLead', this.dataRegistro).then((res) => {
        this.$store.commit('setUsuarioId', res.data.id)
      })
    },
    async crearLeadBDIBK(paccountId) {
      const lsruta = localStorage.getItem('ruta')
      const ruta = lsruta || ''
      this.dataRegistro.emailAdress = this.correoIbk
      this.dataRegistro.identityDocument = this.usuario.identityDocument
      this.dataRegistro.companyJoined = this.empresa
      this.dataRegistro.emailAdress_initial = this.usuario.correo
      this.dataRegistro.date = new Date()
      this.dataRegistro.is_ibk = true
      this.dataRegistro.is_sab = false
      this.dataRegistro.emailAdress_sab = null
      this.dataRegistro.accountIdentifier = paccountId
      this.dataRegistro.confirm_ibk_mail = true
      this.dataRegistro.ibk_acceptance = true
      this.dataRegistro.idContactCRM = this.idContactoCRM
      this.dataRegistro.route = ruta
      await this.$axios.post('/api/addLead', this.dataRegistro).then((res) => {
        this.$store.commit('setUsuarioId', res.data.id)
      })
    },
    async registrarAD() {
      const parameters = {
        authority: b2cPolicies.authorities.signUp.authority,
        loginHint: this.usuario.correo,
        extraQueryParameters: { ui_locales: 'es' },
      }
      const client = new Msal.UserAgentApplication(msalConfig)
      await client
        .loginPopup(parameters)
        .then(() => {
          if (client.getAccount()) {
            sessionStorage.setItem(
              'account',
              client.getAccount().accountIdentifier
            )
            this.$store.commit('setLoged', true)
            this.$router.push('/validar-identidad')
            this.crearLeadBD(client.getAccount().accountIdentifier)
          }
        })
        .catch(() => undefined)
    },
    async registrarADIBK() {
      const parameters = {
        authority: b2cPolicies.authorities.signUp.authority,
        loginHint: this.correoIbk,
        extraQueryParameters: { ui_locales: 'es' },
      }
      const client = new Msal.UserAgentApplication(msalConfig)
      await client
        .loginPopup(parameters)
        .then(() => {
          if (client.getAccount()) {
            sessionStorage.setItem(
              'account',
              client.getAccount().accountIdentifier
            )
            this.$store.commit('setLoged', true)
            this.$router.push('/validar-identidad')
            this.crearLeadBDIBK(client.getAccount().accountIdentifier)
          }
        })
        .catch(() => undefined)
    },
  },
}
</script>
<style lang="scss">
.msj-autorizacion {
  position: relative;
  width: 100%;
  background: #fafafa;
  border-left: 3px solid #24a148;
  padding: 15px 20px 15px 15px;
  margin-top: 48px;
  display: flex;
  font-size: 14px;
  .spn-autrizacion {
    padding-left: 20px;
  }
}
.btn-no__ibk span {
  display: block;
  width: 100%;
  white-space: initial;
}
.cnt-cliente__autoriza {
  padding: 30px;
}
.chk-autorizacion {
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
}
.btn-autorizacion {
  width: 100%;
}
.form-cliente-ibk {
  padding: 0px;
}
.contenedor-sab #noSonDatosIBK {
  width: 100%;
  height: 48px;
  border: 2px solid #2765f5;
  color: #2765f5;
  margin-bottom: 20px;
}
.contenedor-certia #noSonDatosIBK {
  width: 100%;
  height: 48px;
  border: 2px solid #84542c;
  color: #84542c;
}
#sonDatosIBK {
  width: 100%;
  height: 48px;
  color: #ffffff;
}
@media (min-width: 768px) {
  .chk-autorizacion {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .form-cliente-ibk {
    padding: 0px 50px;
  }
}
@media (min-width: 1025px) {
  .msj-autorizacion {
    width: 460px;
    padding: 20px 40px 20px 20px;
  }
  .chk-autorizacion {
    width: 458px;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .btn-autorizacion {
    width: 354px;
  }
  .form-cliente-ibk {
    padding: 0px;
  }
  .contenedor-sab #noSonDatosIBK {
    width: 228px;
    margin-bottom: auto;
  }
  .contenedor-certia #noSonDatosIBK,
  #sonDatosIBK {
    width: 228px;
  }
}
@media (min-width: 1400px) {
}
</style>
