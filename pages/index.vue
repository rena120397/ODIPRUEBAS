<template>
  <v-layout>
    <div v-if="empresa !== ''" class="w100">
      <div
        :class="[tema.class_contenedor_color]"
      >
        <div v-if="!modalValidacionCliente">
          <RegistroUsuario />
        </div>
        <div v-if="modalValidacionCliente">
          <ValidarCliente />
        </div>
      </div>
    </div>
    <div v-else class="d-flex">
      <div class="cnt-left-inicial h100-p">
        <div class="h100-p">
          <img
            class="img-inicial"
            src="@/assets/img/img_inicio.svg"
            alt="inteligo group"
          >
        </div>
        <img
          src="@/assets/img/inteligo_group.svg"
          alt="logo inteligo group"
          class="logo-inteligogroup"
        >
        <img
          src="@/assets/img/Vector.svg"
          alt="isotipo inteligo"
          class="vector-inteligo"
        >
      </div>
      <div class="cnt-right-inicial">
        <v-container class="cnt-right-inicial__container">
          <v-row justify="center">
            <v-col cols="12">
              <div class="cnt-right-form">
                <div class="content-img d-flex justify-space-between">
                  <img
                    src="@/assets/img/logo_sab.svg"
                    alt="logo inteligo sab"
                  >
                </div>
                <div class="inpag">
                  <p class="titulo_bienvenida_inicial">
                    Bienvenido(A) a Inteligo group
                  </p>
                  <p class="descripcion_bienvenida_inicial">
                    Gracias por su interés. Para brindarle la asesoría
                    financiera que mejor se adecúe a sus necesidades, le
                    agradeceremos responder estas breves consultas:
                  </p>
                  <v-form ref="form7" v-model="valid7" :lazy-validation="lazy7">
                    <div>
                      <label for="">Le interesa</label>
                      <br>
                      <v-radio-group
                        v-model="productoInteres"
                        :rules="[(v) => !!v || 'Selecciona una opción']"
                        required
                      >
                        <v-radio
                          label="Productos de inversión en general"
                          value="productos_general"
                          color="2765F5"
                        />
                        <v-radio
                          label="Acciones"
                          value="acciones"
                          color="2765F5"
                        />
                      </v-radio-group>
                    </div>

                    <div>
                      <label for="">Monto aproximado que desea invertir</label>
                      <br>
                      <v-radio-group
                        v-model="monto"
                        :rules="[(v) => !!v || 'Selecciona una opción']"
                        required
                        color="2765F5"
                        @change="mostrarMensajeCertia"
                      >
                        <v-radio
                          label="Menos de $10,000"
                          value="Menos_de_$10,000"
                          color="2765F5"
                        />
                        <v-radio
                          label="Entre $10,000 a $50,000"
                          value="Entre_$10,000_a_$50,000"
                          color="2765F5"
                        />
                        <v-radio
                          label="Entre $50,000 a $100,000"
                          value="Entre_$50,000_a_$100,000"
                          color="2765F5"
                        />
                        <v-radio
                          label="Más de $100,000"
                          value="Mas_de_$100,000"
                          color="2765F5"
                        />
                      </v-radio-group>
                    </div>
                    <div>
                      <div>
                        <small class="descripcion_bienvenida_inicial">
                          Gracias por completar su información, en base a la
                          cual le invitamos a continuar en Intéligo SAB, nuestra
                          plataforma en asesoría de inversiones.
                        </small>
                      </div>
                      <v-btn
                        id="continuarSegmentacion"
                        :disabled="!valid7"
                        class="btn-conocer"
                        @click="irConocer"
                      >
                        CONTINUAR
                      </v-btn>
                    </div>
                  </v-form>
                </div>
                <div class="footer">
                  <div>
                    Copyright © 2021 Inteligo Group. Todos los derechos
                    reservados.
                  </div>
                  <div>
                    <a
                      href="https://saonboardinginteligo.blob.core.windows.net/documentos/Términos y Condiciones ODI.pdf"
                    >Términos y condiciones</a>
                    |
                    <a
                      href="https://saonboardinginteligo.blob.core.windows.net/documentos/POLÍTICA DE PRIVACIDAD DE CLIENTES Y POTENCIALES CLIENTES - Digital Jul 2020.pdf"
                    >Políticas de privacidad</a>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-layout>
</template>

