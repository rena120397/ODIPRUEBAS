import { statecodeEnum } from "~/config/crm.config";
import { IValidarCumplimientoResponse } from "./cumplimiento.types";
import { IUsuarioInformacion } from "./Usuario.types";

export interface ITrama {
    compliance_information?: IValidarCumplimientoResponse;
    odi_db?: IUsuarioInformacion;
}

export interface IUsuarioCRMCuentasBancarias {
    "@odata.etag"?: string;
    "rs_cliente_contact@odata.bind"?: string;
    "rs_name": string;
    "_transactioncurrencyid_value"?: string;
    "_rs_tipodecuenta1_value"?: string;
    "rs_cuentasbancariasid"?: string;
    "_rs_cliente_value"?: string;
    "transactioncurrencyid@odata.bind"?: string;
    "rs_Tipodecuenta1@odata.bind"?: string;
    "rs_Banco@odata.bind"?: string;
    "rs_incluireninforme"?: boolean;
    "statecode"?: null | statecodeEnum;
}

export interface IUsuarioCRMInformacionAdicional {
    "@odata.etag"?: string;
    "rs_colaboradorintercorp": number;
    "rs_empresa": string | null;
    "rs_cargo": string | null;
    "rs_parientecolaboradordirectivo": boolean;
    "rs_nombrevinculacin": string | null;
    "rs_vnculovinculacin": string | null;
    "rs_ventadeinmuebles": number | null;
    "rs_rs_ventadenegocioempresa": number | null;
    "rs_fuentefondos1": boolean;
    "rs_fuentefondos2": boolean;
    "rs_fuentefondos3": boolean;
    "rs_fuentefondos4": boolean;
    "rs_fuentefondos5": boolean;
    "rs_fuentefondos6": boolean;
    "rs_fuentefondos7": boolean;
    "rs_otrosrf2"?: string | null;
    "_rs_pasdeorigendefondos_value"?: string;
    "rs_ingresomensualpromedio": number | null;
    "rs_bienesinmuebles": number | null;
    "rs_vehculosembarcaciones": number | null;
    "rs_inversinenvaloresahorros": number | null;
    "rs_deudabancaria": number | null;
    "rs_mayordeedad": number;
    "rs_relacionsab1": boolean;
    "rs_relacionsab2": boolean;
    "rs_relacionsab3": boolean;
    "rs_relacionsab4": boolean;
    "rs_relacionsab5": boolean;
    "rs_relacionsab6": boolean;
    "rs_erespep": number;
    "rs_eressujetoobligado": number;
    "rs_objetivodeinversin": number | null;
    "rs_capacidaddeahorroanual"?: number | null;
    "rs_toleranciaalriesgo": number | null;
    "rs_experienciaenelmercadodevaloresenellti": number | null;
    "_rs_cliente_value"?: string;
    "rs_informacionadicionalid"?: string;
    "rs_pasdeorigendefondos@odata.bind": string;
    "rs_bonificaciones"?: number;
    "rs_utilidades"?: number;
    "rs_otrosrf"?: number;
    "rs_otrasfuentesdefondos"?: string;
    "rs_tengoseasparticulares"?: boolean;
    "rs_TipodeCustodia@odata.bind"?: string | null;
    "rs_formapagodividendos"?: number | null;
    "rs_tipoclienteia"?: number | null;
    "rs_conocimentodelmercado"?: number | null;
    "rs_formatoirs"?: number | null;
    "rs_direccionenvioeecc"?: number | null;
    "rs_bolsaanegociar"?: number | null;
    "rs_Mediosdepago@odata.bind"?: string | null;
    "rs_tipodeordenes"?: string | null;
    "rs_excentodecobro"?: boolean | null;
    "rs_remisiondigital"?: boolean | null;
    "rs_entregowaiver"?: boolean | null;
    "rs_remisionfisica"?: boolean | null;
    "rs_autorizacioncobranza"?: boolean | null;
    "rs_sinadministracioncartera"?: boolean | null;
}

