import { bolsaNegociarEnum, conocimientoDelMercadoEnum, direccionEnvioEstadoCuentaEnum, statecodeEnum, tipoClienteIAEnum, tipoFormaPagoDividiendoEnum, tipoOrdenesEnum } from "~/config/crm.config";
import { BANCO_KEY, CUENTA_AHORRO_KEY, CUENTA_CORRIENTE_KEY, MEDIO_PAGO_KEY, MONEDA_DOLARES_KEY, MONEDA_SOLES_KEY, TIPO_CUSTODIA_KEY } from "~/config/enviroment.config";
import { ICargo, IDataCumplimiento } from "~/types";
import { IUsuarioCRMCRS2, IUsuarioCRMCuentasBancarias, IUsuarioCRMPersonasExpuesta, IUsuarioCRMRequest } from "~/types/CRM.types";
import { IUsuarioInformacion, IUsuarioInformacionAnexo9, IUsuarioInformacionAnexoPEP, IUsuarioInformacionBancaria, IUsuarioInformacionBancoCuentas, IUsuarioInformacionConyugue, IUsuarioInformacionFinanciera, IUsuarioInformacionIndependiente, IUsuarioInformacionOcupacion, IUsuarioInformacionPersonalInformacion } from "~/types/Usuario.types";
import { computedIngresoMensual, computedBsInVehiInv, computedTipoCliente, computedPaisResidenciaFiscal, computedSociedadCnyugal, computedTaxClasification, computedSegmento, computedGenero, computedProfesionesOcupaciones, computedEstadoCivil, cmputedProductoInteres, getDateToSaveCRM } from "./computedFunctions";



const getUsuarioCRMFromFormulario = (
  usuarioObject: IUsuarioInformacion,
  empresa: string,
  infoUsuarioCRM: any,
  paisesResidenciaFiscal: any,
  cargos: ICargo[]
): {
  usuarioInformacion: IUsuarioInformacion;
  usuarioCRMRequest: IUsuarioCRMRequest;
  dataCumplimiento: IDataCumplimiento;
} => {
  const usuarioInformacion: IUsuarioInformacion = { ...usuarioObject };

  const canalCRM = getCanalCRM(usuarioInformacion);
  const asesorCRM = getAsesorCRM(usuarioInformacion, empresa);
  const potencialCRM = getPotencial(usuarioInformacion);
  const usuarioCRMRequest: IUsuarioCRMRequest = getUsuarioInformacionBase(usuarioInformacion, paisesResidenciaFiscal, cargos);
  usuarioCRMRequest['ownerid@odata.bind'] = `/systemusers(${asesorCRM})`;
  usuarioCRMRequest['rs_canal@odata.bind'] = `/rs_canals(${canalCRM})`;
  usuarioCRMRequest['rs_potencialidad'] = potencialCRM;
  setValuesForAnexo9(usuarioCRMRequest, usuarioInformacion.annexed_w9);
  setValuesForConyugue(usuarioCRMRequest, usuarioInformacion.couple_information);
  setValuesForOcupacion(usuarioCRMRequest, usuarioInformacion.job_information);
  setValuesForPersonal(usuarioCRMRequest, usuarioInformacion.personal_information, paisesResidenciaFiscal);
  setValuesForFinanciero(usuarioCRMRequest, usuarioInformacion.financial_information, usuarioInformacion.job_information, !!usuarioInformacion.personal_information?.is_american);
  setValuesForClienteIndependiente(usuarioCRMRequest, usuarioInformacion.independent_client);
  setValuesForInformacionBancaria(usuarioCRMRequest, usuarioInformacion.main_bank_ccount);
  setValuesForAnexoPEP(usuarioCRMRequest, usuarioInformacion.annexed_pep);

  // api de cumplimiento
  // validacion de cumplimiento con los datos guardados ne BD
  let tipoDocumentoConyuge;

  switch (infoUsuarioCRM.tipoDocumentoConyuge) {
    case 1:
      tipoDocumentoConyuge = 'DNI'; break;
    case 2:
      tipoDocumentoConyuge = 'CE'; break;
    default:
      tipoDocumentoConyuge = ''; break;
  }

  const dataCumplimiento: IDataCumplimiento = {
    apellidoPaterno: usuarioInformacion.personal_information.lastName || '',
    apellidoMaterno: usuarioInformacion.personal_information.motherLastName || '',
    nombres: usuarioInformacion.personal_information.firstName || '',
    id: usuarioInformacion.identityDocument.number,
    documentType: usuarioInformacion.identityDocument.type,
    id_relacionado: infoUsuarioCRM.numeroDocumentoConyuge,
    cotitulares: [
      {
        apellidoMaterno: infoUsuarioCRM.apellidoMaternoConyuge,
        apellidoPaterno: infoUsuarioCRM.apellidoPaternoConyuge,
        id_doc: infoUsuarioCRM.numeroDocumentoConyuge,
        nombres: infoUsuarioCRM.nombreConyuge,
        tipo_cotitular: 'CONYUGE|CONCUBINA',
        tipo_id_doc: tipoDocumentoConyuge
      },
    ],
  }

  return {
    usuarioInformacion,
    usuarioCRMRequest,
    dataCumplimiento
  };
}

