<template>
  <div class="d-flex">
    <div class="cnt-left-inicial">
      <div>
        <img class="img-inicial" :src="logos.imgLogin" alt="inteligo login">
      </div>
      <img
        :src="logos.logoBlanco"
        alt="logo inteligo group"
        class="logo-inteligogroup"
      >
      <img
        v-if="empresa === 'sab'"
        src="@/assets/img/Vector.svg"
        alt="isotipo inteligo"
        class="vector-inteligo"
      >
    </div>
    <div class="cnt-right-inicial w-100 h-100">
      <div class="cnt-form-registrese">
        <div>
          <img :src="logos.logoLogin" alt="logo inteligo">
        </div>

        <div class="msj-iniciar_sesion form-registrese">
          <div>{{ tema.textos.cuentaConRegistro }}</div>
          <v-btn
            id="iniciarSesion"
            class="btn-iniciar_sesion"
            @click="iniciarSesion"
          >
            INICIAR SESIÓN
          </v-btn>
        </div>

        <p
          :class="[
            'titulo_bienvenida_inicial',
            tema.class_color,
          ]"
        >
          Bienvenido(a) al registro de usuario
        </p>
        <p class="text-aviso-registro color-p-text">
          {{ tema.textos.mayorde18 }}
        </p>
        <v-form
          ref="form"
          v-model="valid1"
          :lazy-validation="lazy1"
          class="form-registrese"
        >
          <div class="cnt-ipt__registrate">
            <label
              class="lbl-input"
              for="correoRegistro"
            >Correo electrónico</label>
            <v-text-field
              id="correoRegistro"
              v-model="formRegistro.correo"
              :rules="rules.correo"
              label="Ingrese su correo electrónico"
              background-color="transparent"
              class="ipt-registrate"
              required
              solo
              height="39px"
              type="email"
            />
          </div>
          <div class="cnt-ipt__registrate ipt-doc">
            <div class="select-doc">
              <label>Tipo de documento</label>
              <v-select
                v-model="formRegistro.identityDocument.type"
                :items="listaDocumentos"
                item-text="name"
                item-value="id"
                solo
                background-color="transparent"
                class="ipt-registrate"
                height="39px"
              />
            </div>
            <div class="input-doc">
              <label>Número de documento</label>
              <v-text-field
                v-if="formRegistro.identityDocument.type === '1'"
                v-model="formRegistro.identityDocument.number"
                maxlength="8"
                label="Número de documento"
                background-color="transparent"
                class="ipt-registrate"
                required
                solo
                height="39px"
                type="text"
                :rules="rules.dni"
                @keypress="validaSoloNumeros"
                @keyup="reiniciarMensajeError"
              />
              <v-text-field
                v-if="formRegistro.identityDocument.type === '2'"
                v-model="formRegistro.identityDocument.number"
                maxlength="12"
                label="Número de documento"
                background-color="transparent"
                class="ipt-registrate"
                required
                solo
                height="39px"
                type="text"
                :rules="[(v) => !!v || 'Ingrese su CE']"
                @keyup="reiniciarMensajeError"
              />
            </div>
          </div>
          <small class="error-form">{{ errorValidacionCorreo }}</small>
          <p class="error-msj">
            {{ mensajeErrorRegistro }}
          </p>
          <div class="cnt-ipt__registrate">
            <v-btn
              id="registrarme"
              :disabled="!valid1 || loading"
              :loading="loading"
              class="btn-registro_usuario"
              :color="tema.colorPrimario"
              height="48px"
              @click.prevent="validate1"
            >
              REGISTRARME
            </v-btn>
          </div>
        </v-form>
        <div class="footer">
          <div>
            Copyright © 2021 Inteligo Group. Todos los derechos reservados.
          </div>
          <div>
            <a
              href="https://saonboardinginteligo.blob.core.windows.net/documentos/Términos y Condiciones ODI.pdf"
              target="_blank"
            >Términos y condiciones</a>
            |
            <a
              href="https://saonboardinginteligo.blob.core.windows.net/documentos/POLÍTICA DE PRIVACIDAD DE CLIENTES Y POTENCIALES CLIENTES - Digital Jul 2020.pdf"
              target="_blank"
            >Políticas de privacidad</a>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialog" content-class="dialog-clienteSab">
      <div class="icon-cerrar-modal">
        <span
          class="icon-cerrar"
          @click=";(dialog = false), (loading = !loading)"
        />
      </div>

      <div :class="[tema.class_color]">
        <div>
          <span class="icon-check icon-cliente_sab" />
          <span class="msj-importante"> Importante</span>
        </div>
        <hr>
        <div class="msj-cliente_sab">
          Hemos detectado que <strong> ya es cliente de Intéligo SAB</strong>,
          nos estaremos poniendo en contacto con usted. <br>
          ¡Muchas gracias!
        </div>
      </div>
    </v-dialog>
    <v-dialog v-model="dialogDNIvencido" content-class="dialog-dniVencido">
      <div class="text-center">
        <div :class="[tema.class_color]">
          <div>
            <p class="titulo-dialog_dniVencido">
              VALIDAR DOCUMENTO DE IDENTIDAD
            </p>
          </div>
          <div>
            <img src="@/assets/img/alert_red.svg" alt="error de validacion">
          </div>
        </div>
        <div class="mb-8">
          ¡Hola, Validaremos su <strong>Documento de Identidad *</strong> para
          tu registro en el Onboarding Digital
        </div>
        <v-btn :color="tema.colorPrimario" @click.prevent="validate1">
          CONTINUAR
        </v-btn>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import * as Msal from 'msal';
