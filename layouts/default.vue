<template>
  <v-app>
    <loader-global />
    <request-fail />
    <nuxt />
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.obtenerEmpresa();
  },
  methods: {
    ...mapActions(["setCertia", "setSAB"]),
    obtenerEmpresa() {
      this.setCertia();
      this.setSAB();
    },
  },
};
</script>
