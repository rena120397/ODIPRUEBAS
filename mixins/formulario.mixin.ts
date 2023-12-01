import Vue from 'vue';
import { mapActions, mapState, mapGetters } from 'vuex';
import { getBotonGuardarTexto } from '~/utils/clienteFormulario';
import { IMixinDataFomulario, IMixinComputedFomulario, IMixinMethodsFomulario } from './types';


export default Vue.extend<IMixinDataFomulario, IMixinMethodsFomulario, IMixinComputedFomulario>({
    data() {
        return {
            esFormularioCompleto: false,
            esLoadingFormulario: false,
            showBotonEnviarFormulario:false,
            mensajeFormulario: null,
        };
    },
    computed: {
        ...mapState([
            'esActualizarUsuario',
            'informacionUsuario',
            'tema',
        ]),
        ...mapGetters({
            paises: 'general/getPaises',
            nacionalidades: 'general/getNacionalidades',
            departamentos: 'general/getDepartamentos',
            provincias: 'general/getProvincias',
            distritos: 'general/getDistritos',
            cargos: 'general/getCargos',
            paisesResidenciaFiscal: 'general/getPaisesResidenciaFiscal',
            porcentajeRegistroTotal: 'porcentajeRegistroTotal'
        }),
        botonGuardarText() {
            return getBotonGuardarTexto(this.esActualizarUsuario);
        },

    },
    methods: {
        ...mapActions({
            clearPanelSelected: 'clearPanelSelected',
            actionUpdateInformacionUsuario: 'actionUpdateInformacionUsuario',
            openModalRequestFail: 'formulario/openModalRequestFail',
            openModal: 'formulario/openModal',
        }),
        soloNumeros(e: any) {
            const key = e.charCode;
            return key >= 48 && key <= 57;
        },
        validaSoloNumeros(e: any) {
            if (!this.soloNumeros(e)) {
                e.preventDefault();
            }
        },
        esAlfanumerico(e?: any) {
            return /^[A-Za-z0-9]+$/.test(e.key);
        },
        validaAlfaNumerico(e: any) {
            if (!this.esAlfanumerico(e)) {
                e.preventDefault();
            }
        },
        validarEspaciosEnBlanco(e?: KeyboardEvent) {
            if ((!(e?.target as any).value) && e?.code === 'Space') {
                e?.preventDefault();
            }
        },
        editarFormulario() {
            this.showBotonEnviarFormulario = true;
            this.esFormularioCompleto = false;
        },
        formatDate(date: any) {
            if (!date) { return null; }

            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        }
    }
})
