<template>
  <div class="h-100 text-center">
    <div class="d-flex align-center justify-center mt-10">
      <div>
        <img
          src="~/assets/img/optimize.svg"
          alt="error"
          class="img-mantenimiento"
        >
      </div>
    </div>
    <h1>Lamentamos las molestias.</h1>
    <h3>
      Nos encontramos haciendo tareas de mantenimiento para brindarle un mejor
      servicio
    </h3>
    <NuxtLink to="/">
      Volver
    </NuxtLink>
  </div>
</template>

<script>
export default {
  components: {},
  layout: 'default',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>
<style>
.img-mantenimiento {
  width: 50%;
}
</style>