<script>
import * as Msal from 'msal';
import { mapState, mapActions } from 'vuex';
import { msalConfig, loginRequest } from '~/utils/msal';
import RegistroUsuario from '~/components/RegistroUsuario.vue';
import ValidarCliente from '~/components/ValidarCliente.vue';
export default {
  components: {
    RegistroUsuario,
    ValidarCliente,
  },
  layout: 'default',
  data() {
    return {
      productoInteres: '',
      monto: '',
      valid7: true,
      lazy7: false,
      mensajeCertia: null,
    }
  },
  computed: {
    ...mapState([
      'tema',
      'empresa',
      'modalValidacionCliente',
      'canales',
    ]),
  },
  mounted() {
    this.loadCanales();
  },
  methods: {
    ...mapActions(['setCertia', 'setSAB']),
     ...mapActions({
      loadCanales: 'general/loadCanales',
    }),
    mostrarMensajeCertia() {
      if (
        (this.productoInteres === 'productos_general' &&
          this.monto === 'Mas_de_$100,000') ||
        (this.productoInteres === 'productos_general' &&
          this.monto === 'Entre_$50,000_a_$100,000') ||
        (this.productoInteres === 'acciones' &&
          this.monto === 'Mas_de_$100,000')
      ) {
        this.mensajeCertia = true
      } else {
        this.mensajeCertia = false
      }
    },
    quieroSerCertia() {
      this.setCertia()
      window.location.href = '#certia'
      location.reload()
    },
    quieroSerSAB() {
      this.setSAB()
      window.location.href = '#sab'
      location.reload()
    },
    getAccount() {
      const client = new Msal.UserAgentApplication(msalConfig)
      if (client.getAccount()) {
        client.acquireTokenSilent(loginRequest).then((response) => {
          // get access token from response
          if (response.idToken.rawIdToken) {
            // this.isLogged = true
          }
        })
      }
    },
    irConocer() {
      if (
        (this.productoInteres === 'productos_general' &&
          this.monto === 'Mas_de_$100,000') ||
        (this.productoInteres === 'productos_general' &&
          this.monto === 'Entre_$50,000_a_$100,000') ||
        (this.productoInteres === 'acciones' &&
          this.monto === 'Mas_de_$100,000')
      ) {
        this.quieroSerCertia()
      } else {
        this.quieroSerSAB()
      }
      localStorage.setItem('potencial', this.computedPotencial(this.monto))
      localStorage.setItem('producto', this.productoInteres)
      this.obtenerCanal()
    },
    computedPotencial(obj) {
      let valObj = 0
      switch (obj) {
        case 'Menos_de_$10,000':
          valObj = 11
          break
        case 'Entre_$10,000_a_$50,000':
          valObj = 10
          break
        case 'Entre_$50,000_a_$100,000':
          valObj = 9
          break
        case 'Mas_de_$100,000':
          valObj = 12
          break
        default:
          break
      }
      return valObj
    },
    obtenerCanal() {
      const canalSource = this.$route.query.utm_source
      const canalCampaign = this.$route.query.utm_campaign
      const source = this.$route.query.source
      let canalCRM = {}
      canalCRM.rs_canalid = `${process.env.guidCanal}`
      if (source !== undefined && source !== '') {
        canalCRM = this.canales.find(
          element =>
            element.rs_name.split(' ').join('-').toLowerCase() ===
            source.toLowerCase()
        )
      } else if (
        canalSource !== undefined &&
        canalSource !== '' &&
        canalCampaign !== undefined &&
        canalCampaign !== ''
      ) {
        const nseosem = canalCampaign.toLowerCase().includes('ads')
          ? 'seo'
          : 'sem'

        const nempr = canalCampaign.toLowerCase().includes('sab')
          ? 'ai'
          : canalCampaign.toLowerCase().includes('certia')
            ? 'ce'
            : ''

        const nsource = canalSource.toLowerCase().includes('google')
          ? 'google'
          : canalSource.toLowerCase().includes('fb') ||
            canalSource.toLowerCase().includes('facebook')
            ? 'fb'
            : canalSource.toLowerCase().includes('linkedin')
              ? 'linkedin'
              : ''

        canalCRM = this.canales.find(
          element =>
            element.rs_name.toLowerCase().includes(nempr) &&
            element.rs_name.toLowerCase().includes(nsource) &&
            element.rs_name.toLowerCase().includes(nseosem)
        )
      }
      if (canalCRM !== undefined) {
        localStorage.setItem('canal', canalCRM.rs_canalid)
      }
      localStorage.setItem('ruta', this.$route.fullPath)
    },
  },
}
</script>
<style>
.cnt-right-inicial__container {
  margin-top: 30px;
}
</style>
