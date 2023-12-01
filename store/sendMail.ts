import { ActionTree } from "vuex";
import {
  APIM_SEND_MAIL,
  APIM_SEND_MAIL_OFFICE_365,
  APIM_SEND_MAIL_SENGRID,
  APIM_ONBOARDING_KEY,
  CORREO_ASESOR_SAB_TO,
  CORREO_CONTROL_OPERATIVO_ENVIAR_TO,
  CORREO_CUMPLIMIENTO_ENVIAR_CC,
  CORREO_CUMPLIMIENTO_ENVIAR_TO,
  CORREO_ERROR_TO,
} from "~/config";
import {
  ISendMailErrorParams,
  ISendMailOffice365,
  ISendMailOffice365Address,
  ISendMailAvisosLegalesParams,
  ISendMailSengrid,
} from "~/types/sendMail.types";
import { IGeneralState } from "./types";
import { getHeaderAPIM } from "~/utils/clienteFormulario";

const getAddressesOffice365 = (
  addresses: string,
): Array<ISendMailOffice365Address> =>
  addresses?.split(",").map((it) => ({
    emailAddress: {
      address: it,
    },
  }));

export const actions: ActionTree<IGeneralState, IGeneralState> = {
  enviarCorreoOffice365(_, correoData: ISendMailOffice365) {
    this.$axios.post(APIM_SEND_MAIL_OFFICE_365, correoData, {
      headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
    });
  },
  enviarCorreoSendGrid(_, correoData: ISendMailSengrid) {
    this.$axios.post(APIM_SEND_MAIL_SENGRID, correoData, {
      headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
    });
  },
  enviarCorreoColaRutDev({ dispatch }, data: any) {
    const correoData: ISendMailOffice365 = {
      toRecipients: getAddressesOffice365(CORREO_ERROR_TO),
      infoReplace: {
        data,
        date: new Date(),
      },
      template: "crmPostFail.html",
      subject: `${process.env.NODE_ENV}: Se encoló la creación de RUT`,
    };
    dispatch("enviarCorreoOffice365", correoData);
  },
  enviarCorreoErrorValidacionRut(
    { dispatch },
    { data, error }: ISendMailErrorParams,
  ) {
    const correoData: ISendMailOffice365 = {
      toRecipients: getAddressesOffice365(CORREO_ERROR_TO),
      infoReplace: {
        data,
        date: new Date(),
        error,
      },
      template: "crmPostFail.html",
      subject: `${process.env.NODE_ENV}: Error al validar información de RUT`,
    };
    dispatch("enviarCorreoOffice365", correoData);
  },
  async enviarCorreoCumplimiento(
    _,
    { infoReplace, operation }: ISendMailAvisosLegalesParams,
  ) {
    const correoData: ISendMailOffice365 = {
      toRecipients: getAddressesOffice365(CORREO_CUMPLIMIENTO_ENVIAR_TO),
      ccRecipients: !!CORREO_CUMPLIMIENTO_ENVIAR_CC
        ? getAddressesOffice365(CORREO_CUMPLIMIENTO_ENVIAR_CC)
        : undefined,
      infoReplace,
      template: `odiObserved${operation}Mail.html`,
      subject: `${
        operation !== "Update"
          ? "Onboarding digital"
          : "Actualización de ficha Digital"
      } - Inteligo SAB`,
    };
    await this.$axios.post(
      `${APIM_SEND_MAIL}/compliance/${operation.toLowerCase()}`,
      correoData,
      {
        headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
      },
    );
  },
  async enviarCorreoCustomerSupport(
    _,
    { infoReplace, operation }: ISendMailAvisosLegalesParams,
  ) {
    const correoData: ISendMailOffice365 = {
      toRecipients: getAddressesOffice365(CORREO_CONTROL_OPERATIVO_ENVIAR_TO),
      infoReplace,
      template: `odiComplete${operation}Mail.html`,
      subject: `${
        operation !== "Update"
          ? "Onboarding digital"
          : "Actualización de ficha Digital"
      } - Inteligo SAB`,
    };
    await this.$axios.post(
      `${APIM_SEND_MAIL}/control-operativo/${operation.toLowerCase()}`,
      correoData,
      {
        headers: getHeaderAPIM(APIM_ONBOARDING_KEY),
      },
    );
  },
  enviarCorreoAsesor(
    { dispatch },
    payload: { correo: string; numeroDocumento: string },
  ) {
    const correoData: ISendMailOffice365 = {
      toRecipients: getAddressesOffice365(CORREO_ASESOR_SAB_TO),
      infoReplace: payload,
      template: "odiUserRegisterAsesorMail.html",
      subject: "Onboarding digital - Inteligo SAB",
    };
    dispatch("enviarCorreoOffice365", correoData);
  },
};
