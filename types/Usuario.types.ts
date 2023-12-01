import { statecodeEnum } from "~/config/crm.config";
import { cuentaTipoType, currencyType, estadoCivilType, fuenteFondoType, siNoType, trabajadorType } from ".";

export interface IQuestion {
    "indexPregunta": number,
    "selectedItem": number,
    "puntajeResp": string,
    "txtRespuesta": string,
    "letraResp": string
}

export interface IAnswers {
    "categoriaPregunta": string,
    "numeroPregunta": string,
    "numeroOpcion":string
}

export interface IUsuarioInformacionBancoCuentas {
    "currency": currencyType;
    "type": cuentaTipoType;
    "id": string;
    "rs_cuentasbancariasid"?: string;
    "statecode"?: statecodeEnum | null;
}

export interface IUsuarioInformacionAnexo9 {
    "individual_proprietor_single_member"?: boolean,
    "CCorporation"?: boolean,
    "SCorporation"?: boolean,
    "Partnership"?: boolean,
    "TrustEstate"?: boolean,
    "LimitedLiability"?: boolean,
    "has_other"?: boolean,
    "Other"?: string,
    "TaxClassification"?: string,
    "SocialSecurity"?: string,
    "radioTaxClas"?: string,
    "selectTIN"?: string,
    "numeroIdentificacion"?: string,
    "date"?: Date,
    "annexed_w9_completed"?: boolean
}

export interface IUsuarioInformacionConyugue{
    "type_document"?: string | null;
    "couple_document"?: string | null;
    "couple_names"?: string | null;
    "couple_second_last_name"?: string | null;
    "couple_first_last_name"?: string | null;
    "couple_birthdate"?: string | null;
    "couple_regime_status"?: string | null;
    "couple_information_completed"?: boolean;
}

export interface IUsuarioInformacionOcupacion{
    "occupation_status"?: trabajadorType,
    "occupation_other"?: string,
    "occupation_enterprise_ruc"?: string,
    "occupation_enterprise_name"?: string,
    "occupation_enterprise_address"?: string | null,
    "occupation_enterprise_position"?: string,
    "occupation_date_admission"?: string, // "2021-10-11"
    "has_business"?: string,
    "is_collaborator"?: siNoType,
    "collaborator_enterprise_name"?: string,
    "collaborator_enterprise_position"?: string,
    "is_related_collaborator"?: siNoType,
    "related_collaborator_name"?: string,
    "related_collaborator_position"?: string,
    "date"?: Date, // "2021-11-09T16:00:01.222Z"
    "job_information_completed"?: boolean
}

export interface IUsuarioInformacionPersonalInformacion {
    "firstName"?: string,
    "lastName"?: string,
    "motherLastName"?: string,
    "nationality"?: string,
    "birthdate"?: string
    "gender"?: string,
    "birthplace"?: string,
    "address_country"?: string,
    "address_state"?: string,
    "address_province"?: string,
    "address_district"?: string,
    "address"?: string,
    "marital_status"?: estadoCivilType,
    "is_american"?: boolean,
    "personal_information_completed"?: boolean,
    "landline"?: string | null,
    "profession"?: string,
    "tin_rut_crs2id0"?: string | null,
    "tin_rut0"?: string,
    "tin_rut_crs2id1"?: string | null,
    "tin_rut1"?: string,
    "tin_rut_crs2id2"?: string | null,
    "tin_rut2"?: string,
    "tax_residence_country0"?: string,
    "tax_residence_country1"?: string,
    "tax_residence_country2"?: string,
    "address_stateCRM"?: string,
    "address_provinceCRM"?: string,
    "address_districtCRM"?: string,
    "number_tin_rut"?: number,
    "potential"?: string,
    "productoInteres"?: string | null,
    "canal"?: string,
    "date"?: Date // "2021-11-09T15:57:50.046Z"
}