import { mapState, mapActions, mapGetters } from 'vuex';
import { b2cPolicies, msalConfig } from '~/utils/msal';
import {btoa} from '~/middleware/server/encrypt/base64-encrypt';
import { APIM_CUSTOMER_EXISTING, APIM_ONBOARDING_KEY, OBTENER_USUARIO_QUERY, getCrmContactFindUrl } from '~/config';
import { getHeaderAPIM } from '~/utils/clienteFormulario';
export default {
  layout: 'default',
  data() {
    return {
      dialog: false,
      modelValidadalo: false,
      datosUsuarioLocal: '',
      rules: {
        dni: [
          v =>
            !v ||
            /^\d{8}(?:[-\s]\d{4})?$/.test(v) ||
            'El número debe tener 8 dígitos',
          v => !!v || 'Ingrese su documento',
        ],
        contrasenia: [val => (val || '').length > 0 || 'Campo obligatorio'],
        correo: [
          v =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            'Ingresa un correo válido',
          v => !!v || 'Ingrese su correo',
        ],
      },
      drawer: null,
      modalIniciarSesion: false,
      item: 0,
      valid: true,
      lazy: false,
      status: false,
      modalBienvenido: false,
      modalBtnRegistro: false,
      modalFormRegistro: false,
      formRegistro: {
        identityDocument: {
          type: '1',
          number: '',
        },
        correo: '',
        declaracion: false,
      },
      listaDocumentos: [
        { id: '1', name: 'DNI' },
        { id: '2', name: 'CE' },
      ],
      valid1: true,
      lazy1: false,
      mensajeErrorRegistro: '',
      errorValidacionCorreo: '',
      nombre: '',
      loading: false,
      loadingIngresar: false,
      is_sab: '',
      is_ibk: '',
      emailAdress_sab: '',
      idContactoCRM: {},
      dialogDNIvencido: false,
    }
  },
  computed: {
    ...mapGetters(['informacionUsuario']),
    ...mapState([
      'modalRegistro',
      'tema',
      'empresa',
      'logos',
      'modalValidacion',
      'modalValidacionCliente',
      'correo',
    ]),
  },
  watch: {
    informacionUsuario(newVal) {
      if (newVal) {
        if (
          !newVal.equifax_information ||
          !newVal.equifax_information.isValidate
        ) {
          this.$router.push('/validar-identidad')
        } else if (newVal.equifax_information.isValidate) {
          this.$router.push('/perfil-usuario')
        }
      }
    },
  },
  created() {
    this.loadListasGenerales();
  },
  methods: {
    ...mapActions([
      'obtenerUsuarioDesdeCosmosYSetLogin',
    ]),
    ...mapActions({
      loadListasGenerales: 'general/loadListasGenerales',
      enviarCorreoAsesor: 'sendMail/enviarCorreoAsesor',
    }),
    resetForm() {
      this.$refs.form.reset()
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
    reiniciarMensajeError() {
      this.mensajeErrorRegistro = ''
    },
    async validate1() {
      this.loading = !this.loading
      this.dialogDNIvencido = false
      if (this.$refs.form.validate()) {
        this.$store.commit('setUsuario', this.formRegistro)
        const data = {
          emailAdress: this.formRegistro.correo,
          dni: this.formRegistro.identityDocument.number,
        }

        await this.$axios
          .post('/api/consultLead', data)
          .then((leadResponse) => {
            if (leadResponse.data === 'USUARIO NO ENCONTRADO') {
              this.mensajeErrorRegistro = ''
              this.$axios
                .get(`${APIM_CUSTOMER_EXISTING}/${this.formRegistro.identityDocument.type}/${this.formRegistro.identityDocument.number}`,
                {
                  headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
                })
                .then(({data: verificarDNIData}) => {
                  this.loading = !this.loading;
                  this.idContactoCRM.crmContactId = verificarDNIData.crmContactId || '';

                  this.idContactoCRM.crmAddionalInformationId = verificarDNIData.crmAddionalInformationId || '';

                  this.idContactoCRM.owner = verificarDNIData.owner || '';

                  this.idContactoCRM.potencialidad = verificarDNIData.potencialidad || '';

                  this.idContactoCRM.rs_canal = verificarDNIData.rs_canal || '';

                  this.$store.commit('setIdContactoCRM', this.idContactoCRM);
                  if (verificarDNIData.is_sab) {
                    this.$store.commit('setClientempresa', 'is_sab');
                    this.dialog = true;
                    this.enviarCorreoAsesor({
                      correo: this.formRegistro.correo,
                      numeroDocumento: this.formRegistro.identityDocument.number,
                    });
                  } else if (verificarDNIData.is_ibk) {
                    this.$store.commit('setClientempresa', 'is_ibk');
                    this.$store.commit('setModalValidacionCliente', true);
                  } else {
                    this.registrarAD();
                    this.$store.commit('setClientempresa', '');
                    this.$store.commit('setCorreo', this.formRegistro.correo);
                  }
                })
                .catch(() => {
                  this.loading = !this.loading
                })
            } else if (leadResponse.data === 'USUARIO REGISTRADO') {
              this.mensajeErrorRegistro = 'Usuario registrado'
              this.loading = !this.loading
            }
          })
          .catch(() => {
            this.loading = !this.loading
            this.$router.push('/error')
          })
      } else {
        this.mensajeErrorRegistro =
          'Ha ocurrido un error, por favor vuelve a intentarlo'
        this.loading = !this.loading
      }
    },
    async crearLeadBD(paccountId) {
      const lsruta = localStorage.getItem('ruta')
      const ruta = lsruta || ''
      const dataRegistro = {
        emailAdress: this.formRegistro.correo,
        identityDocument: this.formRegistro.identityDocument,
        companyJoined: this.empresa,
        date: new Date(),
        is_ibk: this.is_ibk,
        is_sab: this.is_sab,
        emailAdress_sab: this.emailAdress_sab,
        idContactCRM: this.idContactoCRM,
        accountIdentifier: paccountId,
        route: ruta,
      }
      await this.$axios.post('/api/addLead', dataRegistro).then((res) => {
        this.$store.commit('setUsuarioId', res.data.id)
      })
    },
    async iniciarSesion() {
      const parameters = {
        authority: b2cPolicies.authorities.signIn.authority,
        extraQueryParameters: { ui_locales: 'es' },
      }
      const client = new Msal.UserAgentApplication(msalConfig)
      await client
        .loginPopup(parameters)
        .then(() => {
          if (client.getAccount()) {
            this.$store.commit('setLoged', true);
            const accountIdentifier = client.getAccount().accountIdentifier;
            sessionStorage.setItem('account', accountIdentifier);
            this.obtenerUsuarioDesdeCosmosYSetLogin({ cuenta: accountIdentifier });
          }
        })
        .catch(() => undefined)
    },
    async registrarAD() {
      const parameters = {
        authority: b2cPolicies.authorities.signUp.authority,
        loginHint: this.formRegistro.correo,
        extraQueryParameters: { ui_locales: 'es' },
      }
      const client = new Msal.UserAgentApplication(msalConfig);
      const {type: type, number: number} = this.formRegistro.identityDocument;
      const usuarioCRM = await this.getUsuarioCRM(type, number);
      await client.loginPopup(parameters).then(async() => {
        if (client.getAccount()) {
          sessionStorage.setItem('account', client.getAccount().accountIdentifier
          );
          this.$store.commit('setLoged', true);
          await this.crearLeadBD(client.getAccount().accountIdentifier);
          if(usuarioCRM.length != 0){
            const dataConsult = {
              "tipo_doc": type, 
              "num_doc": number, 
              "createdate": new Date().toISOString()
            };
            const encrypt = btoa(JSON.stringify(dataConsult));
            const encode = encodeURIComponent(encrypt);
            window.location.href = `/loading-update?q=${encode}`;
          }else{
            this.$router.push('/validar-identidad');
          }
        }
      }).catch(() => undefined);
    },
    async getUsuarioCRM(type, number) {
      const response = await this.$axios.get(getCrmContactFindUrl(type,number),{
        params: {
          select: OBTENER_USUARIO_QUERY.select,
          expand: OBTENER_USUARIO_QUERY.expand,
        },
        headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
      });
      return response.data;
    }
  },
}
</script>
<style>
.contenedor-sab .btn-iniciar_sesion {
  border: 2px solid #31489b;
  color: #31489b;
}
.contenedor-certia .btn-iniciar_sesion {
  border: 2px solid #84542c;
  color: #84542c;
}
.text-aviso-registro {
  margin-top: 12px;
  margin-bottom: 12px;
}
.icon-cerrar-modal {
  position: absolute;
  right: 0px;
  top: 35px;
  width: 50px;
  cursor: pointer;
}
.msj-importante {
  padding-left: 15px;
  color: #000000;
}
.dialog-clienteSab {
  border-top: 3px solid #24a148;
  width: 407px;
  height: 190px;
  background: #ffffff;
  padding: 20px;
  border-radius: 0px;
  position: relative;
}
.dialog-dniVencido {
  width: 90%;
  background: #ffffff;
  padding: 20px;
  border-radius: 0px;
  position: relative;
  padding: 40px;
}
.dialog-dniVencido button {
  color: #ffffff !important;
}
.titulo-dialog_dniVencido {
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.03em;
  margin-bottom: 40px;
}
.dialog-dniVencido img {
  margin-bottom: 30px;
}
.icon-cliente_sab {
  background-color: #039644;
  border-radius: 100%;
  padding: 8px;
  display: inline-block;
  margin: 15px 0px;
  font-size: 10px;
}
.icon-cliente_sab::before {
  color: #ffffff;
}
.dialog-clienteSab hr {
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid #eaeaea;
}
.msj-cliente_sab {
  font-size: 15px;
  line-height: 18px;
}
.cnt-form-registrese img {
  height: 36px;
}
.btn-iniciar_sesion {
  height: 36px;
  width: 100%;
  background-color: transparent !important;
  box-shadow: none !important;
  border: none;
  text-decoration: none;
}
.msj-iniciar_sesion .color-p-text {
  display: none;
}
.form-registrese {
  width: 100%;
}
.btn-registro_usuario {
  width: 100%;
}
.cnt-form-registrese {
  width: 100%;
  padding: 30px 20px;
}
.cnt-form-registrese .footer {
  bottom: 18px;
}
@media (min-width: 768px) {
  .cnt-form-registrese img {
    height: auto;
  }
  .msj-iniciar_sesion {
    top: 50px;
    right: 40px;
  }
  .dialog-dniVencido {
    width: 500px;
  }
}
@media (min-width: 1025px) {
  .text-aviso-registro {
    margin-top: 16px;
    margin-bottom: 16px;
  }
  .msj-iniciar_sesion .color-p-text {
    display: inline-block;
  }
  .cnt-form-registrese {
    padding-left: 150px;
  }
  .form-registrese {
    width: 349px;
  }
  .msj-iniciar_sesion {
    top: 28px;
    right: 40px;
  }
}
@media (min-width: 1400px) {
  .text-aviso-registro {
    margin-top: 34px;
    margin-bottom: 34px !important;
  }
  .cnt-form-registrese {
    padding-left: 185px;
    margin-top: 164px;
  }
}
</style>
