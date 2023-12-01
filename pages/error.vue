<template>
  <v-container fill-height fluid>
    <v-row
      align="center"
      justify="center"
    >
      <v-col class="text-center">
        <div>
          <img src="@/assets/img/error2.svg" alt="error de validacion">
        </div>
        <h2 class="color-p-text mt-2">
          Ocurrió algo inesperado y este proceso no puede continuar.
        </h2>
        <p class="mt-2">
          Por favor vuelva a intentarlo en unos minutos.
        </p>
        <v-btn class="btn-volver" @click="regresar">
          VOLVER
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  methods: {
    regresar() {
    this.$router.back()
  },
  }
}
</script>
<style scoped>
img {
  height: 120px;
}
.contenedor-certia .btn-volver {
  color: #9d5116;
  border: 1px solid #9d5116;
  background-color: transparent !important;
  box-shadow: none !important;
  width: 160px;
  height: 48px;
  margin-top: 30px;
}
.contenedor-sab .btn-volver {
  color: #2765f5;
  border: 1px solid #2765f5;
  background-color: transparent !important;
  box-shadow: none !important;
  width: 160px;
  height: 48px;
  margin-top: 30px;
}
</style>
