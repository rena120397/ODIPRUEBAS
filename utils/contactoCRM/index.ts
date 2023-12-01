import { ITrama, IUsuarioCRMUpdateRequest } from '~/types';

export { default as getObjectFormFromCRM } from './getObjectFormFromCRM';
export { default as getUsuarioCRMFromFormulario } from './getUsuarioCRMFromFormulario';
export { default as getParaActualizarDatos } from './getParaActualizarDatos';
export { default as getParaAltaDatos } from './getParaAltaDatos';
export * from './computedFunctions';

export function formatDataActualizarCRM(datActualizarCRMNativo: IUsuarioCRMUpdateRequest, idContactoCRMBD: string, idInfoAdicionalCRMBD: string, tramaCRM: ITrama): any {

  datActualizarCRMNativo.id = idContactoCRMBD;
  datActualizarCRMNativo.adicionalId = idInfoAdicionalCRMBD;
  if (!!datActualizarCRMNativo.rs_contact) {
    datActualizarCRMNativo.rs_contact.rs_trama = JSON.stringify(
      tramaCRM
    ).replace('&quot', '');
  }

  if (datActualizarCRMNativo.rs_contact_rs_conocercliente_Cliente) {
    datActualizarCRMNativo.rs_contact_rs_conocercliente_Cliente[0]['rs_Cliente_contact@odata.bind'] = `/contacts(${idContactoCRMBD})`
  }

  if (!!datActualizarCRMNativo.rs_contact_rs_personasexpuestas_Cliente) {
    for (let element of datActualizarCRMNativo.rs_contact_rs_personasexpuestas_Cliente) {
      element['rs_Cliente_contact@odata.bind'] = `/contacts(${idContactoCRMBD})`;
    }
  }

  if (!!datActualizarCRMNativo.rs_contact_rs_cuentasbancarias_Cliente) {
    for (let element of datActualizarCRMNativo.rs_contact_rs_cuentasbancarias_Cliente) {
      element['rs_cliente_contact@odata.bind'] = `/contacts(${idContactoCRMBD})`;
    }
  }

  if (datActualizarCRMNativo.rs_crs2s) {
    if (datActualizarCRMNativo.rs_contact) {
      datActualizarCRMNativo.rs_contact.rs_residenciafiscal = true
    }

    if (datActualizarCRMNativo.rs_crs2s.length > 0) {

      for (let element of datActualizarCRMNativo.rs_crs2s) {
        element['rs_Cliente@odata.bind'] = `/contacts(${idContactoCRMBD})`;
      }
    }
  }
  return datActualizarCRMNativo;
}