const setValuesForAnexoPEP = (usuarioCRM: IUsuarioCRMRequest, annexed_pep?: IUsuarioInformacionAnexoPEP) => {
  // INFORMACION PEP

  if (!annexed_pep) {
    usuarioCRM.rs_contact_rs_personasexpuestas_Cliente = [];
    return;
  }

  const arrInfoPEP: Array<IUsuarioCRMPersonasExpuesta> = [];

  getArrayPosition_held(usuarioCRM, annexed_pep, arrInfoPEP);
  getArrayParticipation(annexed_pep, arrInfoPEP);
  getArrayRelative_pep(annexed_pep, arrInfoPEP);
  getArrayOfficial_pep(annexed_pep, arrInfoPEP);


  usuarioCRM.rs_contact_rs_personasexpuestas_Cliente = arrInfoPEP;


}

const getArrayPosition_held = (usuarioCRM: IUsuarioCRMRequest, annexed_pep: IUsuarioInformacionAnexoPEP, arrInfoPEP: Array<IUsuarioCRMPersonasExpuesta>) => {
  if (!!annexed_pep.position_held) {
    usuarioCRM.rs_cargo = annexed_pep.function_or_position_held?.position0;
    usuarioCRM.rs_insttitucion = annexed_pep.function_or_position_held?.institution0;
  }
  if (!!annexed_pep.function_or_position_held?.apellidoVinculado0) {
    arrInfoPEP.push(getDataPositionHeld(annexed_pep, 0));
  }
  if (!!annexed_pep.function_or_position_held?.apellidoVinculado1) {
    arrInfoPEP.push(getDataPositionHeld(annexed_pep, 1));
  }
  if (!!annexed_pep.function_or_position_held?.apellidoVinculado2) {
    arrInfoPEP.push(getDataPositionHeld(annexed_pep, 1));
  }
}

const getArrayParticipation = (annexed_pep: IUsuarioInformacionAnexoPEP, arrInfoPEP: Array<IUsuarioCRMPersonasExpuesta>) => {
  if (!!annexed_pep.participation_percent?.ruc0) {
    arrInfoPEP.push(getDataPositionPEP(annexed_pep, 0));
  }
  if (!!annexed_pep.participation_percent?.ruc1) {
    arrInfoPEP.push(getDataPositionPEP(annexed_pep, 1));
  }
  if (!!annexed_pep.participation_percent?.ruc2) {
    arrInfoPEP.push(getDataPositionPEP(annexed_pep, 1));
  }

}

const getArrayRelative_pep = (annexed_pep: IUsuarioInformacionAnexoPEP, arrInfoPEP: Array<IUsuarioCRMPersonasExpuesta>) => {
  if (!!annexed_pep.relative_public_official?.last_name0) {
    arrInfoPEP.push(getDataORelativePEP(annexed_pep, 0));
  }
  if (!!annexed_pep.relative_public_official?.last_name1) {
    arrInfoPEP.push(getDataORelativePEP(annexed_pep, 1));
  }
  if (!!annexed_pep.relative_public_official?.last_name2) {
    arrInfoPEP.push(getDataORelativePEP(annexed_pep, 2));
  }
}