export interface IUsuarioInformacionFinanciera {
    "funds_source"?:  fuenteFondoType,
    "funds_source_country"?: string,
    "average_monthly_income_range"?: string | null,
    "real_estate_wealth_range"?: string | null,
    "vehicles_boats_wealth_range"?: string | null,
    "securities_savings_wealth_range"?: string | null,
    "bank_debt_range"?: string | null,
    "is_pep"?: siNoType,
    "is_obliged_subject"?: siNoType,
    "funds_source_other"?: string | null,
    "declaration_disability"?: siNoType,
    "main_reason_for_client"?: string,
    "profile"?: {
        "investment_objective": number | null,
        "market_experience": string,
        "risk_tolerance": string,
        "risk_tolerance_value"?: number | null,
    },
    "objetivoInversion"?: number | null,
    "toleranciaRiesgo"?: number | null,
    "experienciaMercado"?: number | null,
    "date"?: Date, // "2021-11-09T22:39:21.764Z"
    "financial_information_completed"?: boolean
}

export interface IUsuarioInformacionIndependiente {
    "rs_conocerclienteid"?: string | null;
    "business_size": string;
    "economic_group": string;
    "franchise_name": string;
    "economic_activity": string;
    "second_activity": string;
    "city": string;
    "city_of_sales": string;
    "products_and_services": string;
    "average_amount": string;
    "suppliers_information": string;
    "suppliers_name": string;
    "clients_name": string;
    "sales_percentage": string;
    "payment_percentage": string;
    "property_control_record": string;
}

export interface IUsuarioInformacionBancaria {
    "is_ibk"?: boolean;
    "date"?: Date; // "2021-11-09T22:40:42.468Z"
    "main_bank_ccount_completed"?: boolean;
    "accounts"?: Array<IUsuarioInformacionBancoCuentas>;
}

export interface IUsuarioInformacionAnexoPEPOfficialData {
    "personasexpuestasid0"?: string | null;
    "last_name0"?: string | null;
    "position0"?: string | null;
    "institution0"?: string | null;
    "name0"?: string | null;
    "relationship0"?: string | null;
    "personasexpuestasid1"?: string | null;
    "last_name1"?: string | null;
    "position1"?: string | null;
    "institution1"?: string | null;
    "name1"?: string | null;
    "relationship1"?: string | null;
    "personasexpuestasid2"?: string | null;
    "last_name2"?: string | null;
    "position2"?: string | null;
    "institution2"?: string | null;
    "name2"?: string | null;
    "relationship2"?: string | null;
}

export interface IUsuarioInformacionAnexoPEPPositionHeld {
    "position0"?: string | null;
    "personasexpuestasid0"?: string | null;
    "institution0"?: string | null;
    "apellidoVinculado0"?: string | null;
    "nombreCompletoVinculado0"?: string | null;
    "parentescoVinculado0"?: string | null;
    "personasexpuestasid1"?: string | null;
    "institution1"?: string | null;
    "apellidoVinculado1"?: string | null;
    "nombreCompletoVinculado1"?: string | null;
    "parentescoVinculado1"?: string | null;
    "personasexpuestasid2"?: string | null;
    "institution2"?: string | null;
    "apellidoVinculado2"?: string | null;
    "nombreCompletoVinculado2"?: string | null;
    "parentescoVinculado2"?: string | null;
}

export interface IUsuarioInformacionAnexoPEPParticipationPercent {
    "personasexpuestasid0"?: string | null;
    "ruc0"?: string | null;
    "business_name0"?: string | null;
    "personasexpuestasid1"?: string | null;
    "ruc1"?: string | null;
    "business_name1"?: string | null;
    "personasexpuestasid2"?: string | null;
    "ruc2"?: string | null;
    "business_name2"?: string | null;
}

export interface IUsuarioInformacionAnexoPEP {
    "position_held"?: boolean | null;
    "function_or_position_held"?: IUsuarioInformacionAnexoPEPPositionHeld | null, 
    "participation"?: boolean | null;
    "participation_percent"?: IUsuarioInformacionAnexoPEPParticipationPercent | null,
    "relative_pep"?: boolean | null;
    "relative_public_official"?:IUsuarioInformacionAnexoPEPOfficialData | null,
    "official_pep"?: boolean | null;
    "associate_public_officials"?: IUsuarioInformacionAnexoPEPOfficialData | null,    
    "number_position_held"?: number;
    "number_participation_percent"?: number;
    "number_relative_public_official"?: number;
    "number_associate_public_officials"?: number;
    "annexed_pep_completed"?: boolean;
}

