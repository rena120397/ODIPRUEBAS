<template>
  <div class="componente-perfilador">
    <div
      :class="[tema.class_contenedor_color]"
    >
      <Perfilador />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Perfilador from '~/components/Perfilador.vue';
export default {
  components: {
    Perfilador,
  },
  layout: 'usuario',
  computed: {
    ...mapState(['tema', 'usuarioId', 'informacionUsuario', 'empresa']),
  },
}
</script>
<style lang="scss"></style>
