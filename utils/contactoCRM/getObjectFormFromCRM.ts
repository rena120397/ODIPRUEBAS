import { POLITICAS_PDF, statecodeEnum, TERMINOS_Y_CONDICIONES_PDF, TEXT_WAIVER } from "~/config";
import { familystatuscodeType, ICargo, IPaisResidenciaFiscal } from "~/types";
import { IUsuarioCRM, IUsuarioCRMConocerCliente, IUsuarioCRMCRS2, IUsuarioCRMInformacionAdicional } from "~/types/CRM.types";
import { IUsuarioInformacion, IUsuarioInformacionAnexo8, IUsuarioInformacionAnexo9, IUsuarioInformacionAnexoPEP, IUsuarioInformacionAnexoPEPOfficialData, IUsuarioInformacionAnexoPEPParticipationPercent, IUsuarioInformacionAnexoPEPPositionHeld, IUsuarioInformacionBancaria, IUsuarioInformacionConyugue, IUsuarioInformacionFinanciera, IUsuarioInformacionIndependiente, IUsuarioInformacionOcupacion, IUsuarioInformacionPersonalInformacion } from "~/types/Usuario.types";
import { cmputedProductoInteresFromCRM, computedBsInVehiInvFromCRM, computedEstadoCivilFromCRM, computedExperienciaMercadoFromCRM, computedFuenteFondosFromCRM, computedGeneroFromCRM, computedIngresoMensualFromCRM, computedIsPepFromCRM, computedPaisResidenciaFiscalFromCRM, computedRelacionPrincipalFromCRM, computedSegmentoFromCRM, computedSociedadCnyugalFromCRM, computedTaxClasificationFromCRM, computedTipoClienteFromCRM, computedToleranciaRiesgoFromCRM, getCuentasBancarias, getOcupacionIdFromCRM } from "./computedFunctions";

const dateMap = new Date();
const getObjectFormFromCRM = (usuarioCRM: IUsuarioCRM, cargos: ICargo[], paisesResidencia: IPaisResidenciaFiscal[]): IUsuarioInformacion => {
    const empresa = computedSegmentoFromCRM(usuarioCRM.rs_segmento);
    return {
        accountIdentifier: usuarioCRM.accountIdentifier,
        annexed_w9: get_annexed_w9(usuarioCRM),
        cellphone: usuarioCRM.mobilephone,
        companyJoined: empresa,
        completed_profile_percentage: 10,
        date_registered: dateMap,
        date_user_information: dateMap,
        emailAdress: usuarioCRM.emailaddress1,
        equifax_values: {
            firstName: usuarioCRM.firstname,
            lastName: usuarioCRM.rs_apellidopaterno,
            motherLastName: usuarioCRM.rs_apellidomaterno,
        },
        financial_information: get_financial_information(usuarioCRM),
        id: usuarioCRM.id,
        idContactCRM: {
            crmContactId: usuarioCRM.contactid,
            crmAddionalInformationId: usuarioCRM["rs_contact_rs_informacionadicional_cliente"]?.[0]?.rs_informacionadicionalid,
        },
        identityDocument: {
            type: usuarioCRM.rs_tipodedocumento?.toString(),
            number: usuarioCRM.rs_otro,
        },
        independent_client: get_independent_client(usuarioCRM),
        is_ibk: false,
        is_sab: empresa === 'sab',
        is_observed_pep: usuarioCRM.is_observed_pep,
        job_information: get_job_information(usuarioCRM, cargos),
        legal_information: {
            accept_clause: false,
            accept_terms_and_conditions: false,
            accept_waiver: false,
            customer_policy: false,
            data_privacy: false,
            date: dateMap,
            legal_information_completed: false,
            policy_pdf: POLITICAS_PDF,
            terms_and_conditions_pdf: TERMINOS_Y_CONDICIONES_PDF,
            waiver_text: TEXT_WAIVER,
        },
        main_bank_ccount: get_main_bank_ccount(usuarioCRM),
        personal_information: get_personal_information(usuarioCRM, cargos, paisesResidencia),
        user_data_completed: false,
        annexed_pep: get_annexed_pep(usuarioCRM),
        annexed_w8: get_annexed_w8(usuarioCRM),
        couple_information: get_couple_information(usuarioCRM),
    };

}

