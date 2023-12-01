<template>
  <div class="text-center twerwe">
    <v-dialog v-model="showLoading" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Cargando...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      showLoading: "isAppLoading",
    }),
  },
};
</script>
