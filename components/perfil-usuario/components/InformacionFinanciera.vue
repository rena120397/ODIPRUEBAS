<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="cabecera-panel">
      <div class="p-titulo-bold">
        Información financiera
      </div>
      <span v-if="esFormularioCompleto" class="icon-check1" />
    </v-expansion-panel-header>
    <v-expansion-panel-content value="8">
      <div>
        <v-btn
          v-if="!showBotonEnviarFormulario && porcentajeRegistroTotal < 100"
          id="editar_form_infoFinanciera"
          icon
          :color="tema.colorSecundario"
          class="icon-edit"
          @click="editarFormulario"
        >
          Editar <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-form ref="form5" v-model="valid5" :lazy-validation="lazy5">
          <div class="row-infoUsuario-check">
            <label for="" class="">
              Principal fuente de fondos<span class="dat-ob">*</span>
              <v-tooltip bottom color="text-white">
                <template #activator="{ on, attrs }">
                  <span
                    v-bind="attrs"
                    class="icon-pregunta txt-color__principal"
                    v-on="on"
                  />
                </template>
                <span>
                  Esto se refiere a la fuente de donde obtiene su dinero.</span>
              </v-tooltip>
            </label>
            <div>
              <v-radio-group
                v-model="fuentedefondos"
                v-on:change="changeFuenteDeFondos"
                :color="tema.colorSecundario"
                :disabled="!showBotonEnviarFormulario"
                :rules="[(v) => !!v || 'Selecciona una opción']"
                required
              >
                <v-radio
                  value="fuenteUtilidades"
                  label="Utilidades / ingresos del Negocio individual"
                  :color="tema.colorSecundario"
                />
                <v-radio
                  value="fuenteSueldo"
                  label="Sueldos, honorarios, pensiones, LTS, CTS"
                  :color="tema.colorSecundario"
                />
                <v-radio
                  value="fuenteVentaInmueble"
                  label="Venta de inmuebles, vehículos"
                  :color="tema.colorSecundario"
                />
                <v-radio
                  value="fuenteFinanciacionterceros"
                  label="Financiación de terceros"
                  :color="tema.colorSecundario"
                />
                <v-radio
                  value="fuenteHerencia"
                  label="Herencia, lotería"
                  :color="tema.colorSecundario"
                />
                <v-radio
                  value="fuenteArrendamientos"
                  label="Arrendamientos"
                  :color="tema.colorSecundario"
                />
                <v-radio
                  value="fuenteCobros"
                  label="Cobro de dividendos / cupones y ganancia de capital sobre Inversiones"
                  :color="tema.colorSecundario"
                />
                <v-radio
                  value="fuenteOtros"
                  label="Otros"
                  :color="tema.colorSecundario"
                />
              </v-radio-group>
            </div>
            <div
              v-if="fuentedefondos === 'fuenteOtros'"
              class="row-infoUsuario"
            >
              <label
                for=""
                :class="showBotonEnviarFormulario ? '' : ' label-disabled'"
              >Otros *</label>
              <br>
              <v-text-field
                v-model="otraFuenteFondos"
                :disabled="!showBotonEnviarFormulario"
                :rules="[(v) => !!v || 'Ingresa un valor']"
                placeholder="Ejm: Premio"
                class="input-profile"
                solo
                required
              />
            </div>
          </div>
          <div class="row-infoUsuario">
            <label for="" class="">
              País de origen de fondos<span class="dat-ob">*</span>
              <v-tooltip bottom color="text-white">
                <template #activator="{ on, attrs }">
                  <span
                    v-bind="attrs"
                    class="icon-pregunta txt-color__principal"
                    v-on="on"
                  />
                </template>
                <span> Es el país de donde proviene el dinero que tiene. </span>
              </v-tooltip>
            </label>
            <br>
            <v-autocomplete
              v-model="paisfondos"
              :items="paises"
              item-text="rs_name"
              item-value="rs_paisid"
              label="País"
              class="input-profile"
              :disabled="!showBotonEnviarFormulario"
              solo
              :rules="[(v) => !!v || 'Seleccione un país']"
              required
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              class=""
            >Ingreso mensual promedio<span class="dat-ob">*</span></label>
            <v-radio-group
              v-model="ingresoMensual"
              :disabled="!showBotonEnviarFormulario"
              required
              :rules="[(v) => !!v || 'Selecciona un valor']"
            >
              <v-radio
                :color="tema.colorSecundario"
                label="Menos de US$ 5,000"
                value="Menos de US$ 5,000"
              />
              <v-radio
                :color="tema.colorSecundario"
                label="De US$ 5,001 a US$ 10,000 "
                value="De US$ 5,001 a US$ 10,000"
              />
              <v-radio
                :color="tema.colorSecundario"
                label="De US$ 10,001 a US$ 50,000"
                value="De US$ 10,001 a US$ 50,000"
              />
              <v-radio
                :color="tema.colorSecundario"
                label="Más de US$ 50,001"
                value="Más de US$ 50,001"
              />
            </v-radio-group>
          </div>
          <div class="row-infoUsuario">
            <label for="" class="">
              Información patrimonial<span class="dat-ob">*</span>
              <v-tooltip bottom color="text-white">
                <template #activator="{ on, attrs }">
                  <span
                    v-bind="attrs"
                    class="icon-pregunta txt-color__principal"
                    v-on="on"
                  />
                </template>
                <span>
                  Es donde detalla todo lo que posee a su nombre. El patrimonio
                  es el conjunto de bienes, derechos y obligaciones que tiene
                  una persona.
                </span>
              </v-tooltip>
            </label>
            <br>
            <label for="" class="">
              a) Bienes inmuebles
              <v-tooltip bottom color="text-white">
                <template #activator="{ on, attrs }">
                  <span
                    v-bind="attrs"
                    class="icon-pregunta txt-color__principal"
                    v-on="on"
                  />
                </template>
                <span>
                  Un bien inmueble es aquel bien que no se puede transportar de
                  un lugar a otro debido a sus características, ejemplo: casa,
                  terreno, local, etc.
                </span>
              </v-tooltip>
            </label>
            <v-radio-group
              v-model="ipBienesInmu"
              :disabled="!showBotonEnviarFormulario"
              required
              :rules="[(v) => !!v || 'Selecciona un valor']"
            >
              <v-radio
                :color="tema.colorSecundario"
                label="De 0 a US$ 10,000"
                value="De 0 a US$ 10,000"
              />
              <v-radio
                :color="tema.colorSecundario"
                label="De US$ 10,001 a US$ 50,000"
                value="De US$ 10,001 a US$ 50,000"
              />
              <v-radio
                :color="tema.colorSecundario"
                label="De US$ 50,001 a US$ 200,000"
                value="De US$ 50,001 a US$ 200,000"
              />
              <v-radio
                :color="tema.colorSecundario"
                label="Más de US$ 200,001"
                value="Más de US$ 200,001"
              />
            </v-radio-group>
            <label for="" class="">b) Vehículos / embarcaciones</label>
            <v-radio-group
              v-model="ipVehicEmb"
              :disabled="!showBotonEnviarFormulario"
              required
              :rules="[(v) => !!v || 'Selecciona un valor']"
            >
              <v-radio
                :color="tema.colorSecundario"
                label="De 0 a US$ 10,000"
                value="De 0 a US$ 10,000"
              />
              <v-radio
                :color="tema.colorSecundario"
                label="De US$ 10,001 a US$ 50,000"
                value="De US$ 10,001 a US$ 50,000"
              />
              <v-radio
                :color="tema.colorSecundario"
                label="De US$ 50,001 a US$ 200,000"
                value="De US$ 50,001 a US$ 200,000"
              />
              <v-radio
                :color="tema.colorSecundario"
                label="Más de US$ 200,001"
                value="Más de US$ 200,001"
              />
            </v-radio-group>
            <label for="" class="">
              c) Inversión en valores / ahorros
              <v-tooltip bottom color="text-white">
                <template #activator="{ on, attrs }">
                  <span
                    v-bind="attrs"
                    class="icon-pregunta txt-color__principal"
                    v-on="on"
                  />
                </template>
                <span>
                  Si tiene dinero invertido en otro lado, marque el monto que
                  corresponda.
                </span>
              </v-tooltip>
            </label>
            <v-radio-group
              v-model="ipinvValoAho"
              :disabled="!showBotonEnviarFormulario"
              required
              :rules="[(v) => !!v || 'Selecciona un valor']"
            >
              <v-radio
                :color="tema.colorSecundario"
                label="De 0 a US$ 10,000"
                value="De 0 a US$ 10,000"
              />
              <v-radio
                :color="tema.colorSecundario"
                label="De US$ 10,001 a US$ 50,000"
                value="De US$ 10,001 a US$ 50,000"
              />
              <v-radio
                :color="tema.colorSecundario"
                label="De US$ 50,001 a US$ 200,000"
                value="De US$ 50,001 a US$ 200,000"
              />
              <v-radio
                :color="tema.colorSecundario"
                label="Más de US$ 200,001"
                value="Más de US$ 200,001"
              />
            </v-radio-group>
            <label for="" class="">
              d) Deuda bancaria
              <v-tooltip bottom color="text-white">
                <template #activator="{ on, attrs }">
                  <span
                    v-bind="attrs"
                    class="icon-pregunta txt-color__principal"
                    v-on="on"
                  />
                </template>
                <span>
                  ¿Ha solicitado un préstamo? Aquí deberá colocar si tiene
                  alguna deuda con cualquier entidad bancaria.
                </span>
              </v-tooltip>
            </label>
            <v-radio-group
              v-model="ipDeudaBanc"
              :disabled="!showBotonEnviarFormulario"
              required
              :rules="[(v) => !!v || 'Selecciona un valor']"
            >
              <v-radio
                :color="tema.colorSecundario"
                label="De 0 a US$ 10,000"
                value="De 0 a US$ 10,000"
              />
              <v-radio
                :color="tema.colorSecundario"
                label="De US$ 10,001 a US$ 50,000"
                value="De US$ 10,001 a US$ 50,000"
              />
              <v-radio
                :color="tema.colorSecundario"
                label="De US$ 50,001 a US$ 200,000"
                value="De US$ 50,001 a US$ 200,000"
              />
              <v-radio
                :color="tema.colorSecundario"
                label="Más de US$ 200,001"
                value="Más de US$ 200,001"
              />
            </v-radio-group>
          </div>
          <div class="row-infoUsuario-check">
            <label
              for=""
              class=""
            >Siendo mayor de edad, ¿He sido declarado judicialmente incapaz? o
              ¿He sido demandado para que se me declare judicialmente
              incapaz?<span class="dat-ob">*</span></label>
            <v-radio-group
              v-model="declaracionIncapacidad"
              row
              :disabled="!showBotonEnviarFormulario"
              required
              :rules="[(v) => !!v || 'Selecciona un valor']"
            >
              <v-radio
                label="Si"
                value="si"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="No"
                value="no"
                :color="tema.colorSecundario"
              />
            </v-radio-group>
          </div>
          <div class="row-infoUsuario-check">
            <label
              for=""
              class=""
            >Razón principal de la relación con la Sociedad Agente de
              Bolsa<span class="dat-ob">*</span></label>
            <v-radio-group
              v-model="razonPrincipalSAB"
              :color="tema.colorSecundario"
              :disabled="!showBotonEnviarFormulario"
              :rules="[(v) => !!v || 'Selecciona una opción']"
              required
            >
              <v-radio
                value="compraVentaInstrumentosFinancieros"
                label="Compra-venta Instrumentos financieros"
                :color="tema.colorSecundario"
              />
              <v-radio
                value="opFuturos"
                label="Op. de futuros, opciones y otros derivados"
                :color="tema.colorSecundario"
              />
              <v-radio
                value="administrarCartera"
                label="Administrar la cartera de inversiones"
                :color="tema.colorSecundario"
              />
              <v-radio
                value="asesoriaInversiones"
                label="Asesoría de inversiones"
                :color="tema.colorSecundario"
              />
              <v-radio
                value="custodiaValores"
                label="Custodia de valores"
                :color="tema.colorSecundario"
              />
              <v-radio
                value="operacionesReporte"
                label="Operaciones de reporte"
                :color="tema.colorSecundario"
              />
            </v-radio-group>
          </div>
          <div class="row-infoUsuario-check">
            <label
              for=""
              class=""
            >¿{{ tema.textos.preguntaPep1 }} ? o ¿{{
              tema.textos.preguntaPep2
            }}? o ¿{{ tema.textos.preguntaPep3 }}?<span
              class="dat-ob"
            >*</span></label>
            <v-radio-group
              v-model="esPEP"
              row
              :disabled="!showBotonEnviarFormulario"
              required
              :rules="[(v) => !!v || 'Selecciona un valor']"
              @change="seleccionarPEP"
            >
              <v-radio
                label="Si"
                value="si"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="No"
                value="no"
                :color="tema.colorSecundario"
              />
            </v-radio-group>
          </div>
          <div class="row-infoUsuario-check">
            <label for="" class="">
              Si es sujeto obligado<span class="dat-ob">*</span>
              <v-menu
                open-on-hover
                bottom
                offset-y
                content-class="menu-sujeto-obligado"
              >
                <template #activator="{ on, attrs }">
                  <span
                    color="primary"
                    dark
                    v-bind="attrs"
                    class="icon-pregunta txt-color__principal"
                    v-on="on"
                  />
                </template>

                <v-list>
                  <p>
                    {{ tema.textos.tooltipSujetoObligado }}
                  </p>
                  <ol>
                    <li>Las que se dedican a la compraventa de divisas.</li>
                    <li>
                      Las que se dedican al servicio postal de remesa y/o giro
                      postal.
                    </li>
                    <li>
                      Las que se dedican a la compra y venta de vehículos,
                      embarcaciones y aeronaves.
                    </li>
                    <li>
                      Las que se dedican a la actividad de la construcción y/o
                      la actividad inmobiliaria.
                    </li>
                    <li>Los agentes inmobiliarios.</li>
                    <li>
                      Las que se dedican a la explotación de juegos de casinos
                      y/o máquinas tragamonedas, y/o juegos a distancia
                      utilizando el internet o cualquier otro medio de
                      comunicación, de acuerdo con la normativa sobre la
                      materia.
                    </li>
                    <li>
                      Las que se dedican a la explotación de apuestas deportivas
                      a distancia utilizando el internet o cualquier otro medio
                      de comunicación, de acuerdo con la normativa sobre la
                      materia.
                    </li>
                    <li>
                      Las que se dedican a la explotación de juegos de lotería y
                      similares.
                    </li>
                    <li>Los notarios.</li>
                    <li>
                      Las que se dedican a la comercialización de las
                      maquinarias y equipos que se encuentran comprendidos en
                      las Subpartidas nales.
                    </li>
                    <li>
                      Los abogados y contadores públicos colegiados, que de
                      manera independiente o en sociedad, realizan o se disponen
                      a realizar en nombre de un tercero o por cuenta de este,
                      de manera habitual, las siguientes actividades:
                    </li>
                  </ol>
                </v-list>
              </v-menu>
            </label>
            <v-radio-group
              v-model="esSujetoObligado"
              row
              :disabled="!showBotonEnviarFormulario"
              required
              :rules="[(v) => !!v || 'Selecciona un valor']"
              @change="seleccionarSujetoObligado"
            >
              <v-radio
                label="Si"
                value="si"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="No"
                value="no"
                :color="tema.colorSecundario"
              />
            </v-radio-group>
          </div>
          <div class="perfilador-coorporativo">
            <hr>
            <div class="d-flex mt-8">
              <div>Perfil de inversión:&nbsp;</div>
              <p>{{ perfilDeInversor }}</p>
            </div>

            <div
              v-if="perfilador.numPreguntaPerfilador < 1"
              class="alert-perfilador"
            >
              <v-icon>mdi-exclamation</v-icon>
              <span>
                Para cumplir tu objetivo y construir un plan de inversión
                personalizado. <br>
                Haz <strong>Click</strong> al botón
                <strong>INGRESAR PERFILADOR DE INVERSIÓN.</strong>
              </span>
            </div>

            <v-row>
              <v-col
                v-if="
                  perfilador.numPreguntaPerfilador < 11 &&
                    perfilador.incompleto &&
                    perfilador.numPreguntaPerfilador > 0
                "
                cols="12"
                md="6"
                class="perfil-incompleto_mobile text-center"
              >
                <img
                  src="@/assets/img/alert_red.svg"
                  alt="error de validacion"
                >
                <div class="perfil-incompleto">
                  ¡El Perfilador Digital esta incompleto!
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <v-progress-linear
                  v-if="
                    perfilador.incompleto === true &&
                      perfilador.numPreguntaPerfilador < 1
                  "
                  value="100"
                  height="48"
                  class="barra-progreso_perfilador mt-4"
                  :color="tema.colorPrimario"
                  @click="abrirPerfilador"
                >
                  <strong
                    v-if="perfilador.numPreguntaPerfilador < 1"
                  >INGRESAR PERFILADOR DE INVERSION
                  </strong>
                  <v-icon>mdi-play</v-icon>
                </v-progress-linear>
                <v-progress-linear
                  v-if="
                    perfilador.incompleto === true &&
                      perfilador.numPreguntaPerfilador >= 1
                  "
                  :value="perfilador.porcentajePerfilador"
                  height="48"
                  class="barra-progreso_perfilador mt-4"
                  :color="tema.colorPrimario"
                  @click="abrirPerfilador"
                >
                  <strong
                    v-if="
                      perfilador.numPreguntaPerfilador >= 1 &&
                        perfilador.numPreguntaPerfilador < 10
                    "
                  >COMPLETAR EL PERFILADOR
                    {{ perfilador.numPreguntaPerfilador }}/10
                  </strong>
                  <strong
                    v-if="perfilador.numPreguntaPerfilador === 10"
                  >CONFIRMAR MI PERFIL
                    {{ perfilador.numPreguntaPerfilador }}/10
                  </strong>
                  <v-icon>mdi-play</v-icon>
                </v-progress-linear>
                <v-progress-linear
                  v-if="perfilador.incompleto === false"
                  value="100"
                  height="48"
                  class="barra-completado_perfilador"
                  color="green"
                >
                  <strong class="mr-2">
                    PERFILADOR DE INVERSION COMPLETADO
                  </strong>
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-progress-linear>
                <p
                  v-if="
                    perfilador.numPreguntaPerfilador < 10 &&
                      perfilador.incompleto &&
                      perfilador.numPreguntaPerfilador > 0
                  "
                  class="perfil-incompleto_mobile"
                >
                  Solo completó {{ perfilador.numPreguntaPerfilador }}/10 de las
                  preguntas
                </p>
              </v-col>
              <v-col
                v-if="
                  perfilador.numPreguntaPerfilador < 11 && perfilador.incompleto
                "
                cols="12"
                md="6"
                class="perfil-incompleto_desktop"
              >
                <div class="perfil-incompleto">
                  ¡El Perfilador Digital esta incompleto! por favor de completar
                </div>
                <div class="perfil-incompleto_desc">
                  Solo completó {{ perfilador.numPreguntaPerfilador }}/10 de las
                  preguntas
                </div>
              </v-col>
            </v-row>

            <div v-if="perfilador.incompleto === false">
              <div class="d-flex">
                <div>Objetivo de inversión<span v-if="esActualizarUsuario" class="dat-ob">*</span>:&nbsp;</div>
                <div v-if="esActualizarUsuario" class="select-perfil">
                  <v-select
                    v-model="objetivoInversion"
                    :items="listaObjetivosInversiones"
                    item-text="name"
                    item-value="id"
                    solo
                    background-color="transparent"
                    height="39px"
                    placeholder="Seleccione"
                    class="input-profile"
                    required
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Seleccione una opción']"
                  />
                </div>
                <p v-else>
                  {{ objetivoInversionLabel }}
                </p>
              </div>
              <div class="d-flex">
                <div>Tolerancia al riesgo<span v-if="esActualizarUsuario" class="dat-ob">*</span>:&nbsp;</div>
                <div v-if="esActualizarUsuario" class="select-perfil">
                  <v-select
                    v-model="toleranciaRiesgoValue"
                    @change="onChangeToleranciaRiesgo"
                    :items="listaTolenciasRiesgo"
                    item-text="name"
                    item-value="id"
                    solo
                    background-color="transparent"                    
                    height="39px"
                    placeholder="Seleccione"
                    class="input-profile"
                    required
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Seleccione una opción']"
                  />
                </div>
                <p v-else>{{ toleranciaRiesgo }}</p>
              </div>
            </div>
            
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              class=""
            >Experiencia en el mercado de valores en el último año<span
              class="dat-ob"
            >*</span></label>
            <br>
            <v-radio-group
              v-model="experienciaMercado"
              :disabled="!showBotonEnviarFormulario"
              required
              :rules="[(v) => !!v || 'Selecciona un valor']"
            >
              <v-radio
                label="Ninguna"
                value="Ninguna"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Menos de 5 operaciones"
                value="Menos de 5 operaciones"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Más de 5 operaciones"
                value="Mas de 5 operaciones"
                :color="tema.colorSecundario"
              />
            </v-radio-group>
          </div>
          <p
            v-if="mensajesError.msjErrorInfoFinanciera.mostrar"
            class="error-msj"
          >
            {{ mensajesError.msjErrorInfoFinanciera.mensaje }}
          </p>
          <p v-if="mensajesError.msjCheck.mostrar" class="error-msj">
            {{ mensajesError.msjCheck.mensaje }}
          </p>
          <p v-if="mensajesError.msjrazon.mostrar" class="error-msj">
            {{ mensajesError.msjrazon.mensaje }}
          </p>
          <p v-if="mensajesError.msjPerfilador.mostrar" class="error-msj">
            {{ mensajesError.msjPerfilador.mensaje }}
          </p>
          <p
              v-if="mensajesError.msjErrorInfoFinanciera.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorInfoFinanciera.mensaje }}
            </p>
          <div
            v-if="showBotonEnviarFormulario"
            class="row-infoUsuario mb-10"
          >
            <v-btn
              id="guardar_form_infoFinanciera"
              :disabled="!valid5 || esLoadingFormulario"
              :loading="esLoadingFormulario"
              :color="tema.colorSecundario"
              height="65px"
              @click="onClickGuardarFormulario"
            >
              {{botonGuardarText}}
            </v-btn>
          </div>
        </v-form>
        <v-dialog
          v-model="dialog"
          width="600px"
          content-class="modal100-mobile"
        >
          <v-card
            :class="[
              'text-center card-sujetob',
              tema.class_color,
            ]"
          >
            <div>
              <img src="@/assets/img/warning.svg" alt="error de validacion">
            </div>
            <div>
              <p class="txt-title_sujetob">
                Si es usted un <strong>Sujeto Obligado</strong>
              </p>
              <p>
                No podrá continuar con el alta digital. Por favor comuníquese
                con nosotros para poder asistirlo a
                asesorinteligosab@inteligogroup.com.
              </p>
            </div>

            <div>
              <v-btn
                :color="tema.colorSecundario"
                class="btn-sujetob"
                height="66"
                @click="dialog = false"
              >
                VOLVER
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script lang="ts">
import { mapState, mapGetters, mapActions } from 'vuex';
import { computedExperienciaMercado, computedObjInversion, computedToleranciaRiesgo, computedToleranciaRiesgoFromCRM } from '~/utils/contactoCRM/computedFunctions';
import { IComputed, IData, IMethods } from '~/types/InformacionFinanciera.types';
import { objetivosInversiones, toleranciaRiesgoArray } from '~/config/crm.config';
import { getBotonGuardarTexto } from '~/utils/clienteFormulario';
import { IUsuarioInformacionFinanciera } from '~/types';
import FormularioMixin from '~/mixins/formulario.mixin';

