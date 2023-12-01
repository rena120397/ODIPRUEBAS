<template>
  <v-layout v-if="isLogged">
    <div class="contenedor d-flex justify-center align-center">
      <ValidacionIdentidad />
    </div>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import ValidacionIdentidad from '~/components/ValidacionIdentidad.vue'
export default {
  components: {
    ValidacionIdentidad,
  },
  layout: 'default',
  data() {
    return {}
  },
  computed: {
    ...mapState(['empresa', 'isLogged']),
  },
}
</script>