const getArrayOfficial_pep = (annexed_pep: IUsuarioInformacionAnexoPEP, arrInfoPEP: Array<IUsuarioCRMPersonasExpuesta>) => {
  if (!!annexed_pep.associate_public_officials?.last_name0) {
    arrInfoPEP.push(getDataOfficialPEP(annexed_pep, 0));
  }
  if (!!annexed_pep.associate_public_officials?.last_name1) {
    arrInfoPEP.push(getDataOfficialPEP(annexed_pep, 1));
  }
  if (!!annexed_pep.associate_public_officials?.last_name2) {
    arrInfoPEP.push(getDataOfficialPEP(annexed_pep, 2));
  }

}

const getDataPositionHeld = (annexed_pep: IUsuarioInformacionAnexoPEP, index: number): IUsuarioCRMPersonasExpuesta => ({
  rs_apellidos: (annexed_pep.function_or_position_held as any)?.['apellidoVinculado' + index],
  rs_nombres: (annexed_pep.function_or_position_held as any)?.['nombreCompletoVinculado' + index],
  rs_parentesco: (annexed_pep.function_or_position_held as any)?.['parentescoVinculado' + index],
  rs_pariente: annexed_pep.position_held,
  rs_personasexpuestasid: (annexed_pep.function_or_position_held as any)?.['personasexpuestasid' + index],
  rs_incluirreporte: true,
  statecode: !!annexed_pep.position_held ? statecodeEnum.ACTIVO : statecodeEnum.INACTIVO,
});

const getDataPositionPEP = (annexed_pep: IUsuarioInformacionAnexoPEP, index: number): IUsuarioCRMPersonasExpuesta => ({
  rs_clienteposee: annexed_pep.participation,
  rs_numeroruc: (annexed_pep.participation_percent as any)?.['ruc' + index],
  rs_razonsocial: (annexed_pep.participation_percent as any)?.['business_name' + index],
  rs_personasexpuestasid: (annexed_pep.participation_percent as any)?.['personasexpuestasid' + index],
  rs_incluirreporte: true,
  statecode: !!annexed_pep.participation ? statecodeEnum.ACTIVO : statecodeEnum.INACTIVO,
});

const getDataORelativePEP = (annexed_pep: IUsuarioInformacionAnexoPEP, index: number): IUsuarioCRMPersonasExpuesta => ({
  rs_apellidos: (annexed_pep.relative_public_official as any)?.['last_name' + index],
  rs_cargo: (annexed_pep.relative_public_official as any)?.['position' + index],
  rs_institucion: (annexed_pep.relative_public_official as any)?.['institution' + index],
  rs_nombres: (annexed_pep.relative_public_official as any)?.['name' + index],
  rs_parentesco: (annexed_pep.relative_public_official as any)?.['relationship' + index],
  rs_parientefuncionario: annexed_pep.relative_pep,
  rs_personasexpuestasid: (annexed_pep.relative_public_official as any)?.['personasexpuestasid' + index],
  rs_incluirreporte: true,
  statecode: !!annexed_pep.relative_pep ? statecodeEnum.ACTIVO : statecodeEnum.INACTIVO,
});


const getDataOfficialPEP = (annexed_pep: IUsuarioInformacionAnexoPEP, index: number): IUsuarioCRMPersonasExpuesta => ({
  rs_apellidos: (annexed_pep.associate_public_officials as any)?.['last_name' + index],
  rs_cargo: (annexed_pep.associate_public_officials as any)?.['position' + index],
  rs_institucion: (annexed_pep.associate_public_officials as any)?.['institution' + index],
  rs_nombres: (annexed_pep.associate_public_officials as any)?.['name' + index],
  rs_parentesco: (annexed_pep.associate_public_officials as any)?.['relationship' + index],
  rs_parienteasociadofuncionario: annexed_pep.official_pep,
  rs_personasexpuestasid: (annexed_pep.associate_public_officials as any)?.['personasexpuestasid' + index],
  rs_clienteposee: false,
  rs_incluirreporte: true,
  statecode: !!annexed_pep.official_pep ? statecodeEnum.ACTIVO : statecodeEnum.INACTIVO,
});

