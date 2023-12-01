import { IUsuarioCRMUpdateRequest, ITrama, IUsuarioCRMRequest } from ".";

export interface IHandleSendDataUsuarioCRM {
    idContactoCRMBD: string;
    idInfoAdicionalCRMBD: string;
    usuarioCRMUpdateRequest: IUsuarioCRMUpdateRequest;
    tramaCRM: ITrama;
    usuarioCRMRequest: IUsuarioCRMRequest
}