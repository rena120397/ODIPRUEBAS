export default function validateExternalUpdate({ store, route }) {

  if (route.name === 'perfil-usuario-update') {
    store.commit('setEsActualizarUsuario', true);
  }
  
}