const setValuesForInformacionBancaria = (usuarioCRM: IUsuarioCRMRequest, main_bank_ccount: IUsuarioInformacionBancaria) => {
  const arrCuentaBancaria: Array<IUsuarioCRMCuentasBancarias> = [];
  if (main_bank_ccount?.accounts?.[0] && main_bank_ccount?.accounts?.[0].id !== '') {
    arrCuentaBancaria.push(getCuentaBancariaObject(main_bank_ccount.accounts[0], MONEDA_SOLES_KEY));
  }
  if (main_bank_ccount?.accounts?.[1] && main_bank_ccount?.accounts?.[1].id !== '') {
    arrCuentaBancaria.push(getCuentaBancariaObject(main_bank_ccount.accounts[1], MONEDA_DOLARES_KEY));
  }
  usuarioCRM.rs_contact_rs_cuentasbancarias_Cliente = arrCuentaBancaria;
}

const getCuentaBancariaObject = (cuenta: IUsuarioInformacionBancoCuentas, monedaCuenta: string): IUsuarioCRMCuentasBancarias => {
  const tipoCuenta = cuenta.type === '557' ? CUENTA_AHORRO_KEY : CUENTA_CORRIENTE_KEY;

  return {
    'transactioncurrencyid@odata.bind': `/transactioncurrencies(${monedaCuenta})`,
    'rs_Tipodecuenta1@odata.bind': `/rs_tipocuentas(${tipoCuenta})`,
    rs_name: cuenta.id,
    'rs_Banco@odata.bind': `/rs_bancos(${BANCO_KEY})`,
    rs_cuentasbancariasid: cuenta.rs_cuentasbancariasid,
    statecode: cuenta.statecode,
  };
};

const setValuesForClienteIndependiente = (usuarioCRM: IUsuarioCRMRequest, independent_client: IUsuarioInformacionIndependiente | null) => {

  if (!independent_client) {
    return;
  }

  usuarioCRM.rs_contact_rs_conocercliente_Cliente = [
    {
      rs_conocerclienteid: independent_client.rs_conocerclienteid,
      rs_tamanionegocio: independent_client.business_size,
      rs_principalcontribuyente: independent_client.business_size === 'principalContribuyente',
      rs_medianocontribuyente: independent_client.business_size === 'medianoContribuyente',
      rs_pyme: independent_client.business_size === 'pyme',
      rs_indiquecual: independent_client.economic_group,
      rs_empresafranquicia: true,
      rs_nombrefranquicia: independent_client.franchise_name,
      rs_actividadeconomica: independent_client.economic_activity,
      rs_segundaactividad: independent_client.second_activity,
      rs_ciudaddesarrollaactividad: independent_client.city,
      rs_ciudadactividadcomercial: independent_client.city_of_sales,
      rs_principalesproductosvende: independent_client.products_and_services,
      rs_promedioventass: !independent_client.average_amount ? 0 : parseInt(independent_client.average_amount, 10),
      rs_proveedoresnacionalesinternacionales: independent_client.suppliers_information,
      rs_nombresproveedores: independent_client.suppliers_name,
      rs_nombresclientes: independent_client.clients_name,
      rs_ventasefectivo: !independent_client.sales_percentage ? 0 : parseInt(independent_client.sales_percentage, 10),
      rs_pagobancario: !independent_client.payment_percentage ? 0 : parseInt(independent_client.payment_percentage, 10),
      rs_empresainscritaenrcf: independent_client.property_control_record,
    },
  ]

}

