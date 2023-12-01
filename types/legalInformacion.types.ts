export interface ILegalInformacion {
    accept_terms_and_conditions: boolean;
    customer_policy: boolean;
    accept_waiver: boolean;
    data_privacy: boolean;
    accept_clause: boolean;
    waiver_text: string;
    terms_and_conditions_pdf: string;
    policy_pdf: string;
    date: Date;
    legal_information_completed: boolean;
}

export interface ILegalInformacionRequest{
    id: string;
    legal_information: ILegalInformacion;
}
