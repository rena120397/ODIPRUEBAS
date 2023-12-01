<template>
  <div class="c-100">
    <div
      :class="[
        'contenedor d-flex justify-center align-center',
        tema.class_contenedor_color
      ]"
    >
      <div class="modal-msjIbk modal100-mobile">
        <div class="cnt-msjIbk text-center">
          <div class="text-center">
            <img :src="logos.logoLogin" alt="logo inteligo">
          </div>
          <h3>¡Queremos que esté siempre informado(a)!</h3>
          <p>
            Hemos precargados sus datos de <strong>INTERBANK</strong>. Por favor
            revíselos por si desea actualizarlos y complete los datos faltantes.
          </p>
          <div>
            <v-btn
              id="continuarClienteIBK"
              class="btn-reeviar text-white"
              :color="tema.colorSecundario"
              @click.prevent="validate1"
            >
              CONTINUAR
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'tema',
      'empresa',
      'logoEmpresaPrincipal',
      'nombreEmpresa',
      'logos',
    ]),
  },
  methods: {
    validate1() {
      this.$router.push('/perfil-usuario')
    },
  },
}
</script>
<style>
.modal-msjIbk {
  width: 600px;
  position: relative;
  background: white;
}
.cnt-msjIbk {
  padding: 80px 30px;
}
.modal-msjIbk img {
  height: 80px;
}
.modal-msjIbk h3 {
  margin: 60px 0px 40px 0px;
}
.modal-msjIbk p {
  margin: 40px 0px 80px 0px;
}
.c-100 {
  width: 100%;
  height: 100vh;
}
@media (max-width: 959px) {
  .modal-msjIbk img {
    height: 50px;
  }
}
</style>
