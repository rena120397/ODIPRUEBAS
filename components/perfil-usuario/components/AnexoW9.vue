<template>
  <v-expansion-panel v-if="mostrarAnexoW9">
    <v-expansion-panel-header class="cabecera-panel">
      <div class="p-titulo-bold">
        Anexo W9 - Ciudadano Americano
      </div>
      <span v-if="esFormularioCompleto" class="icon-check1" />
    </v-expansion-panel-header>
    <v-expansion-panel-content value="4">
      <div>
        <v-btn
          v-if="!showBotonEnviarFormulario && porcentajeRegistroTotal < 100"
          id="editar_form_w9"
          icon
          :color="tema.colorSecundario"
          class="icon-edit"
          @click="editarFormulario"
        >
          Editar <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-form ref="form7" v-model="valid7" :lazy-validation="lazy7">
          <div class="row-infoUsuario">
            <label
              for=""
              class=""
            >Check appropriate box for federal tax classification of the
              person<span class="dat-ob">*</span></label>
            <br>
            <v-radio-group
              v-model="radioTaxClas"
              :disabled="!showBotonEnviarFormulario"
              required
              :rules="[(v) => !!v || 'Selecciona un valor']"
            >
              <v-radio
                label="Individual/sole proprietor or single-member LLC"
                value="proprietor"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="C Corporation"
                value="CCorporation"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="S Corporation"
                value="SCorporation"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Partnership"
                value="Partnership"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Trust/estate"
                value="TrustEstate"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Limited liability company"
                value="LimitedLiability"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Other"
                value="Other"
                :color="tema.colorSecundario"
              />
            </v-radio-group>
          </div>
          <div
            v-if="radioTaxClas === 'LimitedLiability'"
            class="row-infoUsuario"
          >
            <label for="">
              Enter the tax classification<span class="dat-ob">*</span> <br>
              (C=C corporation, S=S corporation, P=Partnership)</label>
            <br>
            <v-radio-group
              v-model="TaxClassification"
              row
              :disabled="!showBotonEnviarFormulario"
              required
              :rules="[(v) => !!v || 'Selecciona un valor']"
            >
              <v-radio
                label="C"
                value="1"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="S"
                value="2"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="P"
                value="3"
                :color="tema.colorSecundario"
              />
            </v-radio-group>
          </div>
          <div v-if="radioTaxClas === 'Other'" class="row-infoUsuario">
            <label for=""> Other<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="iptOther"
              :disabled="!showBotonEnviarFormulario"
              :rules="[(v) => !!v || 'Enter other']"
              placeholder="Enter other"
              class="input-profile"
              required
              solo
              @keypress="validarEspaciosEnBlanco"
            />
          </div>
          <div class="row-infoUsuario">
            <label for=""> Taxpayer Identification Number</label>
            <br>
            <v-radio-group
              v-model="selectTIN"
              row
              :disabled="!showBotonEnviarFormulario"
              required
              :rules="[(v) => !!v || 'Selecciona un valor']"
              @change=";(SocialSecurity = ''), (numeroIdentificacion = '')"
            >
              <v-radio
                label="Social security number"
                value="1"
                :color="tema.colorSecundario"
              />
              <v-radio
                label="Employer identification number"
                value="2"
                :color="tema.colorSecundario"
              />
            </v-radio-group>
          </div>
          <div v-if="selectTIN === '1'" class="row-infoUsuario">
            <label for="">
              Social security number<span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="SocialSecurity"
              :disabled="!showBotonEnviarFormulario"
              placeholder="Enter number"
              class="input-profile"
              maxlength="9"
              required
              solo
              :rules="rules.ssn"
              @keypress="validaSoloNumeros"
            />
          </div>
          <div v-if="selectTIN === '2'" class="row-infoUsuario">
            <label for="">
              Employer identification number
              <span class="dat-ob">*</span></label>
            <br>
            <v-text-field
              v-model="numeroIdentificacion"
              :disabled="!showBotonEnviarFormulario"
              placeholder="Enter number"
              class="input-profile"
              maxlength="9"
              required
              solo
              :rules="rules.ssn"
              @keypress="validaSoloNumeros"
            />
          </div>
          <div v-if="showBotonEnviarFormulario" class="row-infoUsuario">
            <p
              v-if="mensajesError.msjErrorW9.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorW9.mensaje }}
            </p>
            <p
              v-if="mensajesError.msjErrorW9.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorW9.mensaje }}
            </p>
            <v-btn
              id="guardar_form_w9"
              :disabled="!valid7 || esLoadingFormulario"
              :loading="esLoadingFormulario"
              :color="tema.colorSecundario"
              height="65px"
              @click="onClickGuardarFormulario"
            >
              {{botonGuardarText}}
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
<script lang="ts">
import { mapState, mapActions, mapGetters } from 'vuex';
import { IUsuarioInformacionAnexo9 } from '~/types/Usuario.types';
import { IComputed, IData, IMethods } from '~/types/AnexoW9.types';
import Vue from 'vue';
import { getBotonGuardarTexto } from '~/utils/clienteFormulario';
import FormularioMixin from '~/mixins/formulario.mixin';