const get_main_bank_ccount = (usuarioCRM: IUsuarioCRM): IUsuarioInformacionBancaria => ({
    accounts: getCuentasBancarias(usuarioCRM["rs_contact_rs_cuentasbancarias_Cliente"]),
    date: dateMap,
    is_ibk: false,
    main_bank_ccount_completed: false
});

const get_financial_information = (usuarioCRM: IUsuarioCRM): IUsuarioInformacionFinanciera => {
    const informacionadicional: IUsuarioCRMInformacionAdicional | undefined = usuarioCRM["rs_contact_rs_informacionadicional_cliente"]?.[0];
    const fuenteDeFondos = !informacionadicional ? '' : computedFuenteFondosFromCRM(informacionadicional, informacionadicional?.rs_otrosrf2);
    const otrasFuentes = fuenteDeFondos === 'fuenteOtros' ? informacionadicional.rs_otrosrf2 : undefined;
    return {
        average_monthly_income_range: !!informacionadicional?.rs_ingresomensualpromedio ? computedIngresoMensualFromCRM(informacionadicional?.rs_ingresomensualpromedio) : null,
        bank_debt_range: !!informacionadicional?.rs_deudabancaria ? computedBsInVehiInvFromCRM(informacionadicional?.rs_deudabancaria) : null,
        date: dateMap,
        declaration_disability: informacionadicional?.rs_mayordeedad === 1 ? 'si' : 'no',
        experienciaMercado: informacionadicional?.rs_experienciaenelmercadodevaloresenellti,
        financial_information_completed: false,
        funds_source: fuenteDeFondos,
        funds_source_country: informacionadicional?._rs_pasdeorigendefondos_value,
        funds_source_other: otrasFuentes,
        is_obliged_subject: informacionadicional?.rs_eressujetoobligado === 1 ? 'si' : 'no',
        is_pep: computedIsPepFromCRM(usuarioCRM),
        main_reason_for_client: !informacionadicional ? '' : computedRelacionPrincipalFromCRM(informacionadicional),
        objetivoInversion: informacionadicional?.rs_objetivodeinversin,
        profile: {
            investment_objective: informacionadicional?.rs_objetivodeinversin,
            market_experience: computedExperienciaMercadoFromCRM(informacionadicional?.rs_experienciaenelmercadodevaloresenellti),
            risk_tolerance: computedToleranciaRiesgoFromCRM(informacionadicional?.rs_toleranciaalriesgo),
            risk_tolerance_value: informacionadicional?.rs_toleranciaalriesgo,
        },
        real_estate_wealth_range: !!informacionadicional?.rs_bienesinmuebles ? computedBsInVehiInvFromCRM(informacionadicional?.rs_bienesinmuebles) : null,
        securities_savings_wealth_range: !!informacionadicional?.rs_inversinenvaloresahorros ? computedBsInVehiInvFromCRM(informacionadicional?.rs_inversinenvaloresahorros) : null,
        toleranciaRiesgo: informacionadicional?.rs_toleranciaalriesgo,
        vehicles_boats_wealth_range: !!informacionadicional?.rs_vehculosembarcaciones ? computedBsInVehiInvFromCRM(informacionadicional?.rs_vehculosembarcaciones) : null,
    };
}


const get_independent_client = (usuarioCRM: IUsuarioCRM): IUsuarioInformacionIndependiente | null => {
    const rs_contact_rs_conocercliente_Cliente: IUsuarioCRMConocerCliente | null = !usuarioCRM?.rs_contact_rs_conocercliente_Cliente?.length ? null : usuarioCRM?.rs_contact_rs_conocercliente_Cliente[0];
    if (!rs_contact_rs_conocercliente_Cliente) {
        return null;
    }
    return {
        rs_conocerclienteid: rs_contact_rs_conocercliente_Cliente.rs_conocerclienteid,
        average_amount: rs_contact_rs_conocercliente_Cliente.rs_promedioventass?.toString(),
        business_size: rs_contact_rs_conocercliente_Cliente.rs_tamanionegocio,
        city: rs_contact_rs_conocercliente_Cliente.rs_ciudaddesarrollaactividad,
        city_of_sales: rs_contact_rs_conocercliente_Cliente.rs_ciudadactividadcomercial,
        clients_name: rs_contact_rs_conocercliente_Cliente.rs_nombresclientes,
        economic_activity: rs_contact_rs_conocercliente_Cliente.rs_actividadeconomica,
        economic_group: rs_contact_rs_conocercliente_Cliente.rs_indiquecual,
        franchise_name: rs_contact_rs_conocercliente_Cliente.rs_nombrefranquicia,
        payment_percentage: rs_contact_rs_conocercliente_Cliente.rs_pagobancario?.toString(),
        products_and_services: rs_contact_rs_conocercliente_Cliente.rs_principalesproductosvende,
        property_control_record: rs_contact_rs_conocercliente_Cliente.rs_empresainscritaenrcf,
        sales_percentage: rs_contact_rs_conocercliente_Cliente.rs_ventasefectivo?.toString(),
        second_activity: rs_contact_rs_conocercliente_Cliente.rs_segundaactividad,
        suppliers_information: rs_contact_rs_conocercliente_Cliente.rs_proveedoresnacionalesinternacionales,
        suppliers_name: rs_contact_rs_conocercliente_Cliente.rs_nombresproveedores,
    };
}