export interface IUsuarioInformacionAnexo8 {
    "has_personalRUC"?: string | null;
    "personalRUC"?: string | null;
    "annexed_w8_completed"?: boolean;
}

export interface IUsuarioInformacionRUT {
    "nacionalidad": string;
    "paisResidencia": string;
    "tipoDocumento": number;
    "numeroDocumento": string;
    "nombres": string;
    "apellidoPaterno": string;
    "apellidoMaterno": string;
    "fechaNacimiento": string | null;
    "razonSocial": string;
    "direccion": string;
    "correo": string;
    "telefono": string;
    "genero": number;
    "departamento": string;
    "provincia": string;
    "distrito": string;
}

export interface IUsuarioInformacion {
    "emailAdress": string,
    "identityDocument": {
        "type":string,
        "number": string
    },
    "is_ibk": boolean,
    "is_sab": boolean,
    "emailAdress_sab"?: string,
    "companyJoined": string,
    "date_registered": Date, // "2021-10-21T15:04:17.261Z"
    "accountIdentifier": string,
    "completed_profile_percentage": number,
    "is_observed_pep"?: boolean,
    "idContactCRM"?: {
        "crmContactId": string,
        "crmAddionalInformationId"?: string,
        "owner"?: string,
        "potencialidad"?: string,
        "rs_canal"?: string
    },
    "id": string,
    "equifax_information"?: {
        "envio": {
            "numeroOperacion": number,
            "respuestas": Array<IAnswers>
        },
        "respuesta": {
            "numeroOperacion": number,
            "resultado": string
        },
        "isValidate": boolean
    },
    "equifax_values": {
        "firstName": string,
        "lastName": string,
        "motherLastName": string
    },
    "profiler_information"?: {
        "start": boolean,
        "question1": IQuestion,
        "question2": IQuestion,
        "question3": IQuestion,
        "question4": IQuestion,
        "question5": IQuestion,
        "question6": IQuestion,
        "question7": IQuestion,
        "question8": IQuestion,
        "question9": IQuestion,
        "question10":IQuestion,
        "result": {
            "profile": string,
            "result_change": {
                "isTrusted": boolean
            },
            "description": string,
            "risk": string
        }
    },
    "cellphone": string,
    "user_data_completed": boolean,
    "date_user_information": Date, // "2021-10-28T16:24:07.473Z"
    "personal_information": IUsuarioInformacionPersonalInformacion,
    "job_information": IUsuarioInformacionOcupacion,
    "financial_information": IUsuarioInformacionFinanciera,
    "independent_client": IUsuarioInformacionIndependiente | null,
    "main_bank_ccount": IUsuarioInformacionBancaria,
    "annexed_w9"?: IUsuarioInformacionAnexo9,
    "annexed_pep"?: IUsuarioInformacionAnexoPEP,
    "rut_information"?: IUsuarioInformacionRUT | null,
    "compliance_information"?: {
        "apellido_materno": string,
        "apellido_paterno": string,
        "hasCRMBlackListObservations": "N" | "S",
        "hasComplianceNoRecomendadoObservations": "N" | "S",
        "hasCompliancePEPObservations": "N" | "S",
        "hasComplianceWordCheckObservations": "N" | "S",
        "hasGoogleObservations": "N" | "S",
        "id": string,
        "nombres": string,
        "status": string,
        "date": Date // "2021-11-16T22:39:58.737Z"
    },
    "legal_information": {
        "accept_terms_and_conditions": boolean,
        "customer_policy": boolean,
        "accept_waiver": boolean,
        "data_privacy": boolean,
        "accept_clause": boolean,
        "waiver_text": string,
        "terms_and_conditions_pdf": string,
        "policy_pdf": string,
        "date": Date, // "2021-11-16T22:40:16.538Z"
        "legal_information_completed": boolean
    },
    "annexed_w8"?: IUsuarioInformacionAnexo8,
    "couple_information"?: IUsuarioInformacionConyugue,
    "confirm_ibk_mail"?: boolean;
    "ibk_acceptance"?: boolean;
}
