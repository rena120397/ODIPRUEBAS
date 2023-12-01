<template>
  <div class="dialog-perfilador">
    <div
      v-if="loadingPagina"
      class="loading-pagina d-flex justify-center align-center"
    >
      <div class="text-center">
        <p><strong>Obteniendo su información</strong></p>
        <br>
        <v-progress-circular
          :size="50"
          :color="tema.colorPrimario"
          indeterminate
        />
      </div>
    </div>
    <div v-if="inicio" class="inicio_perfilador">
      <div class="titulo_inicio">
        ¡Hola {{ informacionUsuario.equifax_values.firstName }}!
      </div>
      <div class="subtitulo_inicio">
        {{ tema.textos.perfilador.tituloInicio }}
      </div>
      <div class="mensaje_inicio">
        <div>
          {{ tema.textos.perfilador.subtituloInicio }}
        </div>
      </div>
      <div class="d-flex justify-center">
        <button class="ahora-no_perfilador" @click="cerrarPerfilador">
          AHORA NO
        </button>
        <button class="continuar_perfilador" @click="mostrarPreguntas">
          CONTINUAR
        </button>
      </div>
    </div>
    <div
      v-if="preguntas && preguntasarr.length !== 0"
      class="preguntas_perfilador"
    >
      <div class="mb-5">
        <v-btn
          text
          :color="tema.colorSecundario"
          class="cerrar-perfilador"
          @click="cerrarPerfilador"
        >
          CERRAR
        </v-btn>
      </div>

      <div v-if="indexPregunta === 0" class="txt-inicial_preguntas">
        ¡Buen comienzo Perfilador de Inversión!
      </div>
      <div>{{ indexPregunta + 1 }}/10</div>
      <div class="titulo-preguntas">
        {{ reescribirPregunta(preguntasarr[indexPregunta].txtPregunta) }}
      </div>
      <hr>
      <v-list flat>
        <v-list-item-group
          v-model="selectedItem"
          :color="tema.colorPrimario"
          :class="[
            `item-pregunta_perfilador ${
              'pregunta-perfilador-' + indexPregunta
            }`,
          ]"
        >
          <v-list-item
            v-for="(item, i) in preguntasarr[indexPregunta].respuestas"
            :key="i"
            @click="seleccionarPregunta(item)"
          >
            <v-list-item-icon>
              <v-icon>{{ icons[i] }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.txtRespuesta }}</v-list-item-title>
            </v-list-item-content>
            <div v-if="indexPregunta === 3" class="img-pregunta_perfilador">
              <img
                :src="`https://perfiladorcorporativo.inteligogroup.com${item.imagen}`"
                alt="imagen-perfilador"
              >
            </div>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-btn
        v-if="indexPregunta > 0 && indexPregunta < 10"
        class="btn-retroceder_pregunta"
        :loading="loadingRetroceder"
        @click="retrocederPregunta"
      >
        ATRÁS
      </v-btn>
      <v-btn
        :disabled="!(typeof selectedItem === 'number')"
        :color="tema.colorPrimario"
        class="btn-continuar_pregunta"
        :loading="loadingContinuar"
        @click="continuarEncuesta"
      >
        CONTINUAR
      </v-btn>
    </div>
    <div v-if="resultado" class="resultado_perfilador text-center">
      <p class="titulo_resultado">
        Hemos finalizado la encuesta y se ha determinado que el perfil de
        inversión es
      </p>
      <hr>
      <div>
        <p class="titulo_perfil">
          {{ nombreResultado.nombre }}
        </p>
        <p class="titulo_riesgo">
          Nivel de Riesgo {{ nombreResultado.riesgo }}
        </p>
        <p class="descripcion_perfil">
          {{ nombreResultado.descripcion }}
        </p>
        <v-btn
          :color="tema.colorPrimario"
          class="continuar_perfilador"
          @click="confirmarPerfil"
        >
          SI ES MI PERFIL
        </v-btn>
      </div>
    </div>
    <div v-if="mostrarCambiarPerfil" class="mostrar-cambiar_Perfil text-center">
      <div>
        <img
          src="@/assets/img/banner_perfilador_sab.png"
          alt="banner perfilador"
        >
      </div>
      <p class="mt-4 mt-5">
        Para cumplir tu objetivo y construir un plan de inversión personalizado,
        indícanos con cuál de las siguientes opciones te identificas.
      </p>
      <hr>
      <VueSlickCarousel ref="carousel" v-bind="settings">
        <div
          v-for="(item, i) in descripcionPerfiles"
          :key="i"
          class="item-cambiar-perfil"
        >
          <p class="text-center mt-6">
            {{ item.nombre }}
          </p>
          <div class="item-desc">
            {{ item.descripcion }}
          </div>
          <div class="text-center mt-6">
            <v-btn
              :color="tema.colorPrimario"
              class="btn-elegir_perfil"
              @click="confirmarPerfil(item.nombre)"
            >
              ELEGIR PERFIL
            </v-btn>
          </div>
        </div>
      </VueSlickCarousel>
    </div>
    <div v-if="mostrarPerfilCompletado" class="mostrar-perfil-completado">
      <div>
        <img
          src="@/assets/img/banner_perfilador_sab.png"
          alt="banner perfilador"
        >
      </div>
      <div class="text-center b-perfil_completado">
        <p class="titulo">
          La encuesta ha finalizado
        </p>
        <hr>
        <p class="mb-8">
          <strong>Estimado cliente,</strong><br>
          Agradecemos por haber completado el cuestionario del perfilador de
          inversión.
        </p>
        <p>¡Muchas Gracias!</p>
        <div class="text-center">
          <v-btn
            :color="tema.colorPrimario"
            class="continuar_perfilador cerrar-perfilador"
            @click="cerrarPerfilador"
          >
            CONTINUAR CON EL ONBOARDING INTELIGO
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import VueSlickCarousel from 'vue-slick-carousel';
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import { mapState } from 'vuex';
import { APIM_PERFILADOR_CONFIRM, APIM_PERFILADOR_QUESTIONS, APIM_PERFILADOR_RESULT, APIM_ONBOARDING_KEY } from '~/config/enviroment.config';
import { getHeaderAPIM } from '~/utils/clienteFormulario';
import Vue from 'vue';
export default Vue.extend({
  components: { VueSlickCarousel },
  data() {
    return {
      settings: {
        dots: true,
        focusOnSelect: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        touchThreshold: 5,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      mostrarCambiarPerfil: false,
      mostrarPerfilCompletado: false,
      inicio: false,
      preguntas: false,
      resultado: false,
      selectedItem: null,
      indexPregunta: 0,
      icons: [
        'mdi-alpha-a',
        'mdi-alpha-b',
        'mdi-alpha-c',
        'mdi-alpha-d',
        'mdi-alpha-e',
      ],
      preguntasarr: [],
      valid: false,
      descripcionPerfiles: [
        {
          nombre: 'Defensivo',
          descripcion:
            'Para inversionistas con muy baja tolerancia al riesgo que buscan minimizar el riesgo de pérdidas temporales en sus inversiones.',
        },
        {
          nombre: 'Altamente conservador',
          descripcion:
            'Para inversionistas de corto plazo con tolerancia baja al riesgo, que buscan un balance entre la generación de ingresos corrientes y la seguridad en sus inversiones',
        },
        {
          nombre: 'Conservador',
          descripcion:
            'Para inversionistas de mediano plazo con tolerancia media al riesgo, que buscan un balance entre la apreciación de capital y la generación de ingresos corrientes de sus inversiones.',
        },
        {
          nombre: 'Moderado',
          descripcion:
            'Para inversionistas de mediano plazo con tolerancia media al riesgo, que buscan un balance entre la apreciación de capital y la generación de ingresos corrientes de sus inversiones.',
        },
        {
          nombre: 'Agresivo',
          descripcion:
            'Para inversionistas de mediano plazo con tolerancia media al riesgo, que buscan un balance entre la apreciación de capital y la generación de ingresos corrientes de sus inversiones.',
        },
      ],
      nombreResultado: {
        nombre: '',
        descripcion: '',
        riesgo: '',
      },
      nombreResultadoCmabiado: '',
      loadingPagina: true,
      itemRespuestas: {
        puntajeResp: '',
        txtRespuesta: '',
        letraResp: '',
      },
      loadingContinuar: false,
      loadingRetroceder: false,
    }
  },
  computed: {
    ...mapState(['tema', 'usuarioId', 'informacionUsuario', 'empresa']),
  },
  created() {
    this.obtenerPreguntas()
    this.reescribirPregunta()
  },
  methods: {
    reescribirPregunta(value?: string) {
      if (value !== undefined) {
        return value.replace('<br>', '')
      }
    },
    mostrarPreguntas() {
      this.inicio = false
      this.preguntas = true
      this.resultado = false
      this.loadingPagina = false
    },
    mostrarResultado() {
      this.inicio = false
      this.preguntas = false
      this.resultado = true
      this.loadingPagina = false
    },
    mostrarInicio() {
      this.inicio = true
      this.preguntas = false
      this.resultado = false
      this.loadingPagina = false
    },
    mostrarPerfil() {
      this.inicio = false
      this.preguntas = false
      this.resultado = false
      this.loadingPagina = false
      this.mostrarPerfilCompletado = true
    },
    //
    obtenerPreguntas() {
      this.$axios({
        method: 'get',
        url: APIM_PERFILADOR_QUESTIONS,
        headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
      }).then(({ data: perfiladorQuestionsData}) => {
        this.preguntasarr = perfiladorQuestionsData;
        this.obtenerUltimaPregunta();
      })
    },
    seleccionarPregunta(item: any) {
      this.itemRespuestas = item;
      this.valid = true;
    },
    async continuarEncuesta() {
      this.loadingContinuar = true
      const data: any = {
        id: this.informacionUsuario.id,
        profiler_information: {},
      }
      data.profiler_information[`question${this.indexPregunta + 1}`] = {
        indexPregunta: this.indexPregunta,
        selectedItem: this.selectedItem,
        puntajeResp: this.itemRespuestas.puntajeResp,
        txtRespuesta: this.itemRespuestas.txtRespuesta,
        letraResp: this.itemRespuestas.letraResp,
      }
      const url = `/api/perfil-question${this.indexPregunta + 1}`
      await this.$axios.post(url, data)
      if (this.indexPregunta < 9) {
        const dataGet = {
          cuenta: this.informacionUsuario.accountIdentifier,
        }

        await this.$axios.post('/api/getProfiler', dataGet).then((res) => {
          if (
            res.data.profiler_information[
              `question${this.indexPregunta + 2}`
            ] !== undefined
          ) {
            this.selectedItem =
              res.data.profiler_information[
                `question${this.indexPregunta + 2}`
              ].selectedItem
            this.itemRespuestas.puntajeResp =
              res.data.profiler_information[
                `question${this.indexPregunta + 2}`
              ].puntajeResp
            this.itemRespuestas.txtRespuesta =
              res.data.profiler_information[
                `question${this.indexPregunta + 2}`
              ].txtRespuesta
            this.itemRespuestas.letraResp =
              res.data.profiler_information[
                `question${this.indexPregunta + 2}`
              ].letraResp
          } else {
            this.selectedItem = null
          }
        })
        this.indexPregunta++
      } else {
        this.loadingPagina = true
        this.preguntas = false
        const dataGet = {
          cuenta: this.informacionUsuario.accountIdentifier,
        }
        const dataResultado: Array<any> = []
        await this.$axios.post('/api/getProfiler', dataGet).then((res) => {
          for (const property in res.data.profiler_information) {
            if (property.slice(0, 8) === 'question') {
              dataResultado.push({
                numPregunta:
                  res.data.profiler_information[property].indexPregunta,
                letraRespuesta:
                  res.data.profiler_information[property].letraResp,
                txtRespuesta:
                  res.data.profiler_information[property].txtRespuesta,
                puntajeResp:
                  res.data.profiler_information[property].puntajeResp,
              })
            }
          }
        })

        await this.$axios({
          headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
          method: 'post',
          url: APIM_PERFILADOR_RESULT,
          data: {
            cliente: this.informacionUsuario.identityDocument.number,
            tipodoc: this.informacionUsuario.identityDocument.type,
            empresa: this.informacionUsuario.companyJoined,
            perfilador: dataResultado,
          },
        }).then(({data: perfiladorResultData}) => {
          this.nombreResultado.nombre = perfiladorResultData.perfil
          this.nombreResultado.descripcion = perfiladorResultData.descripcion
          this.nombreResultado.riesgo = perfiladorResultData.nivel
          this.mostrarResultado()
        })
      }
      this.loadingContinuar = false
    },
    async retrocederPregunta() {
      this.loadingRetroceder = true
      const dataGet = {
        cuenta: this.informacionUsuario.accountIdentifier,
      }
      await this.$axios.post('/api/getProfiler', dataGet).then((res) => {
        if (
          res.data.profiler_information[`question${this.indexPregunta}`] !==
          undefined
        ) {
          this.selectedItem =
            res.data.profiler_information[
              `question${this.indexPregunta}`
            ].selectedItem
          this.itemRespuestas.puntajeResp =
            res.data.profiler_information[
              `question${this.indexPregunta}`
            ].puntajeResp
          this.itemRespuestas.txtRespuesta =
            res.data.profiler_information[
              `question${this.indexPregunta}`
            ].txtRespuesta
          this.itemRespuestas.letraResp =
            res.data.profiler_information[
              `question${this.indexPregunta}`
            ].letraResp
        }
      })
      this.indexPregunta--
      this.loadingRetroceder = false
    },
    obtenerUltimaPregunta() {
      const dataGet = {
        cuenta: this.informacionUsuario.accountIdentifier,
      }

      this.$axios.post('/api/getProfiler', dataGet).then((res) => {
        if (res.data.profiler_information.result) {
          this.nombreResultado.nombre =
            res.data.profiler_information.result.profile
          this.mostrarPerfil()
        } else if (res.data.profiler_information.question1) {
          for (const property in res.data.profiler_information) {
            if (
              res.data.profiler_information[property].selectedItem !== undefined
            ) {
              this.selectedItem =
                res.data.profiler_information[property].selectedItem
              this.indexPregunta =
                res.data.profiler_information[property].indexPregunta
              this.itemRespuestas.puntajeResp =
                res.data.profiler_information[property].puntajeResp
              this.itemRespuestas.txtRespuesta =
                res.data.profiler_information[property].txtRespuesta
              this.itemRespuestas.letraResp =
                res.data.profiler_information[property].letraResp
            }
          }
          this.mostrarPreguntas()
        } else {
          this.mostrarInicio()
        }
      })
    },
    cambiarPerfil() {
      this.mostrarCambiarPerfil = true
      this.mostrarPerfilCompletado = false
      this.inicio = false
      this.preguntas = false
      this.resultado = false
      this.loadingPagina = false
    },
    async confirmarPerfil(item: any) {
      this.loadingPagina = false
      this.mostrarCambiarPerfil = false
      this.mostrarPerfilCompletado = true
      this.inicio = false
      this.preguntas = false
      this.resultado = false
      this.nombreResultadoCmabiado = item
      this.guardarResultadoPerfil();
    },
    guardarResultadoPerfil() {
      const data = {
        id: this.informacionUsuario.id,
        profiler_information: {
          result: {
            profile: this.nombreResultado.nombre,
            result_change: this.nombreResultadoCmabiado,
            description: this.nombreResultado.descripcion,
            risk: this.nombreResultado.riesgo,
          },
        },
      }
      const dataPerfilador = {
        cliente: this.informacionUsuario.identityDocument.number,
        empresa: this.informacionUsuario.companyJoined,
        tipodoc: this.informacionUsuario.identityDocument.type,
      }
      this.$axios.post('/api/result-profiler', data)
      this.$axios({
        headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
        method: 'post',
        url: APIM_PERFILADOR_CONFIRM,
        data: dataPerfilador,
      });
    },
    async cerrarPerfilador() {
      const cuenta = this.informacionUsuario.accountIdentifier

      const data = {
        cuenta,
      }
      await this.$axios.post('/api/getLead', data).then((response) => {
        this.$store.dispatch('actionUpdateInformacionUsuario', response.data);
        if (response.data.financial_information) {
          this.$store.commit(
            'setSujetoObligado',
            response.data.financial_information.is_obliged_subject
          )
        }
      })
      this.$router.back()
    },
  },
});
</script>
<style lang="scss">
.loading-pagina {
  width: 100%;
  height: 500px;
}
.slick-slider {
  padding: 0px 15px !important;
}
.mostrar-cambiar_Perfil {
  width: 100%;
  p {
    color: #233e99;
  }
  img {
    width: 100%;
  }
}

.resultado_perfilador,
.mostrar-perfil-completado {
  padding: 0px 30px;
  .ahora-no_perfilador {
    width: 100%;
    height: 44px !important;
    margin-bottom: 30px;
  }
  .continuar_perfilador {
    width: 100%;
    height: 44px !important;
  }
}

.contenedor-certia {
  .preguntas_perfilador {
    .titulo-preguntas {
      color: #9d5116 !important;
    }
    .v-list-item--active {
      .v-icon.v-icon {
        background: #9d5116 !important;
        border: 1px solid #9d5116;
      }
    }
  }
}
.preguntas_perfilador {
  padding: 30px;
  width: inherit;
  text-align: center;
  position: relative;
  transition-duration: 2s;
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  .item-pregunta_perfilador {
    .v-list-item__icon {
      margin-right: 10px !important;
    }
    img {
      width: 180px;
      height: auto;
    }
  }
  .cerrar-perfilador {
    position: absolute;
    right: 30px;
    top: -15px;
  }
  .btn-continuar_pregunta {
    color: #ffffff !important;
  }
  .btn-retroceder_pregunta {
    margin-bottom: 15px;
  }
  .btn-continuar_pregunta,
  .btn-retroceder_pregunta {
    width: 100%;
    height: 44px !important;
  }
  .titulo-preguntas {
    font-size: 18px;
    line-height: 30px;
    color: #233e99;
    margin-bottom: 15px;
  }
  .v-list-item__title,
  .v-list-item__subtitle {
    text-overflow: inherit;
    white-space: inherit;
    text-align: justify;
  }
  .v-list-item {
    background: #f4f4f4;
    margin-bottom: 15px;
    .v-icon.v-icon {
      background: #ffffff;
      border: 1px solid #353536;
      border-radius: 4px;
    }
  }
  .v-list-item--active {
    .v-icon.v-icon {
      background: #233e99;
      border: 1px solid #233e99;
      color: #ffffff;
    }
  }

  .txt-inicial_preguntas {
    margin-bottom: 15px;
    margin-top: -30px;
  }
  .pregunta-perfilador-3 {
    .v-list-item {
      position: relative;
      height: 228px;
      .v-list-item__content,
      .img-pregunta_perfilador {
        position: absolute;
      }
      .v-list-item__content {
        top: 0px;
        left: 60px;
      }
      .img-pregunta_perfilador {
        top: 45px;
        left: 60px;
      }
    }
    .v-list-item__content {
      padding-top: 20px;
    }
  }
  .pregunta-perfilador-3,
  .pregunta-perfilador-6 {
    .v-list-item {
      width: 100%;
      display: inline-flex;
      margin-right: 1%;
    }
  }
}
.contenedor-certia .txt-inicial_preguntas {
  color: #9c732b;
}
.contenedor-sab .txt-inicial_preguntas {
  color: #0084f8;
}
.titulo_resultado {
  font-size: 16px;
  color: #233e99;
}
.titulo_perfil {
  font-size: 36px;
  line-height: 60px;
  color: #233e99;
}
.contenedor-certia {
  .titulo_perfil,
  .titulo_resultado {
    color: #9d5116 !important;
  }
}
.titulo_riesgo {
  font-weight: 500;
  font-size: 18px;
  color: #da432c;
}
.ahora-no_perfilador,
.btn-retroceder_pregunta {
  background-color: #ffffff !important;
  border: 2px solid #233e99;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #233e99 !important;
  padding: 10px 30px;
  margin-right: 30px;
}
.contenedor-certia {
  .ahora-no_perfilador,
  .btn-retroceder_pregunta {
    border: 2px solid #9d5116;
    color: #9d5116 !important;
  }
}

.continuar_perfilador {
  background: #233e99;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #ffffff !important;
  padding: 10px 30px;
  margin-right: 0px;
}
.contenedor-certia {
  .continuar_perfilador {
    background: #9d5116 !important;
  }
}
.dialog-perfilador {
  display: block;
  align-items: center;
  min-height: 86vh;
  margin-top: 12vh;
  justify-content: center;
  transition: 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms;
  width: 100%;
  outline: none;
  padding: 0px;
  hr {
    width: 10%;
    color: #233e99;
    margin: 0px auto 15px auto;
  }
}
.contenedor-certia {
  .dialog-perfilador {
    hr {
      color: #9d5116 !important;
    }
  }
}
.titulo_inicio {
  color: #233e99;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
.contenedor-certia {
  .titulo_inicio {
    color: #9d5116 !important;
  }
}
.subtitulo_inicio {
  color: #233e99;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
}
.contenedor-certia {
  .subtitulo_inicio {
    color: #9d5116 !important;
  }
}
.inicio_perfilador {
  background-color: #f4f4f4;
  padding: 30px;
  min-height: 90vh;
  margin-top: -4vh;
}
.mensaje_inicio {
  margin-bottom: 60px;
  padding: 16px;
}
.contenedor-certia .mensaje_inicio {
  background: #edebe6;
  color: #353536;
}
.contenedor-sab .mensaje_inicio {
  background-color: #78bad7;
  color: #ffffff;
}
.descripcion_perfil {
  margin-bottom: 50px !important;
}
.mostrar-perfil-completado {
  font-size: 20px;
  .titulo {
    font-size: 22px;
    line-height: 26px;
    color: #233e99;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .b-perfil_completado {
    padding: 0px 30px;
  }
  img {
    width: 100%;
  }
}
.contenedor-certia {
  .mostrar-perfil-completado {
    .titulo {
      color: #9d5116 !important;
    }
  }
}
.item-cambiar-perfil {
  background: #f6f6f7;
  border: 6px solid #ebebeb;
  margin: 0px 20px;
  padding: 0px 15px 30px;
  color: #333333;
  p {
    color: #233e99;
    font-weight: bold;
    font-size: 18px;
    text-transform: capitalize;
  }
  .item-desc {
    font-size: 15px;
  }
}
.contenedor-certia {
  .item-cambiar-perfil {
    p {
      color: #9d5116 !important;
    }
  }
}
.slick-slide {
  padding-right: 20px;
}
.btn-elegir_perfil {
  color: #ffffff !important;
}
.cerrar-perfilador .v-btn__content {
  flex: auto;
  white-space: pre-wrap;
}
@media (min-width: 768px) {
  .cerrar-perfilador .v-btn__content {
    flex: 1 0 auto;
    white-space: pre-wrap;
  }
  .dialog-perfilador {
    padding: 0px 50px;
    display: flex;
  }
  .inicio_perfilador {
    padding: 60px 120px;
    min-height: auto;
    margin-top: auto;
  }
  .titulo_inicio,
  .subtitulo_inicio {
    font-size: 28px;
  }
  .mensaje_inicio {
    padding: 16px 60px;
  }
  .slick-slider {
    padding: 0px 100px !important;
  }
  .continuar_perfilador {
    padding: 10px 50px;
  }
  .preguntas_perfilador {
    padding: 30px 100px;
    .item-pregunta_perfilador {
      .v-list-item__icon {
        margin-right: 30px;
      }
    }
    .btn-continuar_pregunta,
    .btn-retroceder_pregunta {
      width: 180px;
      padding: 10px 30px;
    }
    .btn-retroceder_pregunta {
      margin-bottom: 0px;
    }
    .continuar_perfilador {
      margin-right: 30px;
    }
    .pregunta-perfilador-3,
    .pregunta-perfilador-6 {
      .v-list-item {
        width: 46%;
        // display: inline-flex;
        // margin-right: 1%;
        .img-pregunta_perfilador {
          left: 40px;
        }
      }
    }
  }
  .ahora-no_perfilador {
    padding: 10px 50px;
  }
  .resultado_perfilador,
  .b-perfil_completado {
    padding: 0px;
  }
  .resultado_perfilador,
  .mostrar-perfil-completado {
    .ahora-no_perfilador {
      width: 215px;
      margin-bottom: 0px;
    }
    .continuar_perfilador {
      width: 215px;
    }
    .continuar_perfilador.cerrar-perfilador {
      width: 400px;
    }
  }
}
@media (min-width: 1025px) {
  .dialog-perfilador {
    padding: 50px 100px;
  }
  .preguntas_perfilador {
    .pregunta-perfilador-3 {
      .v-list-item {
        .img-pregunta_perfilador {
          left: 130px;
        }
      }
    }
  }
}
@media (min-width: 1400px) {
  .titulo_inicio {
    margin-bottom: 30px;
  }
  .subtitulo_inicio {
    margin-bottom: 50px;
  }
  .inicio_perfilador {
    margin-top: 0px;
  }
}
</style>
