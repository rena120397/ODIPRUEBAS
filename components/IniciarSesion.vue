<template>
  <div class="contenedor-if">
    <div class="modal-formRegistro modal100-mobile">
      <div
        :class="[
          'content-form-registro',
          tema.class_color,
        ]"
      >
        <div class="cnt-iniciar-sesion">
          <div class="text-center">
            <img
              src="https://saonboardinginteligo.file.core.windows.net/logocertia/logo-certia.png?sv=2019-12-12&ss=f&srt=o&sp=r&se=2021-01-01T07:55:20Z&st=2020-09-13T23:55:20Z&spr=https,http&sig=dNuEslhmHNf1K7vu6BmAF%2B7%2FlD9n8pCPDwavMcJJEfE%3D"
              alt="logo Inteligo"
            />
            <p class="p-titulo-normal mb-5">Iniciar sesión</p>
          </div>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <div class="cnt-ipt__registrate">
              <v-text-field
                v-model="form.correo"
                :rules="rules.correo"
                label="Ingresar correo"
                background-color="transparent"
                class="ipt-registrate"
                required
                solo
                height="39px"
              ></v-text-field>
            </div>
            <div class="cnt-ipt__registrate">
              <v-text-field
                v-model="form.contrasenia"
                :rules="rules.contrasenia"
                label="Ingresar contraseña"
                background-color="transparent"
                class="ipt-registrate"
                required
                solo
                height="39px"
                type="password"
              ></v-text-field>
            </div>
            <div class="text-center">
              <small>{{ mensajeErrorRegistro }}</small>
            </div>
            <div class="cnt-ipt__registrate">
              <v-btn
                :disabled="!valid"
                class="btn-registrarse"
                type="submit"
                :color="tema.colorPrimario"
                height="39px"
                @click.prevent="validate"
                >INGRESAR</v-btn
              >
            </div>
          </v-form>
          <div class="mt-5 text-center">
            <small>¿Aún no te has registrado?</small>
          </div>
          <div class="text-center mt-3 btn-registrate">
            <v-btn
              text
              small
              color="white"
              @click="
                ;(modalFormRegistro = !modalFormRegistro),
                  (modalIniciarSesion = !modalIniciarSesion)
              "
              >REGÍSTRATE</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'default',
  data() {
    return {
      form: {
        correo: '',
        contrasenia: '',
      },
      rules: {
        contrasenia: [(val) => (val || '').length > 0 || 'Campo obligatorio'],
        correo: [
          (v) =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            'Ingresa un correo válido',
        ],
      },
      modalIniciarSesion: false,
      valid: true,
      lazy: false,
      mensajeErrorRegistro: '',
      errorValidacionCorreo: '',
      nombre: '',
      loading: false,
      loadingIngresar: false,
    }
  },
  computed: {
    ...mapState(['tema', 'empresa', 'logoEmpresa']),
  },
  methods: {
    resetForm() {
      this.$refs.form.reset()
    },
    validate() {
      this.resetForm()
    },
    rutaPerfil() {
      this.$router.push(`/perfil-usuario`)
    },
    reiniciarMensajeError() {
      this.mensajeErrorRegistro = ''
    },
  },
}
</script>
