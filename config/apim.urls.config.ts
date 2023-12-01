import { APIM_CRM_CATALOG_LIST_URL, APIM_CRM_CONTACT_FIND_URL, APIM_IBK_CUSTOMER_FIND } from "./enviroment.config";

export const getCatalogUrl: (catalog: string) => string = (catalog: string): string => `${APIM_CRM_CATALOG_LIST_URL}/${catalog}`;
export const getCrmContactFindUrl: (tipoDocumento: string, numeroDocumento: string) => string = (tipoDocumento: string, numeroDocumento: string): string => `${APIM_CRM_CONTACT_FIND_URL}/${tipoDocumento}/${numeroDocumento}`;
export const getURLContactIBK = (doc: string, typeDoc: string): string => (`${APIM_IBK_CUSTOMER_FIND}/${typeDoc}/${doc}`);