const setValuesForFinanciero = (usuarioCRM: IUsuarioCRMRequest, financial_information: IUsuarioInformacionFinanciera, job_information: IUsuarioInformacionOcupacion, esAmericano: boolean) => {
  usuarioCRM.rs_contact_rs_informacionadicional_cliente = [
    {
      rs_objetivodeinversin: financial_information.objetivoInversion || null,
      rs_toleranciaalriesgo: financial_information.toleranciaRiesgo || null,
      rs_experienciaenelmercadodevaloresenellti: financial_information.experienciaMercado || null,
      rs_fuentefondos1: financial_information.funds_source === 'fuenteSueldo',
      rs_fuentefondos2: financial_information.funds_source === 'fuenteUtilidades',
      rs_fuentefondos3: financial_information.funds_source === 'fuenteCobros',
      rs_fuentefondos4: financial_information.funds_source === 'fuenteVentaInmueble',
      rs_fuentefondos5: financial_information.funds_source === 'fuenteFinanciacionterceros',
      rs_fuentefondos6: financial_information.funds_source === 'fuenteHerencia',
      rs_fuentefondos7: financial_information.funds_source === 'fuenteArrendamientos',

      rs_otrosrf2: financial_information.funds_source_other,

      'rs_pasdeorigendefondos@odata.bind': `/rs_paises(${financial_information.funds_source_country})`,

      // id del catalogo de paises
      rs_ingresomensualpromedio: !!financial_information.average_monthly_income_range ? computedIngresoMensual(financial_information.average_monthly_income_range) : null,
      rs_bienesinmuebles: !!financial_information.real_estate_wealth_range ? computedBsInVehiInv(financial_information.real_estate_wealth_range) : null,
      rs_vehculosembarcaciones: !!financial_information.vehicles_boats_wealth_range ? computedBsInVehiInv(financial_information.vehicles_boats_wealth_range) : null,
      rs_inversinenvaloresahorros: !!financial_information.securities_savings_wealth_range ? computedBsInVehiInv(financial_information.securities_savings_wealth_range) : null,
      rs_deudabancaria: !!financial_information.bank_debt_range ? computedBsInVehiInv(financial_information.bank_debt_range) : null,
      rs_mayordeedad: financial_information.declaration_disability === 'si' ? 1 : 3,
      rs_erespep: financial_information.is_pep === 'si' ? 1 : 2,
      rs_eressujetoobligado: financial_information.is_obliged_subject === 'si' ? 1 : 2,
      rs_relacionsab1: financial_information.main_reason_for_client === 'compraVentaInstrumentosFinancieros',
      rs_relacionsab2: financial_information.main_reason_for_client === 'asesoriaInversiones',
      rs_relacionsab3: financial_information.main_reason_for_client === 'opFuturos',
      rs_relacionsab4: financial_information.main_reason_for_client === 'custodiaValores',
      rs_relacionsab5: financial_information.main_reason_for_client === 'administrarCartera',
      rs_relacionsab6: financial_information.main_reason_for_client === 'operacionesReporte',
      // pariente inteligo o intercorp
      rs_colaboradorintercorp: job_information.is_collaborator === 'si' ? 1 : 2,
      rs_empresa: job_information.collaborator_enterprise_name || null,
      rs_cargo: job_information.collaborator_enterprise_position || null,
      rs_parientecolaboradordirectivo: job_information.is_related_collaborator === 'si',
      rs_nombrevinculacin: job_information.related_collaborator_name || null,
      rs_vnculovinculacin: job_information.related_collaborator_position || null,
      // recepcion de fondos en los proximos 2 años
      rs_ventadeinmuebles: 1,
      rs_rs_ventadenegocioempresa: 1,
      rs_bonificaciones: 1,
      rs_utilidades: 1,
      rs_otrosrf: 1,
      rs_otrasfuentesdefondos: '',
      rs_tengoseasparticulares: false,
      "rs_TipodeCustodia@odata.bind": `/rs_custodias(${TIPO_CUSTODIA_KEY})`,
      rs_formapagodividendos: tipoFormaPagoDividiendoEnum.TRANSFERENCIA_CLIENTE_OTROS_BANCOS,
      rs_tipoclienteia: tipoClienteIAEnum.RETAIL,
      rs_conocimentodelmercado: conocimientoDelMercadoEnum.MEDIO,
      rs_formatoirs: esAmericano ? 2 : 1,
      rs_direccionenvioeecc: direccionEnvioEstadoCuentaEnum.CORREO_ELECTRONICO,
      rs_bolsaanegociar: bolsaNegociarEnum.BOLSA_VALORES_LIMA,
      "rs_Mediosdepago@odata.bind": `/rs_mediodepagos(${MEDIO_PAGO_KEY})`,
      rs_tipodeordenes: `${tipoOrdenesEnum.ESCRITO},${tipoOrdenesEnum.TELEFONICO}`,
      rs_excentodecobro: false,
      rs_remisiondigital: true,
      rs_entregowaiver: esAmericano ? true : false,
      rs_remisionfisica: false,
      rs_autorizacioncobranza: true,
      rs_sinadministracioncartera: true,
    },
  ]
}