export default FormularioMixin.extend<IData, IMethods, IComputed>({
  data() {
    return {
      showBotonEnviarFormulario: false,
      esFormularioCompleto: false,
      esLoadingFormulario: false,
      dialogPerfilador: false,
      dialog: false,
      valid5: true,
      lazy5: false,
      fuentedefondos: '',
      fuenteUtilidades: false,
      fuenteSueldo: false,
      fuenteHerencia: false,
      fuenteCobros: false,
      fuenteVentaInmueble: false,
      fuenteArrendamientos: false,
      fuenteOtros: false,
      ingresoMensual: '',
      ipDeudaBanc: '',
      ipinvValoAho: '',
      ipVehicEmb: '',
      ipBienesInmu: '',
      esSujetoObligado: '',
      esPEP: '',
      paisfondos: `${process.env.paisEmpresa}`,
      otraOcupacion: '',
      otraFuenteFondos: '',
      mensajesError: {
        msjErrorInfoFinanciera: {
          mensaje: 'Ocurrió un error al guardar su información financiera',
          mostrar: false,
        },
        msjCheck: {
          mensaje: 'Debe seleccionar al menos una fuente de fondos',
          mostrar: false,
        },
        msjrazon: {
          mensaje: 'Debe seleccionar al menos un razón principal',
          mostrar: false,
        },
        msjPerfilador: {
          mensaje:
            'Para finalizar esta sección debe completar su perfil de inversor',
          mostrar: false,
        },
      },
      declaracionIncapacidad: '',
      experienciaMercado: '',
      toleranciaRiesgo: '',
      toleranciaRiesgoValue: 0,
      objetivoInversion: 0,
      razonPrincipalSAB: '',
      razonPrincipalCliente1: false,
      razonPrincipalCliente2: false,
      razonPrincipalCliente3: false,
      razonPrincipalCliente4: false,
      razonPrincipalCliente5: false,
      razonPrincipalCliente6: false,
      fuenteFinanciacionterceros: false,
      perfilador: {
        numPreguntaPerfilador: 0,
        porcentajePerfilador: 0,
        incompleto: false,
      },
      perfilDeInversor: '',
    }
  },
  computed: {
    ...mapState([
      'empresa',
      'informacionFinanciera',
    ]),
    ...mapGetters({
      paises: 'general/getPaises',
      porcentajeRegistroTotal: 'porcentajeRegistroTotal',
    }),
    objetivoInversionLabel: function () {      
      return computedObjInversion(this.objetivoInversion);
    },
    listaObjetivosInversiones: function(){
      return objetivosInversiones;
    },
    listaTolenciasRiesgo: function(){
      return toleranciaRiesgoArray;
    }
  },
  mounted() {
    this.obtenerDatosParaFormulario()
    this.obtenerInformacionPerfilador()
  },
  methods: {
    ...mapActions([
      'registrarPorcentajeInformacionFinanciera',
    ]),
    onClickGuardarFormulario() {
      if ((this.$refs.form5 as  any).validate()) {
        if (!this.perfilador.incompleto) {
          this.postInformacionFinanciera()
        } else {
          this.mensajesError.msjPerfilador.mostrar = true
        }
      } else {
        this.mensajesError.msjErrorInfoFinanciera.mostrar = true
      }
    },
    postInformacionFinanciera() {
      const dataDatosUsuario = {
        id: this.informacionUsuario.id,
        financial_information: {
          funds_source: this.fuentedefondos,
          funds_source_country: this.paisfondos,
          average_monthly_income_range: this.ingresoMensual,
          real_estate_wealth_range: this.ipBienesInmu,
          vehicles_boats_wealth_range: this.ipVehicEmb,
          securities_savings_wealth_range: this.ipinvValoAho,
          bank_debt_range: this.ipDeudaBanc,
          is_pep: this.esPEP,
          is_obliged_subject: this.esSujetoObligado,
          funds_source_other: this.otraFuenteFondos,
          declaration_disability: this.declaracionIncapacidad,
          main_reason_for_client: this.razonPrincipalSAB,
          profile: {
            investment_objective: this.objetivoInversion,
            market_experience: this.experienciaMercado,
            risk_tolerance: this.toleranciaRiesgo,
          },
          objetivoInversion: this.objetivoInversion,
          toleranciaRiesgo: computedToleranciaRiesgo(
            this.toleranciaRiesgo
          ),
          experienciaMercado: computedExperienciaMercado(
            this.experienciaMercado
          ),
          date: new Date(),
          financial_information_completed: true,
        },
      };
      this.esLoadingFormulario = true;
      this.$axios
        .post('/api/financial-information', dataDatosUsuario)
        .then(() => {
          this.showBotonEnviarFormulario = false;
          this.esFormularioCompleto = true;
          this.esLoadingFormulario = false;
          this.registrarPorcentajeInformacionFinanciera();
          this.actualizarInformacionUsuario();
          this.clearPanelSelected();
          this.mensajesError.msjErrorInfoFinanciera.mostrar = false
          this.$store.commit('setInformacionFinancieraCompletado', true);
        })
        .catch((error) => {
          alert(error);
          this.mensajesError.msjErrorInfoFinanciera.mostrar = true;
          this.esLoadingFormulario = false;
        })
    },
    seleccionarPEP() {
      if (this.esPEP === 'si') {
        this.$store.commit('setMostrarAnexoPEP', true)
      } else {
        this.$store.commit('setMostrarAnexoPEP', false)
      }
    },
    seleccionarSujetoObligado() {
      if (this.esSujetoObligado === 'si') {
        this.dialog = true
        this.$store.commit('setSujetoObligado', 'si')
      } else {
        this.dialog = false
        this.$store.commit('setSujetoObligado', 'no')
      }
    },
    obtenerDatosParaFormulario() {
      this.showBotonEnviarFormulario = !this.informacionUsuario.financial_information?.financial_information_completed;
      if (this.informacionUsuario.financial_information) {
        this.esFormularioCompleto = this.informacionUsuario.financial_information.financial_information_completed || false;

        this.fuentedefondos = this.informacionUsuario.financial_information.funds_source || '';

        this.paisfondos = this.informacionUsuario.financial_information.funds_source_country;
        this.ingresoMensual = this.informacionUsuario.financial_information.average_monthly_income_range || '';
        this.ipBienesInmu = this.informacionUsuario.financial_information.real_estate_wealth_range || '';
        this.ipVehicEmb = this.informacionUsuario.financial_information.vehicles_boats_wealth_range || '';
        this.ipinvValoAho = this.informacionUsuario.financial_information.securities_savings_wealth_range || '';
        this.ipDeudaBanc = this.informacionUsuario.financial_information.bank_debt_range || '';
        this.esPEP = this.informacionUsuario.financial_information.is_pep || '';
        this.esSujetoObligado = this.informacionUsuario.financial_information.is_obliged_subject || '';
        this.otraFuenteFondos = this.informacionUsuario.financial_information.funds_source_other || '';
        this.declaracionIncapacidad = this.informacionUsuario.financial_information.declaration_disability || '';
        this.razonPrincipalSAB = this.informacionUsuario.financial_information.main_reason_for_client || '';

        this.objetivoInversion = this.informacionUsuario.financial_information.profile?.investment_objective || 0 ;
        this.experienciaMercado = this.informacionUsuario.financial_information.profile?.market_experience || '' ;
        this.toleranciaRiesgo = this.informacionUsuario.financial_information.profile?.risk_tolerance || '' ;
        this.toleranciaRiesgoValue = this.informacionUsuario.financial_information.profile?.risk_tolerance_value;

        this.seleccionarPEP()
        this.$store.commit(
          'setInformacionFinancieraCompletado',
          this.informacionUsuario.financial_information
            .financial_information_completed
        )
      }
      this.validarPerfilador();
    },
    obtenerInformacionPerfilador() {
      if (Object.keys(this.informacionFinanciera).length !== 0) {
        this.fuentedefondos = this.informacionFinanciera.funds_source
        this.paisfondos = this.informacionFinanciera.funds_source_country
        this.ingresoMensual = this.informacionFinanciera.average_monthly_income_range
        this.ipBienesInmu = this.informacionFinanciera.real_estate_wealth_range
        this.ipVehicEmb = this.informacionFinanciera.vehicles_boats_wealth_range
        this.ipinvValoAho = this.informacionFinanciera.securities_savings_wealth_range
        this.ipDeudaBanc = this.informacionFinanciera.bank_debt_range
        this.esPEP = this.informacionFinanciera.is_pep
        this.esSujetoObligado = this.informacionFinanciera.is_obliged_subject
        this.otraFuenteFondos = this.informacionFinanciera.funds_source_other
        this.declaracionIncapacidad = this.informacionFinanciera.declaration_disability
        this.razonPrincipalSAB = this.informacionFinanciera.main_reason_for_client
        this.experienciaMercado = this.informacionFinanciera.experienciaMercado
      }
    },
    actualizarInformacionUsuario() {

      const financial_information: IUsuarioInformacionFinanciera = !!this.informacionUsuario.financial_information ? {...this.informacionUsuario.financial_information}:{};

      financial_information.funds_source = this.fuentedefondos;
      financial_information.funds_source_country = this.paisfondos;
      financial_information.average_monthly_income_range = this.ingresoMensual;
      financial_information.real_estate_wealth_range = this.ipBienesInmu;
      financial_information.vehicles_boats_wealth_range = this.ipVehicEmb;
      financial_information.securities_savings_wealth_range = this.ipinvValoAho;
      financial_information.bank_debt_range = this.ipDeudaBanc;
      financial_information.is_pep = this.esPEP;
      financial_information.is_obliged_subject = this.esSujetoObligado;
      financial_information.funds_source_other = this.otraFuenteFondos;
      financial_information.declaration_disability = this.declaracionIncapacidad;
      financial_information.main_reason_for_client = this.razonPrincipalSAB;
      financial_information.objetivoInversion = this.objetivoInversion;
      financial_information.experienciaMercado = computedExperienciaMercado(this.experienciaMercado);
      financial_information.toleranciaRiesgo = computedToleranciaRiesgo(this.toleranciaRiesgo);
      if(!!financial_information.profile){
        financial_information.profile.investment_objective = this.objetivoInversion;
        financial_information.profile.market_experience = this.experienciaMercado;
        financial_information.profile.risk_tolerance = this.toleranciaRiesgo;
      }

      this.actionUpdateInformacionUsuario({...this.informacionUsuario, financial_information});
    },
    abrirPerfilador() {
      const dataInformacionFinanciera = {
        funds_source: this.fuentedefondos,
        funds_source_country: this.paisfondos,
        average_monthly_income_range: this.ingresoMensual,
        real_estate_wealth_range: this.ipBienesInmu,
        vehicles_boats_wealth_range: this.ipVehicEmb,
        securities_savings_wealth_range: this.ipinvValoAho,
        bank_debt_range: this.ipDeudaBanc,
        is_pep: this.esPEP,
        is_obliged_subject: this.esSujetoObligado,
        funds_source_other: this.otraFuenteFondos,
        declaration_disability: this.declaracionIncapacidad,
        main_reason_for_client: this.razonPrincipalSAB,
        experienciaMercado: this.experienciaMercado,
      }
      this.$store.commit('setInformacionFinanciera', dataInformacionFinanciera)
      this.validarPerfilador()
      this.$router.push('/perfilador')
    },
    validarPerfilador() {
      const data = {
        id: this.informacionUsuario.id,
        profiler_information: { start: true },
      }
      const dataGet = {
        cuenta: this.informacionUsuario.accountIdentifier,
      }
      this.$axios.post('/api/getProfiler', dataGet).then((res) => {
        if (Object.keys(res.data).length === 0 && !this.esActualizarUsuario) {
          this.$axios.post('/api/profiler', data)
          this.perfilador.incompleto = true
        } else if (Object.keys(res.data).length === 0 && !!this.esActualizarUsuario) {
          this.mensajesError.msjPerfilador.mostrar = false
          this.perfilador.incompleto = false
        }        
        else {
          for (const property in res.data.profiler_information) {
            if (property.slice(0, 8) === 'question') {
              this.perfilador.numPreguntaPerfilador =
                res.data.profiler_information[property].indexPregunta + 1
              this.perfilador.porcentajePerfilador =
                (res.data.profiler_information[property].indexPregunta + 1) * 10
              if (res.data.profiler_information[property].indexPregunta < 9) {
                this.perfilador.incompleto = true
              }
            }
          }
          if (res.data.profiler_information.result) {
            this.mensajesError.msjPerfilador.mostrar = false
            this.perfilador.incompleto = false
            this.perfilDeInversor = res.data.profiler_information.result.profile
            if(!this.esActualizarUsuario){
              this.toleranciaRiesgo = res.data.profiler_information.result.risk;
              this.objetivoInversion = res.data.profiler_information.question1.selectedItem + 1;
            }
          } else {
            this.perfilador.incompleto = true
          }
        }
      })
    },
    changeFuenteDeFondos(){
      this.otraFuenteFondos = '';
    },
    onChangeToleranciaRiesgo(){
      this.toleranciaRiesgo = computedToleranciaRiesgoFromCRM(this.toleranciaRiesgoValue);
    }
  },
})
</script>
<style lang="scss">
.card-sujetob {
  padding: 100px;
  height: 100%;
}
.st_sab p {
  color: #233e99;
}
.st_certia p {
  color: #9c732b;
}
.txt-title_sujetob {
  font-size: 24px;
}
.btn-sujetob {
  margin-top: 30px;
  width: 300px;
  color: #ffffff !important;
}
.barra-progreso_perfilador,
.barra-completado_perfilador {
  width: 100%;
  margin-top: 0px;
  margin-bottom: 5px;
  cursor: pointer;
  .v-progress-linear__content {
    padding: 5px;
  }
}
.alert-perfilador {
  color: #233e99;
  padding: 15px;
  display: flex;
  .v-progress-linear {
    width: 400px !important;
    margin-top: 30px;
  }
  .v-icon {
    transform: rotate(180deg);
    border: 1px solid #233e99;
    border-radius: 100%;
    background-color: #233e99;
    color: #ffffff;
    padding: 8px 10px;
    font-size: 22px;
    margin-right: 20px;
    width: 30px !important;
    height: 30px !important;
  }
  span {
    font-size: 15px;
  }
}
.st_certia .alert-perfilador {
  background-color: #f9f3e8;
  color: #9d5224;
  .v-icon {
    border: 1px solid #9d5224;
    background-color: #9d5224;
  }
}
.st_sab .alert-perfilador {
  background-color: #eef2ff;
  color: #233e99;
  .v-icon {
    border: 1px solid #233e99;
    background-color: #233e99;
  }
}
.perfilador-coorporativo {
  .v-progress-linear__content,
  .v-icon {
    color: #ffffff !important;
  }
  .perfil-incompleto {
    color: #df2027;
    font-weight: bold;
    margin-top: 20px;
  }
  .perfil-incompleto_desktop {
    display: none;
  }
  .perfil-incompleto_mobile {
    display: block;
  }
}

.st_certia .perfil-incompleto_desc {
  color: #6a6a6c;
}
.st_sab .perfil-incompleto_desc {
  color: #233e99;
}
.select-perfil {
  margin-bottom: 1rem;
}
@media (min-width: 768px) {
  .perfilador-coorporativo {
    .alert-perfilador {
      padding: 26px 65px;
      .v-icon {
        width: auto !important;
        height: auto !important;
        margin-right: 50px;
      }
    }
    .barra-progreso_perfilador,
    .barra-completado_perfilador {
      width: 300px;
      margin-top: 0px;
      margin-bottom: 15px;
    }
    .perfil-incompleto_desktop {
      display: block;
    }
    .perfil-incompleto_mobile {
      display: none;
    }
  }
}
@media (min-width: 1025px) {
}
@media (min-width: 1200px) {
  .perfilador-coorporativo {
    .barra-progreso_perfilador,
    .barra-completado_perfilador {
      width: 400px;
    }
  }
}
@media (min-width: 1400px) {
}
@media (max-width: 959px) {
  .card-sujetob {
    padding: 30px;
  }
  .txt-title_sujetob {
    font-size: 18px;
  }
  .btn-sujetob {
    width: 90%;
  }
}
</style>
