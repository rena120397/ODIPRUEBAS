export interface ISendMailOffice365Address {
  emailAddress: {
    address: string;
  };
}
export interface ISendMailOffice365 {
  ccRecipients?: Array<ISendMailOffice365Address>;
  infoReplace: any;
  template: string;
  subject: string;
  toRecipients: Array<ISendMailOffice365Address>;
}

export interface ISendMailOffice365Params {
  CCs?: string;
  TOs: string;
  infoReplace: any;
  template: string;
  subject: string;
}
export interface ISendMailOffice365State {
  data: string;
  subject: string;
}
export interface ISendMailOffice365Error extends ISendMailOffice365State {
  error: string;
}

export interface ISendMailSengridAddress {
  email: string;
  name: string;
}

export interface ISendMailSengridContent {
  type: string;
  value: string;
}
export interface ISendMailSengridAttachment {
  content: string;
  filename: string;
  type: string;
  disposition: string;
}

export interface ISendMailSengridPersonalization {
  to: Array<ISendMailSengridAddress>;
  cc?: Array<ISendMailSengridAddress>;
  bcc?: Array<ISendMailSengridAddress>;
}

export interface ISendMailSengrid {
  personalizations: Array<ISendMailSengridPersonalization>;
  subject: string;
  content: Array<ISendMailSengridContent>;
  attachments?: Array<ISendMailSengridAttachment>;
  categories?: Array<string>;
}

export interface ISendMailAvisosLegalesParams {
  operation: string;
  infoReplace: {
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    tipoDocumento: string;
    numeroDocumento: string;
  };
}

export interface ISendMailErrorParams {
  data: any;
  error: any;
}
