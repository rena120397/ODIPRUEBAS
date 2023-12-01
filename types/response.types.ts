import { cuentaType, currencyType } from ".";

export interface IResponseState {
    response: any;
    error: any;
    success: boolean;
}


export interface IIbkApiResponse {
    data: {
        data: {
            accounts?: Array<{ id: string, currency: currencyType, type: cuentaType }>
        }
    }
}


