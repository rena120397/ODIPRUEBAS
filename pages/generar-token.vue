<template>

</template>
<script lang="ts">
import Vue from 'vue';
import { getCookie } from '~/utils/cookies';

export default Vue.extend({
  data() {
    return { 
      errors: [],
      showErrors: false,
    }
  },
  created() {
    if (process.browser) {
      const encrypt = getCookie('encrypt-request');
      if(!encrypt){
          this.$router.push(`/`);
          return;
      }
      const encode = encodeURIComponent(encrypt);
      window.location.href = `/loading-update?q=${encode}`;
    }
  },
  });
  </script>