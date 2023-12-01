<template>
  <div class="logout__container">
    <h1>Cerrando sesión...</h1>
  </div>
</template>

<script lang="ts">
import * as Msal from 'msal';
import { msalConfig } from '~/utils/msal';
import { INTELIGO_SAB_HOME_PAGE } from '~/config';
import Vue from 'vue';

export default Vue.extend({
  created() {
    if (process.browser) {
      this.init();
    }
  },
  methods: {
    async init() {
      const redirect = this.$router.currentRoute.query["redirect"];
      if(redirect === "sab"){
        (window as any).location = INTELIGO_SAB_HOME_PAGE;
      }
      sessionStorage.clear();
      const client = new Msal.UserAgentApplication(msalConfig);
      client.logout();
      
    }
  }
});
</script>

<style scoped>
.logout__container{
  margin: 2rem;
}
</style>
