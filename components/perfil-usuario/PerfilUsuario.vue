<template>
  <div
    v-if="!!tema"
    :class="tema.class_st"
  >
    <div
      v-if="porcentajeRegistroTotal < 101"
      class="navbar-progress"
      :class="{ 'hidden-navbar': !showNavbar || true }"
    >
      <div class="d-flex justify-space-between">
        <span>
          <small> {{ tema.textos.perfilEstaAun }} </small>
        </span>
        <span class="p-titulo-bold">{{ porcentajeRegistroTotal }} %</span>
      </div>
      <v-progress-linear
        :value="porcentajeRegistroTotal"
        :color="tema.colorBarra"
        height="12px"
      />
      <div
        v-if="porcentajeRegistroTotal <= 20"
        class="msj-progress_bar msj-progress_bar-d"
      >
        <span>{{ tema.textos.completePerfil }}</span>
        <span><small>{{ tema.textos.descMensajePerfil }}</small></span>
      </div>
      <div v-if="porcentajeRegistroTotal <= 20" class="msj-progress_bar-m">
        <span><small>Para poder invertir, complete los datos de esta sección
        </small></span>
      </div>
      <div
        v-if="porcentajeRegistroTotal > 20 && porcentajeRegistroTotal < 50"
        class="msj-progress_bar"
      >
        <small>{{ tema.textos.descMensajePerfil2050 }}</small>
      </div>
      <div
        v-if="porcentajeRegistroTotal >= 50 && porcentajeRegistroTotal <= 60"
        class="msj-progress_bar"
      >
        <small>{{ tema.textos.descMensajePerfil5060 }}</small>
      </div>
      <div
        v-if="porcentajeRegistroTotal > 60 && porcentajeRegistroTotal <= 90"
        class="msj-progress_bar"
      >
        <small>{{ tema.textos.descMensajePerfil60100 }}</small>
      </div>
      <div v-if="porcentajeRegistroTotal > 90" class="msj-progress_bar">
        <div>{{ tema.textos.descMensajePerfil100 }} {{ nombreEmpresa }}!</div>
        <div>
          <small>Le hemos enviado el correo con asunto “Onboarding digital Inteligo”
            a {{ informacionUsuario.emailAdress }}</small>
          <v-tooltip bottom color="text-white">
            <template #activator="{ on, attrs }">
              <span
                v-bind="attrs"
                class="icon-pregunta txt-color__principal"
                v-on="on"
              />
            </template>
            <span> El correo puede ser enviado hasta en 2 días en útiles </span>
          </v-tooltip>
        </div>
      </div>
    </div>
    <div class="s2-perfilusuario">
      <v-expansion-panels v-model="panel" accordion>
        <div v-if="!!esActualizarUsuario" id="titulo-actualizacion-ficha">
          <h2>Actualización de ficha</h2>
          <h4>Estimado cliente:<br />
          Por favor revisar sus datos en cada una de las secciones y actualice la información que considere necesaria. Utilice el botón guardar de cada una de las secciones para confirmar su información.<br />
          Finalmente debe aceptar los términos y condiciones de la sección al final de la página.
          </h4>
        </div>
        <slot />
      </v-expansion-panels>
    </div>
    <FooterUsuario />
  </div>
</template>
<script lang="ts">
import { mapState, mapGetters, mapMutations } from 'vuex';
import FooterUsuario from '../FooterUsuario.vue';
import { IComputed, IData, IMethods } from '~/types/PerfilUsuario.component.types';
import Vue from 'vue';

const OFF_SET = 150;

export default Vue.extend<IData, IMethods, IComputed>({
  components: {
    FooterUsuario,
  },
  data() {
    return {
      showNavbar: false,
      panel: null,
    }
  },
  computed: {
    ...mapState([
      'esActualizarUsuario',
      'empresa',
      'tema',
      'informacionUsuario',
      'nombreEmpresa',
      'formularioPanel',
    ]),
    ...mapGetters({
      porcentajeRegistroTotal: 'porcentajeRegistroTotal'
    }),
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1';
    document.head.appendChild(viewportMeta);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    ...mapMutations(['setFormularioPanel']),
    onScroll() {
      if (window.pageYOffset < OFF_SET) {
        this.showNavbar = false
      } else if (Math.abs(window.pageYOffset) > OFF_SET) {
        this.showNavbar = true
      }
    },
  },
  watch: {
    panel: function(newValue) {
      this.setFormularioPanel(newValue);
    },
    formularioPanel: function(newValue) {
      this.panel = newValue;
    }
  }
})
</script>
<style>
#titulo-actualizacion-ficha{
  text-align: center;
}
#titulo-actualizacion-ficha h4{
  margin: 1rem 0rem;
  font-weight: normal;
  text-align: left;
}
.s1-perfilusuario {
  padding: 180px 85px 0px 85px;
}
.s2-perfilusuario {
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 86px;
}

.s2-perfilusuario .v-card__text,
.s2-perfilusuario .v-expansion-panel {
  padding: 8px 0px;
}
.s2-perfilusuario .v-expansion-panel-header {
  padding-top: 0px;
  padding-bottom: 0px;
}
.s1-perfilusuario .v-progress-circular__underlay {
  stroke: #fff6bd;
}
.porcentaje-perfil {
  font-size: 40px;
}
.s1-perfilusuario .v-card__title {
  align-items: flex-end;
}

.s2-perfilusuario .v-input--selection-controls {
  padding: 0px;
  margin: 0px;
}
.st_certia .v-input--selection-controls__input .v-icon {
  color: #9c732b;
}
.st_sab .v-input--selection-controls__input .v-icon {
  color: #0084f8;
}
.s2-perfilusuario .v-messages__wrapper {
  margin-left: 32px;
  margin-top: -2px;
}
.s2-perfilusuario .v-text-field.v-text-field--solo .v-input__control {
  min-height: auto;
}
.msj-progress_bar {
  margin-top: 5px;
}
.msj-progress_bar-d {
  display: none;
}
.msj-progress_bar-m {
  display: block;
}
@media (min-width: 768px) {
  .cnt-form-registrese img {
    height: auto;
  }
  .cnt-form-registrese {
    margin-top: 50px;
  }
  .msj-iniciar_sesion {
    top: 50px;
    right: 40px;
  }
  .msj-progress_bar-d {
    display: block;
  }
  .msj-progress_bar-m {
    display: none;
  }
}
@media (min-width: 1025px) {
  .s2-perfilusuario {
    padding-left: 100px;
    padding-right: 100px;
    margin-top: 110px;
  }
  .s2-perfilusuario .v-card__text,
  .s2-perfilusuario .v-expansion-panel {
    padding: 24px 54px;
  }
}
@media (min-width: 1400px) {
}
</style>