export default FormularioMixin.extend<IData, IMethods, IComputed>({
  data() {
    return {
      showBotonEnviarFormulario:false,
      esFormularioCompleto: false,
      esLoadingFormulario: false,
      formGeneradorCompletado: false,
      errorFormGeneradorCompletado: 'Por favor guarde su información personal',
      btnEditarw9: false,
      valid7: true,
      lazy7: false,
      mensajesError: {
        msjErrorW9: {
          mensaje: 'Ocurrió un error al guardar los avisos legales',
          mostrar: false,
        },
      },
      proprietor: false,
      SocialSecurity: '',
      Other: false,
      LimitedLiability: false,
      TrustEstate: false,
      Partnership: false,
      SCorporation: false,
      CCorporation: false,
      TaxClassification: '',
      iptOther: '',
      radioTaxClas: '',
      numeroIdentificacion: '',
      selectTIN: '1',
      rules: {
        ssn: [
          (v: any) =>
            !v ||
            /^\d{9}(?:[-\s]\d{4})?$/.test(v) ||
            'El número debe tener 9 dígitos',
          (v: any) => !!v || 'Ingrese un valor',
        ],
      },
    }
  },
  computed: {
    ...mapState([
      'mostrarAnexoW9',
      'informacionPersonalCompletado',
    ])
  },
  mounted() {
    this.obtenerDatosParaFormulario()
  },
  methods: {
    onClickGuardarFormulario() {
      if (this.informacionPersonalCompletado) {
        const dataAnexo = {
          id: this.informacionUsuario.id,
          annexed_w9: {
            individual_proprietor_single_member: this.proprietor,
            CCorporation: this.CCorporation,
            SCorporation: this.SCorporation,
            Partnership: this.Partnership,
            TrustEstate: this.TrustEstate,
            LimitedLiability: this.LimitedLiability,
            has_other: this.Other,
            Other: this.iptOther,
            TaxClassification: this.TaxClassification,
            SocialSecurity: this.SocialSecurity,
            radioTaxClas: this.radioTaxClas,
            selectTIN: this.selectTIN,
            numeroIdentificacion: this.numeroIdentificacion,
            date: new Date(),
            annexed_w9_completed: true,
          },
        };
        this.esLoadingFormulario = true;
        this.$axios
          .post('/api/annexed-w9', dataAnexo)
          .then(() => {
            this.showBotonEnviarFormulario = false;
            this.esFormularioCompleto = true;
            this.esLoadingFormulario = false;
            this.mensajesError.msjErrorW9.mostrar = false
            this.$store.commit('setInformacionAnexo9Completado', true);
            this.actualizarInformacionUsuario();
            this.clearPanelSelected();
          })
          .catch((error) => {
            alert(error);
            this.mensajesError.msjErrorW9.mostrar = true;
            this.esLoadingFormulario = false;
          })
        this.formGeneradorCompletado = false
      } else {
        this.formGeneradorCompletado = true
      }
    },
    actualizarInformacionUsuario() {

      const annexed_w9: IUsuarioInformacionAnexo9 = !!this.informacionUsuario.annexed_w9 ? {...this.informacionUsuario.annexed_w9}:{};
      annexed_w9.individual_proprietor_single_member = this.proprietor;
      annexed_w9.CCorporation = this.CCorporation;
      annexed_w9.SCorporation = this.SCorporation;
      annexed_w9.Partnership = this.Partnership;
      annexed_w9.TrustEstate = this.TrustEstate;
      annexed_w9.LimitedLiability = this.LimitedLiability;
      annexed_w9.Other = this.iptOther;
      annexed_w9.has_other = this.Other;
      annexed_w9.TaxClassification = this.TaxClassification;
      annexed_w9.SocialSecurity = this.SocialSecurity;
      annexed_w9.radioTaxClas = this.radioTaxClas;
      annexed_w9.selectTIN = this.selectTIN;
      annexed_w9.numeroIdentificacion = this.numeroIdentificacion;
      this.actionUpdateInformacionUsuario({...this.informacionUsuario, annexed_w9});
      
    },
    obtenerDatosParaFormulario() {
      this.showBotonEnviarFormulario = !this.informacionUsuario.annexed_w9?.annexed_w9_completed;
      if (this.informacionUsuario.annexed_w9) {

        this.esFormularioCompleto = this.informacionUsuario.annexed_w9.annexed_w9_completed || false;

        this.proprietor = this.informacionUsuario.annexed_w9.individual_proprietor_single_member || false;
        this.CCorporation = this.informacionUsuario.annexed_w9.CCorporation || false;
        this.SCorporation = this.informacionUsuario.annexed_w9.SCorporation || false;
        this.Partnership = this.informacionUsuario.annexed_w9.Partnership || false;
        this.TrustEstate = this.informacionUsuario.annexed_w9.TrustEstate || false;
        this.LimitedLiability = this.informacionUsuario.annexed_w9.LimitedLiability || false;
        this.Other = this.informacionUsuario.annexed_w9.has_other || false;
        this.iptOther = this.informacionUsuario.annexed_w9.Other || '';
        this.TaxClassification = this.informacionUsuario.annexed_w9.TaxClassification || '';
        this.SocialSecurity = this.informacionUsuario.annexed_w9.SocialSecurity || '';
        this.radioTaxClas = this.informacionUsuario.annexed_w9.radioTaxClas || '';
        this.selectTIN = this.informacionUsuario.annexed_w9.selectTIN || '';
        this.numeroIdentificacion = this.informacionUsuario.annexed_w9.numeroIdentificacion || '';

        this.$store.commit(
          'setInformacionAnexo9Completado',
          this.informacionUsuario.annexed_w9.annexed_w9_completed
        )
      }
    },
  },
})
</script>