const setValuesForOcupacion = (usuarioCRM: IUsuarioCRMRequest, job_information: IUsuarioInformacionOcupacion) => {

  usuarioCRM.rs_tipocliente = !!job_information.occupation_status ? computedTipoCliente(job_information.occupation_status) : null;
  usuarioCRM.rs_ruc = job_information.occupation_enterprise_ruc;
  usuarioCRM.rs_rs_nombreempresa = job_information.occupation_enterprise_name;
  usuarioCRM.address2_city = job_information.occupation_enterprise_address;
  usuarioCRM.address2_line1 = job_information.occupation_enterprise_address;
  usuarioCRM.rs_fechadeingreso = !job_information.occupation_date_admission?.length ? null : getDateToSaveCRM(job_information.occupation_date_admission);
  usuarioCRM.rs_otrotipocliente = ''; // Se limpia el dato de este campo en todas las peticiones porque no se usa
  usuarioCRM.rs_negociopropio = false;

  if (job_information.occupation_status === 'dependiente') {
    const fechahora = new Date().toISOString().substr(0, 10)
    usuarioCRM.rs_anioservicio = !job_information.occupation_date_admission?.length ? null : `${parseInt(fechahora.substr(0, 4)) - parseInt(job_information.occupation_date_admission.substr(0, 4))
      }`
  }

  if (job_information.occupation_status === 'independiente') {
    usuarioCRM.rs_negociopropio = job_information.occupation_enterprise_ruc?.charAt(0) === '2'
  }
}

const setValuesForPersonal = (usuarioCRM: IUsuarioCRMRequest, personal_information: IUsuarioInformacionPersonalInformacion, paisesResidenciaFiscal: any) => {
  if (personal_information.tax_residence_country0 !== '01') {
    usuarioCRM.rs_residenciafiscal = true;

    const arrTINRUT: Array<IUsuarioCRMCRS2> = [
      {
        'rs_pasjurisdiccinderesidenciafiscal2@odata.bind': !personal_information.tax_residence_country0 ? undefined : `/rs_pasesresidencias(${computedPaisResidenciaFiscal(paisesResidenciaFiscal,
          personal_information.tax_residence_country0
        )})`,
        rs_tieneructin: 1,
        rs_ructin: personal_information.tin_rut0 || null,
        rs_crs2id: personal_information.tin_rut_crs2id0,
      },
    ]

    if (
      personal_information.tax_residence_country1 !== '01' &&
      personal_information.tax_residence_country1 !== ''
    ) {
      arrTINRUT.push({
        'rs_pasjurisdiccinderesidenciafiscal2@odata.bind': !personal_information.tax_residence_country1 ? undefined : `/rs_pasesresidencias(${computedPaisResidenciaFiscal(paisesResidenciaFiscal,
          personal_information.tax_residence_country1
        )})`,
        rs_tieneructin: 1,
        rs_ructin: personal_information.tin_rut1 || null,
        rs_crs2id: personal_information.tin_rut_crs2id1,
      })
    }
    if (
      personal_information.tax_residence_country2 !== '01' &&
      personal_information.tax_residence_country2 !== ''
    ) {
      arrTINRUT.push({
        'rs_pasjurisdiccinderesidenciafiscal2@odata.bind': !personal_information.tax_residence_country2 ? undefined : `/rs_pasesresidencias(${computedPaisResidenciaFiscal(paisesResidenciaFiscal,
          personal_information.tax_residence_country2
        )})`,
        rs_tieneructin: 1,
        rs_ructin: personal_information.tin_rut2 || null,
        rs_crs2id: personal_information.tin_rut_crs2id2,
      })
    }
    usuarioCRM.rs_contact_rs_crs2_Cliente = arrTINRUT

  } else {
    usuarioCRM.rs_residenciafiscal = false;
  }

}