const get_job_information = (usuarioCRM: IUsuarioCRM, cargos: ICargo[]): IUsuarioInformacionOcupacion => {
    const tipoTrabajador = computedTipoClienteFromCRM(usuarioCRM.rs_tipocliente);
    const fechaIngreso: string = !usuarioCRM.rs_fechadeingreso || tipoTrabajador !== 'dependiente' ? '' : usuarioCRM.rs_fechadeingreso.substring(0, 10);
    return {
        occupation_status: tipoTrabajador,
        occupation_enterprise_ruc: usuarioCRM.rs_ruc,
        collaborator_enterprise_name: usuarioCRM["rs_contact_rs_informacionadicional_cliente"]?.[0]?.rs_empresa || '',
        collaborator_enterprise_position: usuarioCRM["rs_contact_rs_informacionadicional_cliente"]?.[0]?.rs_cargo || '',
        date: dateMap,
        has_business: 'no',
        is_collaborator: usuarioCRM["rs_contact_rs_informacionadicional_cliente"]?.[0]?.rs_colaboradorintercorp === 1 ? 'si' : 'no',
        is_related_collaborator: !!usuarioCRM["rs_contact_rs_informacionadicional_cliente"]?.[0]?.rs_parientecolaboradordirectivo ? 'si' : 'no',
        job_information_completed: false,
        occupation_date_admission: fechaIngreso,
        occupation_enterprise_address: usuarioCRM.address2_line1,
        occupation_enterprise_name: usuarioCRM.rs_rs_nombreempresa,
        occupation_enterprise_position: getOcupacionIdFromCRM(cargos, usuarioCRM._rs_cargoocupacinlaboral_value),
        related_collaborator_name: usuarioCRM["rs_contact_rs_informacionadicional_cliente"]?.[0]?.rs_nombrevinculacin || '',
        related_collaborator_position: usuarioCRM["rs_contact_rs_informacionadicional_cliente"]?.[0]?.rs_vnculovinculacin || '',
    };
}

