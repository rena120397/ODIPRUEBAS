export { default as LoaderGlobal } from '../..\\components\\loaders\\loader-global\\loader-global.vue'
export { default as AnexoPEP } from '../..\\components\\perfil-usuario\\components\\AnexoPEP.vue'
export { default as AnexoW8 } from '../..\\components\\perfil-usuario\\components\\AnexoW8.vue'
export { default as AnexoW9 } from '../..\\components\\perfil-usuario\\components\\AnexoW9.vue'
export { default as AvisosLegales } from '../..\\components\\perfil-usuario\\components\\AvisosLegales.vue'
export { default as ClienteIndependiente } from '../..\\components\\perfil-usuario\\components\\ClienteIndependiente.vue'
export { default as CuentasBancarias } from '../..\\components\\perfil-usuario\\components\\CuentasBancarias.vue'
export { default as DatosLaborales } from '../..\\components\\perfil-usuario\\components\\DatosLaborales.vue'
export { default as InformacionConyuge } from '../..\\components\\perfil-usuario\\components\\InformacionConyuge.vue'
export { default as InformacionFinanciera } from '../..\\components\\perfil-usuario\\components\\InformacionFinanciera.vue'
export { default as InformacionPersonal } from '../..\\components\\perfil-usuario\\components\\InformacionPersonal.vue'
export { default as InformacionUsuario } from '../..\\components\\perfil-usuario\\components\\InformacionUsuario.vue'
export { default as RequestFail } from '../..\\components\\modals\\request-fail.vue'
export { default as PerfilUsuario } from '../..\\components\\perfil-usuario\\PerfilUsuario.vue'
export { default as FooterUsuario } from '../..\\components\\FooterUsuario.vue'
export { default as IniciarSesion } from '../..\\components\\IniciarSesion.vue'
export { default as MensajeIBK } from '../..\\components\\MensajeIBK.vue'
export { default as NavUsuario } from '../..\\components\\NavUsuario.vue'
export { default as Perfilador } from '../..\\components\\Perfilador.vue'
export { default as RegistroUsuario } from '../..\\components\\RegistroUsuario.vue'
export { default as ValidacionIdentidad } from '../..\\components\\ValidacionIdentidad.vue'
export { default as ValidarCliente } from '../..\\components\\ValidarCliente.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
