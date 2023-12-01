<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="cabecera-panel">
      <div class="p-titulo-bold">Datos de cuenta bancaria Interbank</div>
      <span v-if="esFormularioCompleto" class="icon-check1" />
    </v-expansion-panel-header>
    <v-expansion-panel-content value="10">
      <div>
        <v-btn
          v-if="!showBotonEnviarFormulario && porcentajeRegistroTotal < 100"
          id="editar_form_cuentaBancaria"
          icon
          :color="tema.colorSecundario"
          class="icon-edit"
          @click="editarFormulario"
        >
          Editar <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-form ref="form6" v-model="valid6" :lazy-validation="lazy6">
          <div v-if="autorizacionIbk">
            <p>Selecciona la cuenta bancaria que afiliarás*</p>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <p>Cuentas en Soles</p>
                  <v-radio-group
                    v-model="accountIbkValSoles"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Selecciona un valor']"
                    required
                    @change="seleccionarCuenta"
                  >
                    <div
                      v-for="(accountIbk, index) in cuentasIbkSoles"
                      :key="index"
                    >
                      <v-row align="center" class="cnt-cuenta">
                        <v-radio
                          :value="accountIbk"
                          hide-details
                          :class="`inline-block chk-cuenta${index}`"
                        />
                        <div class="inline-block">
                          <span class="icon-tarjeta" />
                          <span>{{ accountIbk.subType }}</span>
                          <div class="separador-cuenta" />
                          <span>{{ ocultarCuenta(accountIbk.id) }}</span>
                        </div>
                      </v-row>
                    </div>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" md="6">
                  <p>Cuentas en Dólares</p>
                  <v-radio-group
                    v-model="accountIbkValDolares"
                    :disabled="!showBotonEnviarFormulario || loadingCuenta"
                    :rules="[(v) => !!v || 'Selecciona un valor']"
                    required
                    @change="seleccionarCuenta"
                  >
                    <div
                      v-for="(accountIbk, index) in cuentasIbkDolares"
                      :key="index"
                    >
                      <v-row align="center" class="cnt-cuenta">
                        <v-radio
                          :value="accountIbk"
                          hide-details
                          :class="`inline-block chk-cuenta${index}`"
                        />
                        <div class="inline-block">
                          <span class="icon-tarjeta" />
                          <span>{{ accountIbk.subType }}</span>
                          <div class="separador-cuenta" />
                          <span>{{ ocultarCuenta(accountIbk.id) }}</span>
                        </div>
                      </v-row>
                    </div>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-container>

            <div v-if="showBotonEnviarFormulario" class="row-infoUsuario mb-10">
              <p
                v-if="!!mensajeFormulario"
                :class="
                  mensajeFormulario.variante === 'SUCCESS'
                    ? 'success-msj'
                    : 'error-msj'
                "
              >
                {{ mensajeFormulario.mensaje }}
              </p>
              <v-btn
                id="guardar_form_infoBancariaIBK"
                :disabled="validIBK || esLoadingFormulario || loadingCuenta"
                :color="tema.colorSecundario"
                height="65px"
                @click="guardarInformacionBancariaIBK"
                :loading="esLoadingFormulario"
              >
                {{ botonGuardarText }}
              </v-btn>
            </div>
          </div>
          <div v-if="!autorizacionIbk">
            <div class="link-ibk">
              ¿Todavía no tienes una cuenta Interbank? Abre tu Cuenta online ¡en
              solo 1 minuto! Completa tus datos y listo <br />
              <a
                target="_blank"
                href="https://interbank.pe/solicitar/cuenta/simple/inicio"
                @click.stop
                >Abrir mi cuenta Interbank</a
              >
            </div>
            <v-container fluid>
              <v-row>
                <v-col cols="12" md="4">
                  <p>Cuenta en Soles</p>
                  <div class="mb-5">
                    <label
                      for=""
                      :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                      >Tipo de cuenta<span class="dat-ob">*</span></label
                    >
                    <br />
                    <v-select
                      v-model="accountIbkValSoles.type"
                      :items="tipoCuentas"
                      :disabled="!showBotonEnviarFormulario || loadingCuenta"
                      item-text="name"
                      item-value="id"
                      label="Ingresar tipo de cuenta "
                      class="input-profile"
                      solo
                      :rules="[(v) => !!v || 'Seleccione una una cuenta']"
                    />
                  </div>
                  <div class="mb-5">
                    <label
                      for=""
                      :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                      >Número de cuenta<span class="dat-ob">*</span></label
                    >
                    <br />
                    <v-text-field
                      v-model="accountIbkValSoles.id"
                      :disabled="!showBotonEnviarFormulario || loadingCuenta"
                      type="text"
                      class="input-profile"
                      placeholder="Ingresar número cuenta"
                      maxlength="13"
                      solo
                      @keypress="validaSoloNumeros"
                      @keydown="mensajeFormulario = null"
                    />
                  </div>
                </v-col>
                <v-col cols="12" md="4">
                  <p>Cuenta en Dólares</p>
                  <div class="mb-5">
                    <label
                      for=""
                      :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                      >Tipo de cuenta<span class="dat-ob">*</span></label
                    >
                    <br />
                    <v-select
                      v-model="accountIbkValDolares.type"
                      :items="tipoCuentas"
                      :disabled="!showBotonEnviarFormulario || loadingCuenta"
                      item-text="name"
                      item-value="id"
                      label="Ingresar tipo de cuenta "
                      class="input-profile"
                      solo
                      :rules="[(v) => !!v || 'Seleccione una una cuenta']"
                    />
                  </div>
                  <div class="mb-5">
                    <label
                      for=""
                      :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                      >Número de cuenta<span class="dat-ob">*</span></label
                    >
                    <br />
                    <v-text-field
                      v-model="accountIbkValDolares.id"
                      :disabled="!showBotonEnviarFormulario || loadingCuenta"
                      type="text"
                      class="input-profile"
                      placeholder="Ingresar número cuenta"
                      maxlength="13"
                      solo
                      @keypress="validaSoloNumeros"
                      @keydown="mensajeFormulario = null"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-container>
            <p
              v-if="!!mensajeFormulario"
              :class="
                mensajeFormulario.variante === 'SUCCESS'
                  ? 'success-msj'
                  : 'error-msj'
              "
            >
              {{ mensajeFormulario.mensaje }}
            </p>
            <div v-if="showBotonEnviarFormulario" class="row-infoUsuario mb-10">
              <v-btn
                id="guardar_form_infoBancaria"
                class="btn-perfil-usuario"
                :color="tema.colorSecundario"
                height="65px"
                :loading="loadingCuenta || esLoadingFormulario"
                :disabled="loadingCuenta || esLoadingFormulario"
                @click="onClickGuardarFormulario"
              >
                {{ botonGuardarText }}
              </v-btn>
            </div>
          </div>
        </v-form>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script lang="ts">