const get_personal_information = (usuarioCRM: IUsuarioCRM, cargos: ICargo[], paisesResidencia: IPaisResidenciaFiscal[]): IUsuarioInformacionPersonalInformacion => {

    const rs_contact_rs_crs2_ClienteRut0: IUsuarioCRMCRS2 | null = usuarioCRM.rs_contact_rs_crs2_Cliente?.[0] || null;
    const rs_contact_rs_crs2_ClienteRut1: IUsuarioCRMCRS2 | null = usuarioCRM.rs_contact_rs_crs2_Cliente?.[1] || null;
    const rs_contact_rs_crs2_ClienteRut2: IUsuarioCRMCRS2 | null = usuarioCRM.rs_contact_rs_crs2_Cliente?.[2] || null;
    return {
        firstName: usuarioCRM.firstname,
        lastName: usuarioCRM.rs_apellidopaterno,
        motherLastName: usuarioCRM.rs_apellidomaterno,
        birthdate: usuarioCRM.birthdate,
        gender: computedGeneroFromCRM(usuarioCRM.gendercode),
        birthplace: usuarioCRM._rs_lugarnacimiento_value,
        nationality: usuarioCRM._rs_nacionalidad1_value,
        address_country: usuarioCRM._rs_pas_value,
        address_state: usuarioCRM._rs_departamento_value,
        address_province: usuarioCRM._rs_provincia_value,
        address_district: usuarioCRM._rs_distrito_value,
        address_stateCRM: usuarioCRM._rs_departamento_value,
        address_provinceCRM: usuarioCRM._rs_provincia_value,
        address_districtCRM: usuarioCRM._rs_distrito_value,
        address: usuarioCRM.address1_line1,
        landline: usuarioCRM.telephone1,
        profession: getOcupacionIdFromCRM(cargos, usuarioCRM._rs_profesionocupacion_value),
        marital_status: computedEstadoCivilFromCRM(usuarioCRM.familystatuscode),
        is_american: usuarioCRM.rs_tipodeciudadano === 1,
        tax_residence_country0: computedPaisResidenciaFiscalFromCRM(paisesResidencia, rs_contact_rs_crs2_ClienteRut0?._rs_pasjurisdiccinderesidenciafiscal2_value),
        personal_information_completed: false,
        tax_residence_country1: computedPaisResidenciaFiscalFromCRM(paisesResidencia, rs_contact_rs_crs2_ClienteRut1?._rs_pasjurisdiccinderesidenciafiscal2_value),
        tax_residence_country2: computedPaisResidenciaFiscalFromCRM(paisesResidencia, rs_contact_rs_crs2_ClienteRut2?._rs_pasjurisdiccinderesidenciafiscal2_value),
        tin_rut_crs2id0: rs_contact_rs_crs2_ClienteRut0?.rs_crs2id,
        tin_rut0: rs_contact_rs_crs2_ClienteRut0?.rs_ructin || '',
        tin_rut_crs2id1: rs_contact_rs_crs2_ClienteRut0?.rs_crs2id,
        tin_rut1: rs_contact_rs_crs2_ClienteRut1?.rs_ructin || '',
        tin_rut_crs2id2: rs_contact_rs_crs2_ClienteRut0?.rs_crs2id,
        tin_rut2: rs_contact_rs_crs2_ClienteRut2?.rs_ructin || '',
        potential: usuarioCRM.rs_potencialidad?.toString() || '',
        canal: '', // TODO: no se encuentra en el objeto CRM
        date: dateMap,
        productoInteres: cmputedProductoInteresFromCRM(usuarioCRM.rs_productointers),
    };
}

const get_annexed_pep = (usuarioCRM: IUsuarioCRM): IUsuarioInformacionAnexoPEP | undefined => {

    const { function_or_position_held, position_held, number_position_held } = get_function_or_position_held(usuarioCRM);
    const { number_participation_percent, participation, participation_percent } = get_participation_percent(usuarioCRM);
    const { relative_public_official, number_relative_public_official, relative_pep } = get_relative_public_official(usuarioCRM);
    const { associate_public_officials, number_associate_public_officials, official_pep } = get_associate_public_officials(usuarioCRM);

    return {
        associate_public_officials,
        participation_percent,
        relative_public_official,
        official_pep,
        participation,
        position_held,
        relative_pep,
        function_or_position_held,
        number_position_held,
        number_associate_public_officials,
        number_participation_percent,
        number_relative_public_official,
        annexed_pep_completed: false,
    };
}

const get_annexed_w8 = (usuarioCRM: IUsuarioCRM): IUsuarioInformacionAnexo8 | undefined => {
    if(usuarioCRM.rs_tipodeciudadano === 1){
        return;
    }
    
    return {
        personalRUC: usuarioCRM.rs_rucpersonal,
        has_personalRUC: !!usuarioCRM.rs_rucpersonal?.length ? "si" : "no",
        annexed_w8_completed: false,
    };

}