const setValuesForConyugue = (usuarioCRM: IUsuarioCRMRequest, conyugue?: IUsuarioInformacionConyugue) => {
  if (!conyugue) {
    usuarioCRM.rs_tipodocumentoconyuge = undefined;
    usuarioCRM.rs_numerodconyuge = '';
    usuarioCRM.spousesname = '';
    usuarioCRM.rs_apellidomconyuge = '';
    usuarioCRM.rs_apellidopconyuge = '';
    return;
  }

  usuarioCRM.rs_tipodocumentoconyuge = !conyugue.type_document ? null : parseInt(conyugue.type_document);
  usuarioCRM.rs_numerodconyuge = conyugue.couple_document?.toString();
  usuarioCRM.spousesname = conyugue.couple_names;
  usuarioCRM.rs_apellidomconyuge = conyugue.couple_second_last_name;
  usuarioCRM.rs_apellidopconyuge = conyugue.couple_first_last_name;
  usuarioCRM.rs_fechadenconyuge = getDateToSaveCRM(conyugue.couple_birthdate);
  usuarioCRM.rs_tipodesociedadconyugal = !conyugue.couple_regime_status ? null : computedSociedadCnyugal(conyugue.couple_regime_status);
}

const setValuesForAnexo9 = (usuarioCRM: IUsuarioCRMRequest, anexo9?: IUsuarioInformacionAnexo9): void => {
  if (!anexo9) {
    return;
  }
  usuarioCRM.rs_propietarioindividual = computedTaxClasification(anexo9.radioTaxClas, 'proprietor');
  usuarioCRM.rs_corporacinc = computedTaxClasification(anexo9.radioTaxClas, 'CCorporation');
  usuarioCRM.rs_corporacins = computedTaxClasification(anexo9.radioTaxClas, 'SCorporation');
  usuarioCRM.rs_partnership = computedTaxClasification(anexo9.radioTaxClas, 'Partnership');
  usuarioCRM.rs_companialimitada = computedTaxClasification(anexo9.radioTaxClas, 'LimitedLiability');
  usuarioCRM.rs_fideicomisopatrimonio = computedTaxClasification(anexo9.radioTaxClas, 'TrustEstate');
  usuarioCRM.rs_otrosw9 = computedTaxClasification(anexo9.radioTaxClas, 'Other');
  usuarioCRM.rs_clasificacionfiscal2 = !!anexo9.TaxClassification ? parseInt(anexo9.TaxClassification) : null;
  usuarioCRM.rs_instrucciones = anexo9.Other;
  usuarioCRM.rs_numerosegurosocial1 = anexo9.SocialSecurity;
  usuarioCRM.rs_numeroidentificacion1 = anexo9.numeroIdentificacion;

}