export interface IUsuarioCRMConocerCliente {
    "rs_Cliente_contact@odata.bind"?: string;
    "rs_conocerclienteid"?: string | null;
    "rs_tamanionegocio": string;
    "rs_principalcontribuyente": boolean;
    "rs_medianocontribuyente": boolean;
    "rs_pyme": boolean;
    "rs_indiquecual": string;
    "rs_empresafranquicia": boolean;
    "rs_nombrefranquicia": string;
    "rs_actividadeconomica": string;
    "rs_segundaactividad": string;
    "rs_ciudaddesarrollaactividad": string;
    "rs_ciudadactividadcomercial": string;
    "rs_principalesproductosvende": string;
    "rs_promedioventass": number;
    "rs_proveedoresnacionalesinternacionales": string;
    "rs_nombresproveedores": string;
    "rs_nombresclientes": string;
    "rs_ventasefectivo": number;
    "rs_pagobancario": number;
    "rs_empresainscritaenrcf": string;
}

export interface IUsuarioCRMCRS2 {
    "rs_Cliente@odata.bind"?: string;
    "rs_tieneructin": number;
    "rs_ructin": string | null;
    "rs_pasjurisdiccinderesidenciafiscal2@odata.bind"?: string;
    "_rs_pasjurisdiccinderesidenciafiscal2_value"?: string;
    "rs_sinotieneructinseleccionarrazn"?: string;
    "rs_crs2id"?: string | null;
    "_rs_cliente_value"?: string;
}

export interface IUsuarioCRMPersonasExpuesta {
    "rs_Cliente_contact@odata.bind"?: string;
    "@odata.etag"?: null | string;
    "rs_apellidos"?: null | string;
    "rs_nombres"?: null | string;
    "rs_parentesco"?: null | string;
    "rs_pariente"?: null | boolean;
    "rs_incluirreporte"?: null | boolean;
    "rs_clienteposee"?: null | boolean;
    "rs_numeroruc"?: null | string;
    "rs_razonsocial"?: null | string;
    "rs_parientefuncionario"?: boolean | null,
    "rs_parienteasociadofuncionario"?: boolean | null,
    "rs_personasexpuestasid"?: null | string;
    "rs_cargo"?: null | string;
    "rs_institucion"?: null | string;
    "_rs_cliente_value"?: null | string;
    "statecode"?: null | statecodeEnum;
}

export interface IDatosLeadParaUsuarioCRM {
    "accountIdentifier": string;
    "codigosError"?: Array<string>;
    "tin_rut0": string;
    "tin_rut1": string;
    "tin_rut2": string;
    "id": string;
    "is_observed_pep"?: boolean,
}