const get_annexed_w9 = (usuarioCRM: IUsuarioCRM): IUsuarioInformacionAnexo9 | undefined => {
    if(usuarioCRM.rs_tipodeciudadano !== 1){
        return;
    }
    return {
        radioTaxClas: computedTaxClasificationFromCRM(
            usuarioCRM.rs_propietarioindividual,
            usuarioCRM.rs_corporacinc,
            usuarioCRM.rs_corporacins,
            usuarioCRM.rs_partnership,
            usuarioCRM.rs_companialimitada,
            usuarioCRM.rs_fideicomisopatrimonio,
            usuarioCRM.rs_otrosw9,
        ),
        CCorporation: usuarioCRM.rs_corporacinc,
        LimitedLiability: usuarioCRM.rs_companialimitada,
        Other: usuarioCRM.rs_instrucciones,
        Partnership: usuarioCRM.rs_partnership,
        SCorporation: usuarioCRM.rs_corporacins,
        SocialSecurity: usuarioCRM.rs_numerosegurosocial1,
        numeroIdentificacion: usuarioCRM.rs_numeroidentificacion1,
        TaxClassification: usuarioCRM.rs_clasificacionfiscal2?.toString() || '',
        TrustEstate: usuarioCRM.rs_fideicomisopatrimonio,
        annexed_w9_completed: false, // usuarioCRM.rs_tipodeciudadano === 1,
        date: dateMap,
        has_other: usuarioCRM.rs_otrosw9,
        individual_proprietor_single_member: usuarioCRM.rs_propietarioindividual,
        selectTIN: getSelectTIN(usuarioCRM.rs_numerosegurosocial1, usuarioCRM.rs_numeroidentificacion1),
    }
}

const get_couple_information = (usuarioCRM: IUsuarioCRM): IUsuarioInformacionConyugue | undefined=> {

    if(usuarioCRM.familystatuscode !== familystatuscodeType.casado && usuarioCRM.familystatuscode !== familystatuscodeType.conviviente){
        return;
    }

    const coupleBithdate: string = !!usuarioCRM.rs_fechadenconyuge ? usuarioCRM.rs_fechadenconyuge.substring(0, 10) : '';
    
    return {
        couple_birthdate: coupleBithdate,
        couple_document: usuarioCRM.rs_numerodconyuge,
        couple_first_last_name: usuarioCRM.rs_apellidopconyuge || '',
        couple_names: usuarioCRM.spousesname || '',
        couple_regime_status: !usuarioCRM.rs_tipodesociedadconyugal ? null : computedSociedadCnyugalFromCRM(usuarioCRM.rs_tipodesociedadconyugal),
        couple_second_last_name: usuarioCRM.rs_apellidomconyuge || '',
        type_document: !usuarioCRM.rs_tipodocumentoconyuge ? null : usuarioCRM.rs_tipodocumentoconyuge.toString(),
        couple_information_completed: false,
    };
}

const get_associate_public_officials = (usuarioCRM: IUsuarioCRM): { associate_public_officials: IUsuarioInformacionAnexoPEPOfficialData, official_pep: boolean, number_associate_public_officials: number } => {
    const parientes = usuarioCRM.rs_contact_rs_personasexpuestas_Cliente?.filter(it => it.rs_parienteasociadofuncionario === true && it.statecode === statecodeEnum.ACTIVO);
    return {
        associate_public_officials: {
            personasexpuestasid0: parientes?.[0]?.rs_personasexpuestasid,
            relationship0: parientes?.[0]?.rs_parentesco,
            last_name0: parientes?.[0]?.rs_apellidos,
            name0: parientes?.[0]?.rs_nombres,
            position0: parientes?.[0]?.rs_cargo,
            institution0: parientes?.[0]?.rs_institucion,
            personasexpuestasid1: parientes?.[1]?.rs_personasexpuestasid,
            relationship1: parientes?.[1]?.rs_parentesco,
            last_name1: parientes?.[1]?.rs_apellidos,
            name1: parientes?.[1]?.rs_nombres,
            position1: parientes?.[1]?.rs_cargo,
            institution1: parientes?.[1]?.rs_institucion,
            personasexpuestasid2: parientes?.[2]?.rs_personasexpuestasid,
            relationship2: parientes?.[2]?.rs_parentesco,
            last_name2: parientes?.[2]?.rs_apellidos,
            name2: parientes?.[2]?.rs_nombres,
            position2: parientes?.[2]?.rs_cargo,
            institution2: parientes?.[2]?.rs_institucion,
        },
        number_associate_public_officials: (parientes?.length || 1),
        official_pep: !!parientes?.length,
    };
}

