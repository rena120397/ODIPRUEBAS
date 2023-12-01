<template>
  <v-expansion-panel v-if="mostrarAnexoClienteIndependiente">
    <v-expansion-panel-header class="cabecera-panel">
      <div class="p-titulo-bold">
        Cliente Independiente - Cuestionario conoce a tu cliente
      </div>
      <span v-if="btnguardarInformacionLaboral" class="icon-check1" />
    </v-expansion-panel-header>
    <v-expansion-panel-content value="7">
      <div>
        <v-btn
          v-if="btnguardarInformacionLaboral && porcentajeRegistroTotal < 100"
          id="editar_form_clienteInd"
          icon
          :color="tema.colorSecundario"
          class="icon-edit"
          @click="editarFormulario"
        >
          Editar <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-form ref="form4" v-model="valid4" :lazy-validation="lazy4">
          <div class="row-infoUsuario-check">
            <label
              for=""
              :class="disableInformacionLaboral ? '' : 'label-disabled'"
            >Indique el tamaño del negocio<span class="dat-ob">*</span></label>
            <v-radio-group
              v-model="tamanioNegocio"
              row
              :disabled="!disableInformacionLaboral"
              :rules="[(v) => !!v || 'Selecciona un valor']"
              required
            >
              <v-radio
                label="Principal contribuyente"
                value="principalContribuyente"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Mediano contribuyente"
                value="medianoContribuyente"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Pyme"
                value="pyme"
                :color="tema.colorSecundario"
              />
            </v-radio-group>
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="disableInformacionLaboral ? '' : 'label-disabled'"
            >¿La empresa forma parte de algún Grupo Económico? <br>
              Indique cual<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="grupoEconomico"
              :disabled="!disableInformacionLaboral"
              :rules="[(v) => !!v || 'Ingresar Información']"
              placeholder="Ingresar información"
              class="input-profile"
              required
              solo
              @keypress="validarEspaciosEnBlanco"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="disableInformacionLaboral ? '' : 'label-disabled'"
            >¿La empresa es franquicia?<br>
              Indique el nombre de la franquicia<span
                class="dat-ob"
              >*</span></label>
            <br>
            <v-text-field
              v-model="nombreFranquicia"
              :disabled="!disableInformacionLaboral"
              :rules="[(v) => !!v || 'Ingresar Información']"
              placeholder="Ingresar nombre de la franquicia"
              class="input-profile"
              required
              solo
              @keypress="validarEspaciosEnBlanco"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="disableInformacionLaboral ? '' : 'label-disabled'"
            >¿Cuál es la actividad económica principal a la cual se
              dedica?<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="actividadEconomica"
              :disabled="!disableInformacionLaboral"
              :rules="[(v) => !!v || 'Ingresar Información']"
              placeholder="Ingresar actividad económica"
              class="input-profile"
              required
              solo
              @keypress="validarEspaciosEnBlanco"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="disableInformacionLaboral ? '' : 'label-disabled'"
            >¿Cuál es la segunda actividad económica?<span
              class="dat-ob"
            >*</span></label>
            <br>
            <v-text-field
              v-model="segundaActividad"
              :disabled="!disableInformacionLaboral"
              :rules="[(v) => !!v || 'Ingresar Información']"
              placeholder="Ingresar actividad económica"
              class="input-profile"
              required
              solo
              @keypress="validarEspaciosEnBlanco"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="disableInformacionLaboral ? '' : 'label-disabled'"
            >¿En qué ciudad se desarrolla la principal actividad productiva o
              de servicio?<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="ciudad"
              :disabled="!disableInformacionLaboral"
              :rules="[(v) => !!v || 'Ingresar Información']"
              placeholder="Ingresar ciudad"
              class="input-profile"
              required
              solo
              @keypress="validarEspaciosEnBlanco"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="disableInformacionLaboral ? '' : 'label-disabled'"
            >¿En qué ciudad se desarrolla la principal actividad comercial
              (ventas)?<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="ciudadVentas"
              :disabled="!disableInformacionLaboral"
              :rules="[(v) => !!v || 'Ingresar Información']"
              placeholder="Ingresar ciudad"
              class="input-profile"
              required
              solo
              @keypress="validarEspaciosEnBlanco"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="disableInformacionLaboral ? '' : 'label-disabled'"
            >¿Cuál son los 5 principales productos o servicios que vende o
              fabrica?<span class="dat-ob">*</span></label>
            <br>
            <v-textarea
              v-model="productosServicios"
              :disabled="!disableInformacionLaboral"
              :rules="[(v) => !!v || 'Ingresar Información']"
              placeholder="Ingresar productos o servicios"
              class="input-profile_area"
              required
              solo
              rows="1"
              @keypress="validarEspaciosEnBlanco"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="disableInformacionLaboral ? '' : 'label-disabled'"
            >El promedio de ventas mensual de los últimos 12 meses ha sido
              S/<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="montoPromedio"
              :disabled="!disableInformacionLaboral"
              :rules="[(v) => !!v || 'Ingresar monto']"
              placeholder="Ingresar monto en S/"
              class="input-profile"
              required
              solo
              @keypress="validaSoloNumeros"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="disableInformacionLaboral ? '' : 'label-disabled'"
            >¿Sus proveedores son nacionales o internacionales? <br>
              Indicar el porcentaje en cada caso<span
                class="dat-ob"
              >*</span></label>
            <br>
            <v-text-field
              v-model="informacionProveedor"
              :disabled="!disableInformacionLaboral"
              :rules="[(v) => !!v || 'Ingresar información']"
              placeholder="Ingresar información"
              class="input-profile"
              required
              solo
              @keypress="validarEspaciosEnBlanco"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="disableInformacionLaboral ? '' : 'label-disabled'"
            >Indique el nombre de sus 5 principales proveedores, incluyendo la
              ciudad donde éstos se ubican<span class="dat-ob">*</span></label>
            <br>
            <v-textarea
              v-model="nombreProveedor"
              :disabled="!disableInformacionLaboral"
              :rules="[(v) => !!v || 'Ingresar información']"
              placeholder="Ingresar el nombre de sus proveedores"
              class="input-profile_area"
              required
              solo
              rows="1"
              @keypress="validarEspaciosEnBlanco"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="disableInformacionLaboral ? '' : 'label-disabled'"
            >Indique el nombre de sus 5 principales clientes , incluyendo la
              ciudad donde éstos se ubican<span class="dat-ob">*</span></label>
            <br>
            <v-textarea
              v-model="nombreClientes"
              :disabled="!disableInformacionLaboral"
              :rules="[(v) => !!v || 'Ingresar información']"
              placeholder="Ingresar el nombre de sus cliente"
              class="input-profile_area"
              required
              solo
              rows="1"
              @keypress="validarEspaciosEnBlanco"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="disableInformacionLaboral ? '' : 'label-disabled'"
            >Porcentaje de sus ventas en efectivo<span
              class="dat-ob"
            >*</span></label>
            <br>
            <v-text-field
              v-model="porcentajeVentas"
              :disabled="!disableInformacionLaboral"
              :rules="[
                (v) => !!v || 'Ingresar información',
                (v) => v >= 0 || 'Ingrese un porcentaje mayor a 0',
              ]"
              placeholder="Ingresar %"
              type="number"
              class="input-profile"
              required
              solo
              @keyup="calcularPorcentajeVentas"
            />
          </div>
          <div class="row-infoUsuario">
            <label
              for=""
              :class="disableInformacionLaboral ? '' : 'label-disabled'"
            >Porcentaje de pago bancario<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="porcentajePago"
              :disabled="!disableInformacionLaboral"
              :rules="[
                (v) => !!v || 'Ingresar información',
                (v) => v >= 0 || 'Ingrese un porcentaje mayor a 0',
              ]"
              placeholder="Ingresar %"
              type="number"
              class="input-profile"
              required
              solo
              @keyup="calcularPorcentajePago"
            />
          </div>

          <div class="row-infoUsuario">
            <label
              for=""
              :class="disableInformacionLaboral ? '' : 'label-disabled'"
            >Si es una empresa inscrita en el “Registro para el Control de
              bienes fiscalizados” de la Sunat ¿Tiene obligación de enviar algún
              tipo de Reporte a la Sunat o a la UIF?, ¿Con que frecuencia?,
              ¿Cuándo fue la última información enviada?<span
                class="dat-ob"
              >*</span></label>
            <br>
            <v-text-field
              v-model="registroControlBienes"
              :disabled="!disableInformacionLaboral"
              :rules="[(v) => !!v || 'Ingresar información']"
              placeholder="Ingresar información"
              class="input-profile"
              required
              solo
              @keypress="validarEspaciosEnBlanco"
            />
          </div>
          <div
            v-if="!btnguardarInformacionLaboral"
            class="row-infoUsuario mb-10"
          >
            <p
              v-if="mensajesError.msjErrorDatosLaborales.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorDatosLaborales.mensaje }}
            </p>
            <v-btn
              id="guardar_form_clienteInd"
              :disabled="!valid4"
              :color="tema.colorSecundario"
              height="65px"
              @click="guardarInformacionLaboral"
            >
              GUARDAR
            </v-btn>
          </div>
          <div v-if="btnEditarClienteIndependiente" class="row-infoUsuario">
            <div
              v-if="mensajesError.msjErrorDatosLaborales.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorDatosLaborales.mensaje }}
            </div>
            <v-btn
              id="guardar_formeditado_clienteInd"
              :disabled="!valid4"
              :color="tema.colorSecundario"
              height="65px"
              @click="editarClienteIndependiente"
            >
              GUARDAR CLIENTE INDEPENDIENTE
            </v-btn>
          </div>
          <div v-if="formGeneradorCompletado" class="error-msj">
            {{ errorFormGeneradorCompletado }}
          </div>
        </v-form>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      formGeneradorCompletado: false,
      errorFormGeneradorCompletado: 'Por favor guarde su información laboral',
      btnEditarClienteIndependiente: false,
      valid4: true,
      lazy4: false,
      menu: false,
      disableInformacionLaboral: true,
      mensajesError: {
        msjErrorDatosLaborales: {
          mensaje: 'Ocurrió un error al guardar su información laboral',
          mostrar: false,
        },
      },
      btnguardarInformacionLaboral: false,
      tamanioNegocio: '',
      grupoEconomico: '',
      nombreFranquicia: '',
      actividadEconomica: '',
      segundaActividad: '',
      ciudad: '',
      ciudadVentas: '',
      productosServicios: '',
      montoPromedio: '',
      informacionProveedor: '',
      nombreProveedor: '',
      nombreClientes: '',
      porcentajeVentas: 0,
      porcentajePago: 0,
      registroControlBienes: '',
    }
  },
  computed: {
    ...mapState([
      'tema',
      'informacionUsuario',
      'usuarioId',
      'mostrarAnexoClienteIndependiente',
      'informacionDatosLaboralCompletado',
    ]),
    ...mapGetters({
      porcentajeRegistroTotal: 'porcentajeRegistroTotal'
    }),
  },
  mounted() {
    this.obtenerClienteIndependiente()
  },
  methods: {
    calcularPorcentajeVentas() {
      this.porcentajePago = 100 - this.porcentajeVentas
    },
    calcularPorcentajePago() {
      this.porcentajeVentas = 100 - this.porcentajePago
    },
    guardarInformacionLaboral() {
      if (this.informacionDatosLaboralCompletado) {
        const data = {
          id: this.informacionUsuario.id,
          independent_client: {
            business_size: this.tamanioNegocio,
            economic_group: this.grupoEconomico,
            franchise_name: this.nombreFranquicia,
            economic_activity: this.actividadEconomica,
            second_activity: this.segundaActividad,
            city: this.ciudad,
            city_of_sales: this.ciudadVentas,
            products_and_services: this.productosServicios,
            average_amount: parseInt(this.montoPromedio),
            suppliers_information: this.informacionProveedor,
            suppliers_name: this.nombreProveedor,
            clients_name: this.nombreClientes,
            sales_percentage: parseInt(this.porcentajeVentas),
            payment_percentage: parseInt(this.porcentajePago),
            property_control_record: this.registroControlBienes,
            date: new Date(),
            independent_client_completed: true,
          },
        }

        this.$axios
          .post('/api/independent_client', data)
          .then(() => {
            this.btnguardarInformacionLaboral = true
            this.disableInformacionLaboral = false
            this.mensajesError.msjErrorDatosLaborales.mostrar = false
            this.$store.commit('setInformacionClientIndepCompletado', true)
          })
          .catch((error) => {
            alert(error)
            this.mensajesError.msjErrorDatosLaborales.mostrar = true
          })
        this.formGeneradorCompletado = false
      } else {
        this.formGeneradorCompletado = true
      }
    },
    obtenerClienteIndependiente() {
      if (this.informacionUsuario.independent_client) {
        // validacion para mostrar botones de guardado y habilitar cada campo del formulario
        this.btnguardarInformacionLaboral = this.informacionUsuario.independent_client.independent_client_completed
        this.disableInformacionLaboral = !this.informacionUsuario
          .independent_client.independent_client_completed

        this.tamanioNegocio = this.informacionUsuario.independent_client.business_size
        this.grupoEconomico = this.informacionUsuario.independent_client.economic_group
        this.nombreFranquicia = this.informacionUsuario.independent_client.franchise_name
        this.actividadEconomica = this.informacionUsuario.independent_client.economic_activity
        this.segundaActividad = this.informacionUsuario.independent_client.second_activity
        this.ciudad = this.informacionUsuario.independent_client.city
        this.ciudadVentas = this.informacionUsuario.independent_client.city_of_sales
        this.productosServicios = this.informacionUsuario.independent_client.products_and_services
        this.montoPromedio = this.informacionUsuario.independent_client.average_amount
        this.informacionProveedor = this.informacionUsuario.independent_client.suppliers_information
        this.nombreProveedor = this.informacionUsuario.independent_client.suppliers_name
        this.nombreClientes = this.informacionUsuario.independent_client.clients_name
        this.porcentajeVentas = this.informacionUsuario.independent_client.sales_percentage
        this.porcentajePago = this.informacionUsuario.independent_client.payment_percentage
        this.registroControlBienes = this.informacionUsuario.independent_client.property_control_record
        this.$store.commit(
          'setInformacionClientIndepCompletado',
          this.informacionUsuario.independent_client
            .independent_client_completed
        )
      }
    },
    editarClienteIndependiente() {
      this.btnguardarInformacionLaboral = true
      this.disableInformacionLaboral = false
      this.btnEditarClienteIndependiente = false
      this.guardarInformacionLaboral()
    },
    soloNumeros(e) {
      const key = e.charCode
      return key >= 48 && key <= 57
    },
    validaSoloNumeros(e) {
      if (!this.soloNumeros(e)) {
        e.preventDefault()
      }
    },
  },
}
</script>