import { mapActions } from 'vuex'
import { statecodeEnum } from '~/config'
import {
  APIM_IBK_ACCOUNTS_LIST,
  APIM_IBK_ACCOUNTS_VALIDATE,
  APIM_ONBOARDING_KEY,
} from '~/config/enviroment.config'
import { getHeaderAPIM } from '~/utils/clienteFormulario'
import FormularioMixin from '~/mixins/formulario.mixin'
import {
  IUsuarioInformacionBancaria,
  IUsuarioInformacionBancoCuentas,
} from '~/types'
import {
  IData,
  IMethods,
  IComputed,
  ICuentaBancaria,
} from '~/types/CuentasBancarias.types'

export default FormularioMixin.extend<IData, IMethods, IComputed>({
  data() {
    return {
      mensajeFormulario: null,
      showBotonEnviarFormulario: false,
      esFormularioCompleto: false,
      esLoadingFormulario: false,
      valid6: true,
      validIBK: true,
      lazy6: false,
      tipoCuenta: '',
      numeroCuenta: '',
      tipoCuentas: [
        { id: 'SAVING', name: 'Cuenta de ahorros' },
        { id: 'CURRENT', name: 'Cuenta corriente' },
      ],
      moneda: '',
      cuentas: [],
      autorizacionIbk: false,
      cuentasIbkSoles: [],
      cuentasIbkDolares: [],
      accountIbkValSoles: {
        currency: 'PEN',
        id: '',
        type: 'SAVING',
        subType: '',
      },
      accountIbkValDolares: {
        currency: 'USD',
        id: '',
        type: 'SAVING',
        subType: '',
      },
      cuentaValidada: false,
      loadingCuenta: false,
    }
  },
  mounted() {
    this.obtenerDatosParaFormulario()
  },
  methods: {
    ...mapActions([
      'registrarPorcentajeCuentasBancarias',
      'clearPanelSelected',
    ]),
    guardarInformacionBancariaIBK() {
      const dataDatosUsuario = {
        id: this.informacionUsuario.id,
        main_bank_ccount: {
          is_ibk: this.autorizacionIbk,
          date: new Date(),
          main_bank_ccount_completed: true,
          accounts: [
            {
              currency: this.accountIbkValSoles.currency,
              type: this.accountIbkValSoles.type === 'SAVING' ? '557' : '558',
              id: this.accountIbkValSoles.id,
              subType: this.accountIbkValSoles.subType,
            },
            {
              currency: this.accountIbkValDolares.currency,
              type: this.accountIbkValDolares.type === 'SAVING' ? '557' : '558',
              id: this.accountIbkValDolares.id,
              subType: this.accountIbkValDolares.subType,
            },
          ],
        },
      }
      this.esLoadingFormulario = true
      this.$axios
        .post('/api/main-bank-account', dataDatosUsuario)
        .then(() => {
          this.registrarPorcentajeCuentasBancarias()
          this.actualizarInformacionUsuario()
          this.clearPanelSelected()
          this.mensajeFormulario = null
          this.showBotonEnviarFormulario = false
          this.esFormularioCompleto = true
          this.esLoadingFormulario = false
          this.loadingCuenta = false
        })
        .catch((error: any) => {
          alert(error)
          this.mensajeFormulario = {
            mensaje:
              'Ocurrió un error al guardar los datos de su cuenta bancaria',
            variante: 'ERROR',
          }
          this.esLoadingFormulario = false
        })
    },
    obtenerArrayCuentas(
      accounts: Array<IUsuarioInformacionBancoCuentas>,
      cuentaActual?: IUsuarioInformacionBancoCuentas,
      cuentaNueva?: ICuentaBancaria
    ) {
      if (!!cuentaActual && !cuentaNueva?.id) {
        accounts.push({
          ...cuentaActual,
          statecode: statecodeEnum.INACTIVO,
        })
      } else if (!!cuentaActual && !!cuentaNueva?.id) {
        accounts.push({
          ...cuentaActual,
          id: cuentaNueva?.id,
          type: cuentaNueva?.type === 'SAVING' ? '557' : '558',
          statecode: statecodeEnum.ACTIVO,
        })
      } else if (!cuentaActual && !!cuentaNueva?.id) {
        accounts.push({
          currency: cuentaNueva?.currency,
          id: cuentaNueva?.id,
          type: cuentaNueva?.type === 'SAVING' ? '557' : '558',
          statecode: statecodeEnum.ACTIVO,
        })
      }
    },
    actualizarInformacionUsuario() {
      const main_bank_ccount: IUsuarioInformacionBancaria = !!this
        .informacionUsuario.main_bank_ccount
        ? { ...this.informacionUsuario.main_bank_ccount }
        : {}
      const accounts: Array<IUsuarioInformacionBancoCuentas> = []

      const cuentaSoles: IUsuarioInformacionBancoCuentas | undefined =
        main_bank_ccount.accounts?.find((cuenta) => cuenta.currency === 'PEN')
      const cuentaDolares: IUsuarioInformacionBancoCuentas | undefined =
        main_bank_ccount.accounts?.find((cuenta) => cuenta.currency === 'USD')

      this.obtenerArrayCuentas(accounts, cuentaSoles, this.accountIbkValSoles)
      this.obtenerArrayCuentas(
        accounts,
        cuentaDolares,
        this.accountIbkValDolares
      )

      this.actionUpdateInformacionUsuario({
        ...this.informacionUsuario,
        main_bank_ccount: {
          ...this.informacionUsuario.main_bank_ccount,
          accounts,
        },
      })
    },
    ocultarCuenta(cuenta: string) {
      let simbolos = ''
      let ncuenta = ''

      for (let index = 0; index < cuenta.length - 4; index++) {
        simbolos += '*'
      }

      ncuenta = simbolos + cuenta.substr(cuenta.length - 4, 4)
      return ncuenta
    },
    seleccionarCuenta() {
      this.validIBK = false
    },
    obtenerDatosParaFormulario() {
      this.showBotonEnviarFormulario =
        !this.informacionUsuario.main_bank_ccount?.main_bank_ccount_completed
      if (this.informacionUsuario.main_bank_ccount) {
        this.esFormularioCompleto =
          this.informacionUsuario.main_bank_ccount.main_bank_ccount_completed ||
          false

        this.autorizacionIbk =
          this.informacionUsuario.main_bank_ccount.is_ibk || false

        if (!!this.informacionUsuario.main_bank_ccount.accounts) {
          this.cuentasIbkSoles =
            this.informacionUsuario.main_bank_ccount.accounts.filter(
              (cuenta) => cuenta.currency === 'PEN'
            )
          this.accountIbkValSoles.currency = this.cuentasIbkSoles?.[0]?.currency
          this.accountIbkValSoles.id = this.cuentasIbkSoles?.[0]?.id?.replace(
            '-',
            ''
          )
          this.accountIbkValSoles.type =
            this.cuentasIbkSoles?.[0]?.type === '557' ? 'SAVING' : 'CURRENT'

          this.cuentasIbkDolares =
            this.informacionUsuario.main_bank_ccount.accounts.filter(
              (cuenta) => cuenta.currency === 'USD'
            )

          this.accountIbkValDolares.currency =
            this.cuentasIbkDolares?.[0]?.currency
          this.accountIbkValDolares.id =
            this.cuentasIbkDolares?.[0]?.id?.replace('-', '')
          this.accountIbkValDolares.type =
            this.cuentasIbkDolares?.[0]?.type === '557' ? 'SAVING' : 'CURRENT'
        }
      } else if (
        this.informacionUsuario.confirm_ibk_mail &&
        this.informacionUsuario.ibk_acceptance
      ) {
        this.getInformacionIBK(
          this.informacionUsuario.identityDocument.number,
          this.informacionUsuario.identityDocument.type
        )
      }
    },
    editarFormulario() {
      this.showBotonEnviarFormulario = true
      this.esFormularioCompleto = false
      this.mensajeFormulario = null
      if (this.autorizacionIbk) {
        this.getInformacionIBK(
          this.informacionUsuario.identityDocument.number,
          this.informacionUsuario.identityDocument.type
        )
      }
    },
    onClickGuardarFormulario() {
      this.loadingCuenta = true
      if (
        this.accountIbkValDolares.id !== '' ||
        this.accountIbkValSoles.id !== ''
      ) {
        this.mensajeFormulario = null
        const userAccounts = []
        if (!!this.accountIbkValSoles.id) {
          userAccounts.push(this.accountIbkValSoles)
        }
        if (!!this.accountIbkValDolares.id) {
          userAccounts.push(this.accountIbkValDolares)
        }
        this.$axios
          .post(
            APIM_IBK_ACCOUNTS_VALIDATE,
            {
              identityDocumentType:
                this.informacionUsuario.identityDocument.type,
              identityDocumentNumber:
                this.informacionUsuario.identityDocument.number,
              userAccounts,
            },
            {
              headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
            }
          )
          .then((_) => {
            this.mensajeFormulario = {
              mensaje: 'Se ha validado su cuenta exitosamente',
              variante: 'SUCCESS',
            }
            this.loadingCuenta = false
            this.guardarInformacionBancariaIBK()
          })
          .catch((error) => {
            this.loadingCuenta = false
            this.mensajeFormulario = {
              mensaje:
                error.response?.status === 500
                  ? 'En este momento no podemos validar su cuenta'
                  : 'Error al validar su cuenta Interbank. Moneda o cuenta no coinciden',
              variante: 'ERROR',
            }
          })
      } else {
        this.loadingCuenta = false
        this.mensajeFormulario = {
          mensaje: 'Ingrese sus datos bancarios',
          variante: 'ERROR',
        }
      }
    },
    async getInformacionIBK(doc: string, typeDoc: string) {
      this.mensajeFormulario = null
      await this.$axios
        .get(APIM_IBK_ACCOUNTS_LIST, {
          params: {
            identityDocumentNumber: doc,
            identityDocumentType: typeDoc,
          },
          headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
        })
        .then(({ data }) => {
          if (data) {
            this.cuentasIbkSoles = data.filter(
              (cuenta: any) => cuenta.currency === 'PEN'
            )
            this.cuentasIbkDolares = data.filter(
              (cuenta: any) => cuenta.currency === 'USD'
            )

            this.autorizacionIbk =
              !!this.cuentasIbkSoles?.length || !!this.cuentasIbkDolares?.length
          }
        })
        .catch((_) => {
          this.mensajeFormulario = {
            mensaje:
              'En este momento no podemos obtener la información solicitada',
            variante: 'ERROR',
          }
        })
    },
  },
})
</script>
<style>
.seccion-no-autoriza {
  position: relative;
}
.link-ibk {
  position: absolute;
  right: 40px;
  width: 310px;
  z-index: 99999;
  font-size: 13px;
  border: 1px solid #dcdcde;
  padding: 15px;
}
.link-ibk div {
  background: #f4f4f4;
  padding: 15px 10px;
  font-size: 12px;
  margin-bottom: 15px;
}
.link-ibk .v-icon {
  font-size: 15px;
  transform: rotate(180deg);
  border-radius: 50%;
  padding: 2px;
  color: #ffffff;
  margin-right: 8px;
  height: 18px;
}
.st_sab .link-ibk .v-icon {
  background: #0084f8;
}
.st_certia .link-ibk .v-icon {
  background: #9c732b;
}
.st_sab .icon-tarjeta {
  font-size: 20px;
  font-weight: 600;
  vertical-align: text-top;
  margin-right: 16px;
}
.st_certia .icon-tarjeta {
  font-size: 20px;
  font-weight: 600;
  vertical-align: text-top;
  margin-right: 16px;
}
.separador-cuenta {
  width: 1px;
  height: 32px;
  background-color: #083165;
  display: inline-block;
  margin-bottom: -10px;
  margin-left: 16px;
  margin-right: 16px;
}
.cnt-cuenta {
  padding: 20px 30px;
  background-color: #edeeee;
  display: inline-block;
  margin-left: 0px;
  margin-right: 0px;
  font-weight: 600;
  margin-bottom: 15px;
}
.st_sab .cnt-cuenta {
  color: #233e99;
}
.st_certia .cnt-cuenta {
  color: #9c732b;
}

@media (max-width: 959px) {
  .cnt-cuenta {
    padding: 20px 7px;
    font-size: 12px !important;
  }
  .st_sab .icon-tarjeta {
    vertical-align: text-bottom;
    margin-right: 5px;
  }
  .separador-cuenta {
    margin-left: 2px;
    margin-right: 2px;
  }
  .st_certia .icon-tarjeta,
  .st_sab .icon-tarjeta {
    margin-right: 2px;
  }
  .link-ibk {
    position: initial;
    width: 100%;
    margin-bottom: 30px;
  }
}
</style>