const getUsuarioInformacionBase = (informacionUsuarioObject: IUsuarioInformacion, paisesResidenciaFiscal: any, cargos: ICargo[]): IUsuarioCRMRequest => {
  return {
    rs_segmento: computedSegmento(informacionUsuarioObject.companyJoined),
    rs_asesorainversiones: true,
    emailaddress1: informacionUsuarioObject.emailAdress,
    mobilephone: informacionUsuarioObject.cellphone,
    rs_tipodedocumento: parseInt(informacionUsuarioObject.identityDocument.type),
    rs_otro: informacionUsuarioObject.identityDocument.number,
    firstname: informacionUsuarioObject.personal_information.firstName,
    rs_apellidomaterno: informacionUsuarioObject.personal_information.motherLastName,
    rs_apellidopaterno: informacionUsuarioObject.personal_information.lastName,
    birthdate: informacionUsuarioObject.personal_information.birthdate,
    gendercode: computedGenero(informacionUsuarioObject.personal_information.gender),

    'rs_lugarnacimiento@odata.bind': !!informacionUsuarioObject.personal_information.birthplace ? `/rs_paises(${informacionUsuarioObject.personal_information.birthplace})` : null,
    'rs_Nacionalidad1@odata.bind': !!informacionUsuarioObject.personal_information.nationality ? `/rs_nacionalidads(${informacionUsuarioObject.personal_information.nationality})` : null,
    'rs_pas@odata.bind': !!informacionUsuarioObject.personal_information.address_country ? `/rs_paises(${informacionUsuarioObject.personal_information.address_country})` : null,
    'rs_departamento@odata.bind': !!informacionUsuarioObject.personal_information.address_state ? `/rs_departamentos(${informacionUsuarioObject.personal_information.address_state})` : null,
    'rs_provincia@odata.bind': !!informacionUsuarioObject.personal_information.address_province ? `/rs_provincias(${informacionUsuarioObject.personal_information.address_province})` : null,
    'rs_distrito@odata.bind': !!informacionUsuarioObject.personal_information.address_district ? `/rs_distritos(${informacionUsuarioObject.personal_information.address_district})` : null,
    'rs_LugarResidencia@odata.bind': !!informacionUsuarioObject.personal_information.tax_residence_country0 ? `/rs_pasesresidencias(${computedPaisResidenciaFiscal(paisesResidenciaFiscal,
      informacionUsuarioObject.personal_information.tax_residence_country0
    )})` : null,
    'rs_profesionocupacion@odata.bind': !!informacionUsuarioObject.personal_information.profession ? `/rs_profesionocupacions(${computedProfesionesOcupaciones(cargos,
      informacionUsuarioObject.personal_information.profession
    )})` : null,
    'rs_cargoocupacinlaboral@odata.bind': !!informacionUsuarioObject.job_information.occupation_enterprise_position ? `/rs_profesionocupacions(${computedProfesionesOcupaciones(cargos,
      informacionUsuarioObject.job_information.occupation_enterprise_position
    )})` : null,
    // 'rs_canal@odata.bind': `/rs_canals(${canalCRM})`,

    address1_line1: informacionUsuarioObject.personal_information.address,
    telephone1: informacionUsuarioObject.personal_information.landline,
    familystatuscode: computedEstadoCivil(
      informacionUsuarioObject.personal_information.marital_status
    ),
    educationcode: 4,
    rs_tipodeciudadano: informacionUsuarioObject.personal_information.is_american ? 1 : 2,
    rs_interesen: '2',
    'rs_pais@odata.bind': `/rs_paises(${process.env.paisEmpresa})`,
    rs_productointers: informacionUsuarioObject.personal_information.productoInteres
      ? cmputedProductoInteres(informacionUsuarioObject.personal_information.productoInteres)
      : null,
    rs_rucpersonal: informacionUsuarioObject.annexed_w8?.personalRUC,


  }
}

const getCanalCRM = (informacionUsuarioObject: IUsuarioInformacion): string => {
  let canalCRM = `${process.env.guidCanal}`;
  if (!informacionUsuarioObject.idContactCRM) {
    return canalCRM;
  }
  else if (
    informacionUsuarioObject.idContactCRM.rs_canal &&
    informacionUsuarioObject.idContactCRM.rs_canal !== ''
  ) {
    canalCRM = informacionUsuarioObject.idContactCRM.rs_canal
  } else if (
    informacionUsuarioObject.personal_information.canal &&
    informacionUsuarioObject.personal_information.canal !== ''
  ) {
    canalCRM = informacionUsuarioObject.personal_information.canal
  }
  return canalCRM;
}

const getAsesorCRM = (informacionUsuarioObject: IUsuarioInformacion, empresa: string): string => {
  const owneridCRM = empresa === 'certia' ? `${process.env.ownerIdCertia}` : `${process.env.ownerIdSAB}`;
  let asesorCRM = owneridCRM;
  if (!informacionUsuarioObject.idContactCRM) {
    return asesorCRM;
  }
  else if (informacionUsuarioObject.idContactCRM.owner) {
    asesorCRM =
      informacionUsuarioObject.idContactCRM.owner !== ''
        ? informacionUsuarioObject.idContactCRM.owner
        : owneridCRM
  }
  return asesorCRM;
}

const getPotencial = (informacionUsuarioObject: IUsuarioInformacion): number => {
  let potencialCRM = 11;
  if (!informacionUsuarioObject.idContactCRM) {
    return potencialCRM;
  }
  else if (
    informacionUsuarioObject.idContactCRM.potencialidad &&
    informacionUsuarioObject.idContactCRM.potencialidad !== ''
  ) {
    potencialCRM = parseInt(informacionUsuarioObject.idContactCRM.potencialidad)
  } else if (
    informacionUsuarioObject.personal_information.potential &&
    informacionUsuarioObject.personal_information.potential !== ''
  ) {
    potencialCRM = parseInt(informacionUsuarioObject.personal_information.potential)
  }
  return potencialCRM;
}


export default getUsuarioCRMFromFormulario;