export interface IUsuarioCRM extends IDatosLeadParaUsuarioCRM {
    "@odata.etag": string;
    "rs_rut": any | null;
    "rs_apellidopaterno": string;
    "rs_apellidomaterno": string;
    "firstname": string;
    "rs_tipodedocumento": number;
    "rs_otro": string;
    "rs_rucpersonal": string | null;
    "familystatuscode": number | null;
    "gendercode": number | null;
    "educationcode": number;
    "_rs_nacionalidad1_value": string;
    "birthdate": string;
    "_rs_profesionocupacion_value": string;
    "_rs_lugarresidencia_value": string;
    "_rs_lugarnacimiento_value": string;
    "telephone1": string | null;
    "mobilephone": string;
    "emailaddress1": string;
    "emailaddress3": string | null;
    "address1_line1": string;
    "address1_line2": string | null;
    "address1_postalcode": string | null;
    "address2_city": string | null;
    "_rs_pas_value": string;
    "_rs_departamento_value": string;
    "_rs_provincia_value": string;
    "_rs_distrito_value": string;
    "rs_tipocliente": number | null;
    "rs_negociopropio": boolean;
    "rs_rs_nombreempresa": string;
    "rs_otrotipocliente": string;
    "rs_ruc": string;
    "_rs_cargoocupacinlaboral_value": string;
    "address2_line1": string | null;
    "rs_fechadeingreso": string | null; // "2021-10-11T00:00:00Z"
    "emailaddress2": string | null;
    "rs_anioservicio": string | null;
    "rs_tipodecorreo": number | null;
    "rs_tipodesociedadconyugal": number | null;
    "rs_apellidomconyuge": string | null;
    "rs_apellidopconyuge": string | null;
    "spousesname": string | null;
    "rs_tipodocumentoconyuge": number | null;
    "rs_numerodconyuge": string | null;
    "rs_fechadenconyuge": string | null;
    "rs_segmento": number | null;
    "rs_tipodeciudadano": number;
    "contactid": string;
    "address1_composite": string;
    "rs_propietarioindividual": boolean;
    "rs_corporacinc": boolean;
    "rs_corporacins": boolean;
    "rs_partnership": boolean;
    "rs_companialimitada": boolean;
    "rs_fideicomisopatrimonio": boolean;
    "rs_otrosw9": boolean;
    "rs_instrucciones": string;
    "rs_numerosegurosocial1": string;
    "rs_numeroidentificacion1": string;
    "rs_clasificacionfiscal2": number | null;
    "rs_contact_rs_cuentasbancarias_Cliente": Array<IUsuarioCRMCuentasBancarias>;
    "rs_contact_rs_cuentasbancarias_Cliente@odata.nextLink": string;
    "rs_contact_rs_crs2_Cliente": Array<IUsuarioCRMCRS2>;
    "rs_contact_rs_crs2_Cliente@odata.nextLink": string;
    "rs_contact_rs_informacionadicional_cliente": Array<IUsuarioCRMInformacionAdicional>;
    "rs_contact_rs_informacionadicional_cliente@odata.nextLink": string,
    "rs_contact_rs_conocercliente_Cliente": Array<IUsuarioCRMConocerCliente>;
    "rs_productointers": string | null;
    "rs_potencialidad": number | null;
    "rs_contact_rs_personasexpuestas_Cliente"?: Array<IUsuarioCRMPersonasExpuesta>;
    "rs_cargo": string | null;
    "rs_insttitucion": string | null;
    "rs_trama"?: string;
}

export interface IUsuarioCRMRequest extends Partial<IUsuarioCRM> {
    "rs_asesorainversiones": boolean;
    "rs_origen"?: string;
    "rs_lugarnacimiento@odata.bind": string | null;
    "rs_Nacionalidad1@odata.bind": string | null;
    "rs_pas@odata.bind": string | null;
    "rs_departamento@odata.bind": string | null;
    "rs_provincia@odata.bind": string | null;
    "rs_distrito@odata.bind": string | null;
    "rs_LugarResidencia@odata.bind": string | null;
    "rs_profesionocupacion@odata.bind": string | null;
    "rs_cargoocupacinlaboral@odata.bind": string | null;
    "rs_interesen": string;
    "rs_pais@odata.bind": string;
    "ownerid@odata.bind"?: string;
    "rs_canal@odata.bind"?: string;
    "rs_propietarioindividual"?: boolean;
    "rs_corporacinc"?: boolean;
    "rs_corporacins"?: boolean;
    "rs_partnership"?: boolean;
    "rs_companialimitada"?: boolean;
    "rs_fideicomisopatrimonio"?: boolean;
    "rs_otrosw9"?: boolean;
    "rs_instrucciones"?: string,
    "rs_numerosegurosocial1"?: string;
    "rs_numeroidentificacion1"?: string;
    "rs_residenciafiscal"?: boolean;
}

export interface IUsuarioCRMUpdateRequest {
    "adicionalId"?: string;
    "id"?: string;
    "rs_contact"?: IUsuarioCRMRequest;
    "rs_crs2s"?: Array<IUsuarioCRMCRS2>;
    "rs_contact_rs_conocercliente_Cliente"?: Array<IUsuarioCRMConocerCliente>;
    "rs_contact_rs_cuentasbancarias_Cliente"?: Array<IUsuarioCRMCuentasBancarias>;
    "rs_contact_rs_informacionadicional_cliente"?: Array<IUsuarioCRMInformacionAdicional>;
    "rs_contact_rs_personasexpuestas_Cliente"?: Array<IUsuarioCRMPersonasExpuesta>;
}

