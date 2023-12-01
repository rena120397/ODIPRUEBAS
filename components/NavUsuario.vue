<template>
  <div>
    <v-app-bar v-if="!!tema" :color="tema.colorPrimario" class="nav-principal" fixed>
      <img :src="logos.logoPerfil" alt="logo inteligo">
      <v-spacer />
      <div class="menu-right-desktop">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
          content-class="menu-perfil-usuario"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              class="btn-ver_perfil"
              v-bind="attrs"
              :color="tema.colorBtnperfil"
              v-on="on"
            >
              {{ nombre }}
              {{ apellido }}
              <span class="mdi mdi-chevron-down" />
            </v-btn>
          </template>
          <div>
            <v-list>
              <v-list-item>
                <v-btn
                  id="cerrarSesion"
                  text
                  class="btn-nav"
                  @click="cerrarSesion"
                >
                  Cerrar sesión
                </v-btn>
              </v-list-item>
            </v-list>
          </div>
        </v-menu>
      </div>
      <div class="menu-right-mobile">
        <v-btn text @click="drawer = true">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-btn id="cerrarSesion" text class="btn-nav" @click="cerrarSesion">
              Cerrar sesión
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      item: 0,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      drawer: false,
      group: null,
    }
  },
  computed: {
    ...mapState([
      'logos',
      'tema',
      'informacionUsuario',
      'datosPersonalesEquifax',
    ]),
    nombre: function (){
      return this.informacionUsuario?.equifax_values ? this.informacionUsuario.equifax_values.firstName : this.datosPersonalesEquifax.name;
    },
    apellido: function (){
      return this.informacionUsuario?.equifax_values ? this.informacionUsuario.equifax_values.lastName : this.datosPersonalesEquifax.surname;
    }
  },
  methods: {
    cerrarSesion() {
      this.$router.push('/logout');
    },
  },
}
</script>
<style lang="scss">
.menu-perfil-usuario {
  min-width: 200px !important;
  box-shadow: none;
  border-radius: 0px;
  border-top: 4px solid #2765f5;
  right: 85px !important;
  left: auto !important;
  z-index: 300 !important;
  .v-btn__content {
    text-transform: capitalize !important;
  }
}
.nav-principal {
  height: 66px !important;
  box-shadow: none;
  padding-left: 0px;
  padding-right: 0px;
  .mdi-chevron-down {
    font-size: 30px;
  }
  .v-btn {
    text-transform: none;
    letter-spacing: 0 !important;
  }
  .icon-pregunta {
    font-size: 18px;
    margin-left: 4px;
  }
  .v-icon.v-icon {
    color: #ffffff !important;
  }
  .v-toolbar__content {
    height: 66px !important;
  }
}
.btn-ver_perfil {
  box-shadow: none !important;
  color: #ffffff !important;
  padding: 0px 24px !important;
}
.menu-right-desktop {
  display: none;
}
.menu-right-mobile {
  display: block;
}
@media (min-width: 768px) {
}
@media (min-width: 1025px) {
  .nav-principal {
    height: 90px !important;
    padding-left: 70px;
    padding-right: 70px;
    .v-toolbar__content {
      height: 90px !important;
    }
  }
  .menu-right-desktop {
    display: block;
  }
  .menu-right-mobile {
    display: none;
  }
}
@media (min-width: 1400px) {
}
</style>