const get_relative_public_official = (usuarioCRM: IUsuarioCRM): { relative_public_official: IUsuarioInformacionAnexoPEPOfficialData, relative_pep: boolean, number_relative_public_official: number } => {

    const parientes = usuarioCRM.rs_contact_rs_personasexpuestas_Cliente?.filter(it => it.rs_parientefuncionario === true && it.statecode === statecodeEnum.ACTIVO);
    return {
        relative_public_official: {
            personasexpuestasid0: parientes?.[0]?.rs_personasexpuestasid,
            relationship0: parientes?.[0]?.rs_parentesco,
            last_name0: parientes?.[0]?.rs_apellidos,
            name0: parientes?.[0]?.rs_nombres,
            position0: parientes?.[0]?.rs_cargo,
            institution0: parientes?.[0]?.rs_institucion,
            personasexpuestasid1: parientes?.[1]?.rs_personasexpuestasid,
            relationship1: parientes?.[1]?.rs_parentesco,
            last_name1: parientes?.[1]?.rs_apellidos,
            name1: parientes?.[1]?.rs_nombres,
            position1: parientes?.[1]?.rs_cargo,
            institution1: parientes?.[1]?.rs_institucion,
            personasexpuestasid2: parientes?.[2]?.rs_personasexpuestasid,
            relationship2: parientes?.[2]?.rs_parentesco,
            last_name2: parientes?.[2]?.rs_apellidos,
            name2: parientes?.[2]?.rs_nombres,
            position2: parientes?.[2]?.rs_cargo,
            institution2: parientes?.[2]?.rs_institucion,
        },
        number_relative_public_official: (parientes?.length || 1),
        relative_pep: !!parientes?.length,
    };
}

const get_participation_percent = (usuarioCRM: IUsuarioCRM): { participation_percent: IUsuarioInformacionAnexoPEPParticipationPercent, participation: boolean, number_participation_percent: number } => {
    const empresas = usuarioCRM.rs_contact_rs_personasexpuestas_Cliente?.filter(it => it.rs_clienteposee === true && it.statecode === statecodeEnum.ACTIVO);
    return {
        participation_percent: {
            personasexpuestasid0: empresas?.[0]?.rs_personasexpuestasid,
            ruc0: empresas?.[0]?.rs_numeroruc,
            business_name0: empresas?.[0]?.rs_razonsocial,
            personasexpuestasid1: empresas?.[1]?.rs_personasexpuestasid,
            ruc1: empresas?.[1]?.rs_numeroruc,
            business_name1: empresas?.[1]?.rs_razonsocial,
            personasexpuestasid2: empresas?.[2]?.rs_personasexpuestasid,
            ruc2: empresas?.[2]?.rs_numeroruc,
            business_name2: empresas?.[2]?.rs_razonsocial,
        },
        number_participation_percent: (empresas?.length || 1),
        participation: !!empresas?.length,
    };
}

const get_function_or_position_held = (usuarioCRM: IUsuarioCRM): { function_or_position_held: IUsuarioInformacionAnexoPEPPositionHeld, number_position_held: number, position_held: boolean } => {
    const parientes = usuarioCRM.rs_contact_rs_personasexpuestas_Cliente?.filter(it => it.rs_pariente === true && it.statecode === statecodeEnum.ACTIVO);
    return {
        function_or_position_held: {
            institution0: usuarioCRM.rs_insttitucion,
            position0: usuarioCRM.rs_cargo,
            personasexpuestasid0: parientes?.[0]?.rs_personasexpuestasid,
            nombreCompletoVinculado0: parientes?.[0]?.rs_nombres,
            apellidoVinculado0: parientes?.[0]?.rs_apellidos,
            parentescoVinculado0: parientes?.[0]?.rs_parentesco,
            personasexpuestasid1: parientes?.[1]?.rs_personasexpuestasid,
            nombreCompletoVinculado1: parientes?.[1]?.rs_nombres,
            apellidoVinculado1: parientes?.[1]?.rs_apellidos,
            parentescoVinculado1: parientes?.[1]?.rs_parentesco,
            personasexpuestasid2: parientes?.[2]?.rs_personasexpuestasid,
            nombreCompletoVinculado2: parientes?.[2]?.rs_nombres,
            apellidoVinculado2: parientes?.[2]?.rs_apellidos,
            parentescoVinculado2: parientes?.[2]?.rs_parentesco,
            institution1: null,
            institution2: null,
        },
        number_position_held: (parientes?.length || 1),
        position_held: !!parientes?.length,
    };
}


const getSelectTIN = (socialSecurity: string, numeroIdentificacion: string): string => {
    if (!!socialSecurity?.length) {
        return '1';
    } else if (!!numeroIdentificacion?.length) {
        return '2';
    } else {
        return '';
    }
}

export default getObjectFormFromCRM;
