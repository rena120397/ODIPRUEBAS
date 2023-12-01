import { ASESOR_INVERSIONES, ASESOR_INVERSIONES_CERTIA } from "~/config/enviroment.config";
import { IInfoUsuarioCRM, INacionalidad, IPais, IUsuarioCRMRequest, IUsuarioCRMUpdateRequest, IUsuarioInformacion } from "~/types";
import { computedBsInVehiInv, computedEstadoCivil, computedGenero, computedIngresoMensual, computedNacionalidad, computedPais, computedSegmento, computedSociedadCnyugal, computedTaxClasification, computedTipoCliente, getDateToSaveCRM } from "./computedFunctions";

const getParaActualizarDatos = (informacionUsuarioObject: IUsuarioInformacion, dataInformacionCRM: IUsuarioCRMRequest, datActualizarCRMNativoOld: IUsuarioCRMUpdateRequest, paises: Array<IPais>, nacionalidades: Array<INacionalidad>) => {

  const infoUsuarioCRM: IInfoUsuarioCRM = getInforUsuarioCRM(informacionUsuarioObject, paises, nacionalidades);
  const datActualizarCRMNativo: IUsuarioCRMUpdateRequest = getDatActualizarCRMNativo(datActualizarCRMNativoOld, dataInformacionCRM);

  const esActualizar = !!informacionUsuarioObject.idContactCRM?.crmContactId?.length;

  const infoAdicionalCRM = !esActualizar ? {} : getInfoAdicionalCRM(informacionUsuarioObject, paises);
  const infoCuentaBancaria = !esActualizar ? {} : informacionUsuarioObject.main_bank_ccount.accounts;
  const objetivoInversionCRM = !esActualizar ? {} :
    informacionUsuarioObject.financial_information.objetivoInversion;
  const infoConoceCliente = getInfoConoceCliente(informacionUsuarioObject, esActualizar);
  const infoCRS = !esActualizar ? {} : informacionUsuarioObject.personal_information;


  return {
    datActualizarCRMNativo,
    infoUsuarioCRM,
    infoAdicionalCRM,
    infoConoceCliente,
    infoCRS,
    infoCuentaBancaria,
    objetivoInversionCRM
  };
}
const getDatActualizarCRMNativo = (datActualizarCRMNativoOld: IUsuarioCRMUpdateRequest, dataInformacionCRM: IUsuarioCRMRequest): IUsuarioCRMUpdateRequest => {
  const datActualizarCRMNativo: IUsuarioCRMUpdateRequest = { ...datActualizarCRMNativoOld };
  // informacion personal
  datActualizarCRMNativo.rs_contact = Object.assign(
    { rs_procesoactualizacion: "adi" },
    dataInformacionCRM
  );
  datActualizarCRMNativo.rs_contact_rs_informacionadicional_cliente = dataInformacionCRM.rs_contact_rs_informacionadicional_cliente;
  datActualizarCRMNativo.rs_crs2s = dataInformacionCRM.rs_contact_rs_crs2_Cliente;
  datActualizarCRMNativo.rs_contact_rs_conocercliente_Cliente = dataInformacionCRM.rs_contact_rs_conocercliente_Cliente;
  datActualizarCRMNativo.rs_contact_rs_cuentasbancarias_Cliente = dataInformacionCRM.rs_contact_rs_cuentasbancarias_Cliente;
  datActualizarCRMNativo.rs_contact_rs_personasexpuestas_Cliente = dataInformacionCRM.rs_contact_rs_personasexpuestas_Cliente;

  // para actualizar con el api de crm nativo se necesita enviar los datos de contacto dentro de data_contact
  delete datActualizarCRMNativo.rs_contact.rs_contact_rs_conocercliente_Cliente
  delete datActualizarCRMNativo.rs_contact.rs_contact_rs_cuentasbancarias_Cliente
  delete datActualizarCRMNativo.rs_contact.rs_contact_rs_personasexpuestas_Cliente
  delete datActualizarCRMNativo.rs_contact.rs_contact_rs_informacionadicional_cliente
  delete datActualizarCRMNativo.rs_contact.rs_contact_rs_crs2_Cliente;

  return datActualizarCRMNativo;

}

const getInforUsuarioCRM = (informacionUsuarioObject: IUsuarioInformacion, paises: Array<IPais>, nacionalidades: Array<INacionalidad>): IInfoUsuarioCRM => {
  const infoUsuarioCRM: IInfoUsuarioCRM = {};
  infoUsuarioCRM.nombres = informacionUsuarioObject.personal_information.firstName
  infoUsuarioCRM.apellidoPaterno = informacionUsuarioObject.personal_information.lastName
  infoUsuarioCRM.apellidoMaterno = informacionUsuarioObject.personal_information.motherLastName
  infoUsuarioCRM.tipoDocumento = parseInt(informacionUsuarioObject.identityDocument.type)
  infoUsuarioCRM.numeroDocumento = informacionUsuarioObject.identityDocument.number;

  // conyugue 
  if (!!informacionUsuarioObject.couple_information) {
    infoUsuarioCRM.rs_tipodocumentoconyuge = !informacionUsuarioObject.couple_information.type_document ? null : parseInt(
      informacionUsuarioObject.couple_information.type_document
    )
    infoUsuarioCRM.rs_numerodconyuge = informacionUsuarioObject.couple_information.couple_document?.toString()
    infoUsuarioCRM.spousesname = informacionUsuarioObject.couple_information.couple_names;
    infoUsuarioCRM.rs_apellidomconyuge = informacionUsuarioObject.couple_information.couple_second_last_name;
    infoUsuarioCRM.rs_apellidopconyuge = informacionUsuarioObject.couple_information.couple_first_last_name;
    infoUsuarioCRM.rs_fechadenconyuge = getDateToSaveCRM(informacionUsuarioObject.couple_information.couple_birthdate);
    infoUsuarioCRM.rs_tipodesociedadconyugal = !informacionUsuarioObject.couple_information.couple_regime_status ? null :
      computedSociedadCnyugal(
        informacionUsuarioObject.couple_information.couple_regime_status
      )
  }
  if (!!informacionUsuarioObject.idContactCRM?.crmContactId?.length) {
    setInforUsuarioCRMUpdate(infoUsuarioCRM, informacionUsuarioObject, paises, nacionalidades);
  }

  return infoUsuarioCRM;
}

const getInfoConoceCliente = (informacionUsuarioObject: IUsuarioInformacion, esActualizar: boolean) => {

  if (!informacionUsuarioObject.independent_client || !esActualizar) {
    return undefined;
  }

  return {
    principalContribuyente: informacionUsuarioObject.independent_client.business_size === 'principalContribuyente',
    medianoContribuyente: informacionUsuarioObject.independent_client.business_size === 'medianoContribuyente',
    pyme: informacionUsuarioObject.independent_client.business_size === 'pyme',
    cualGrupo: informacionUsuarioObject.independent_client.economic_group,
    nombreFranquicia: informacionUsuarioObject.independent_client.franchise_name,
    actividadEconomica: informacionUsuarioObject.independent_client.economic_activity,
    segundaActividadEconomica: informacionUsuarioObject.independent_client.second_activity,
    ciudadDesarrollaActividad: informacionUsuarioObject.independent_client.city,
    ciudadActividadComercial: informacionUsuarioObject.independent_client.city_of_sales,
    productosPrincipales: informacionUsuarioObject.independent_client.products_and_services,
    promedioVetas: informacionUsuarioObject.independent_client.average_amount,
    proveedoresNacInt: informacionUsuarioObject.independent_client.suppliers_information,
    proveedoresPrincipales: informacionUsuarioObject.independent_client.suppliers_name,
    clientesPrincipales: informacionUsuarioObject.independent_client.clients_name,
    ventasEfectivo: informacionUsuarioObject.independent_client.sales_percentage,
    pagoBancario: informacionUsuarioObject.independent_client.payment_percentage,
    inscritoRCF: informacionUsuarioObject.independent_client.property_control_record,
  }
}

const getInfoAdicionalCRM = (informacionUsuarioObject: IUsuarioInformacion, paises: Array<IPais>) => {
  return {
    objetivoInversion: informacionUsuarioObject.financial_information.objetivoInversion,
    toleranciaRiesgo: informacionUsuarioObject.financial_information.toleranciaRiesgo,
    experienciaMercado: informacionUsuarioObject.financial_information.experienciaMercado,
    sueldos: informacionUsuarioObject.financial_information.funds_source === 'fuenteSueldo',
    utilidaes: informacionUsuarioObject.financial_information.funds_source === 'fuenteUtilidades',
    cobroDividendos: informacionUsuarioObject.financial_information.funds_source === 'fuenteCobros',
    ventaInmuebles: informacionUsuarioObject.financial_information.funds_source === 'fuenteVentaInmueble',
    financiacionTerrenos: informacionUsuarioObject.financial_information.funds_source === 'fuenteFinanciacionterceros',
    herencia: informacionUsuarioObject.financial_information.funds_source === 'fuenteHerencia',
    arrendamientos: informacionUsuarioObject.financial_information.funds_source === 'fuenteArrendamientos',

    otraFuenteFondos: informacionUsuarioObject.financial_information.funds_source_other,

    paisOrigenFondos: informacionUsuarioObject.financial_information?.funds_source_country &&
      computedPais(paises, informacionUsuarioObject.financial_information.funds_source_country), // id del catalogo de paises
      rs_ingresomensualpromedio: !!informacionUsuarioObject.financial_information.average_monthly_income_range ? computedIngresoMensual(informacionUsuarioObject.financial_information.average_monthly_income_range) : null,
      rs_bienesinmuebles:!!informacionUsuarioObject.financial_information.real_estate_wealth_range ? computedBsInVehiInv(informacionUsuarioObject.financial_information.real_estate_wealth_range) : null,
      rs_vehculosembarcaciones: !!informacionUsuarioObject.financial_information.vehicles_boats_wealth_range ?computedBsInVehiInv(informacionUsuarioObject.financial_information.vehicles_boats_wealth_range) : null,
      rs_inversinenvaloresahorros: !!informacionUsuarioObject.financial_information.securities_savings_wealth_range ?computedBsInVehiInv(informacionUsuarioObject.financial_information.securities_savings_wealth_range) : null,
      rs_deudabancaria: !!informacionUsuarioObject.financial_information.bank_debt_range ? computedBsInVehiInv(informacionUsuarioObject.financial_information.bank_debt_range) : null,
    mayorEdad: informacionUsuarioObject.financial_information.declaration_disability === 'si' ? 1 : 3,
    eresPEP: informacionUsuarioObject.financial_information.is_pep === 'si' ? 1 : 2,
    eresObligado: informacionUsuarioObject.financial_information.is_obliged_subject === 'si' ? 1 : 2,
    compraVentaInstrumentosFinancieros: informacionUsuarioObject.financial_information.main_reason_for_client === 'compraVentaInstrumentosFinancieros',
    opFuturos: informacionUsuarioObject.financial_information.main_reason_for_client === 'opFuturos',
    administrarCartera: informacionUsuarioObject.financial_information.main_reason_for_client === 'administrarCartera',
    asesoriaInversiones: informacionUsuarioObject.financial_information.main_reason_for_client === 'asesoriaInversiones',
    custodiaValores: informacionUsuarioObject.financial_information.main_reason_for_client === 'custodiaValores',
    operacionesReporte: informacionUsuarioObject.financial_information.main_reason_for_client === 'operacionesReporte',
    // pariente inteligo o intercorp
    colaboradorSAB:
      informacionUsuarioObject.job_information.is_collaborator === 'si' ? 1 : 2,
    empresa: informacionUsuarioObject.job_information.collaborator_enterprise_name,
    cargo: informacionUsuarioObject.job_information.collaborator_enterprise_position,
    parienteColaborador:
      informacionUsuarioObject.job_information.is_related_collaborator === 'si',
    nombreVinculacion: informacionUsuarioObject.job_information.related_collaborator_name,
    vinculo: informacionUsuarioObject.job_information.related_collaborator_position,
  }
}

const setInforUsuarioCRMUpdate = (infoUsuarioCRM: IInfoUsuarioCRM, informacionUsuarioObject: IUsuarioInformacion, paises: Array<IPais>, nacionalidades: Array<INacionalidad>) => {

  // Informacion de usuario y personal
  infoUsuarioCRM.segmento = computedSegmento(informacionUsuarioObject.companyJoined);
  infoUsuarioCRM.asesoriaInversiones = true;
  if (informacionUsuarioObject.companyJoined === 'certia') {
    infoUsuarioCRM.asesorInversiones = ASESOR_INVERSIONES_CERTIA;
  } else {
    infoUsuarioCRM.asesorInversiones = ASESOR_INVERSIONES;
  }

  infoUsuarioCRM.correoElectronico = informacionUsuarioObject.emailAdress;
  infoUsuarioCRM.telefonoMovil = informacionUsuarioObject.cellphone;
  infoUsuarioCRM.tipoDocumento = parseInt(informacionUsuarioObject.identityDocument.type);
  infoUsuarioCRM.numeroDocumento = informacionUsuarioObject.identityDocument.number;
  infoUsuarioCRM.nombres = informacionUsuarioObject.personal_information.firstName;
  infoUsuarioCRM.apellidoMaterno = informacionUsuarioObject.personal_information.motherLastName;
  infoUsuarioCRM.apellidoPaterno = informacionUsuarioObject.personal_information.lastName;
  infoUsuarioCRM.fechaNacimiento = getDateToSaveCRM(informacionUsuarioObject.personal_information.birthdate);
  infoUsuarioCRM.genero = computedGenero(informacionUsuarioObject.personal_information.gender);
  infoUsuarioCRM.lugarNacimiento = computedPais(paises, informacionUsuarioObject.personal_information.birthplace);
  infoUsuarioCRM.nacionalidad = computedNacionalidad(nacionalidades, informacionUsuarioObject.personal_information.nationality);
  infoUsuarioCRM.pais = computedPais(paises, informacionUsuarioObject.personal_information.address_country);
  infoUsuarioCRM.departamento = informacionUsuarioObject.personal_information.address_stateCRM;
  infoUsuarioCRM.provicia = informacionUsuarioObject.personal_information.address_provinceCRM;
  infoUsuarioCRM.distrito = informacionUsuarioObject.personal_information.address_districtCRM;
  infoUsuarioCRM.paisResidenciaFiscal = informacionUsuarioObject.personal_information.tax_residence_country0;
  infoUsuarioCRM.direccionDomicilio = informacionUsuarioObject.personal_information.address;
  infoUsuarioCRM.telefono = informacionUsuarioObject.personal_information.landline;
  infoUsuarioCRM.estadoCivil = computedEstadoCivil(informacionUsuarioObject.personal_information.marital_status);
  infoUsuarioCRM.gradoInstitucional = 4;
  infoUsuarioCRM.tipoCiudadano = informacionUsuarioObject.personal_information.is_american ? 1 : 2;
  infoUsuarioCRM.paisEmpresa = '001000000';
  infoUsuarioCRM.residenciaFiscalExtranjera = informacionUsuarioObject.personal_information.tax_residence_country0 !== '01';


  // campo potencial si existe (2 primeras preg.)
  infoUsuarioCRM.potencial = ''
  if (informacionUsuarioObject.personal_information.potential) {
    infoUsuarioCRM.potencial = informacionUsuarioObject.personal_information.potential;
  }

  // anexo8
  if (informacionUsuarioObject.annexed_w8) {
    infoUsuarioCRM.rucPersonal = informacionUsuarioObject.annexed_w8.personalRUC;
  }
  if (informacionUsuarioObject.annexed_w9) {
    infoUsuarioCRM.propietarioIndividual = computedTaxClasification(informacionUsuarioObject.annexed_w9.radioTaxClas, 'proprietor');
    infoUsuarioCRM.corporacionC = computedTaxClasification(informacionUsuarioObject.annexed_w9.radioTaxClas, 'CCorporation');
    infoUsuarioCRM.corporacionS = computedTaxClasification(informacionUsuarioObject.annexed_w9.radioTaxClas, 'SCorporation');
    infoUsuarioCRM.partnership = computedTaxClasification(informacionUsuarioObject.annexed_w9.radioTaxClas, 'Partnership');
    infoUsuarioCRM.companiaLimitada = computedTaxClasification(informacionUsuarioObject.annexed_w9.radioTaxClas, 'LimitedLiability');
    infoUsuarioCRM.fideicomisosPatrimonio = computedTaxClasification(informacionUsuarioObject.annexed_w9.radioTaxClas, 'TrustEstate');
    infoUsuarioCRM.clasificacionFiscal = !!informacionUsuarioObject.annexed_w9.TaxClassification ? parseInt(
      informacionUsuarioObject.annexed_w9.TaxClassification
    ) : null;

    infoUsuarioCRM.otrosW9 = computedTaxClasification(informacionUsuarioObject.annexed_w9.radioTaxClas, 'Other');

    infoUsuarioCRM.instrucciones = informacionUsuarioObject.annexed_w9.Other;

    // infoUsuarioCRM.rs_otro = informacionUsuarioObject.annexed_w9.Other
    infoUsuarioCRM.numeroSeguroSocial = informacionUsuarioObject.annexed_w9.SocialSecurity;

    infoUsuarioCRM.numeroIdentificacion = informacionUsuarioObject.annexed_w9.numeroIdentificacion;
  }

  // informacion de cónyugue
  if (informacionUsuarioObject.couple_information) {
    infoUsuarioCRM.tipoDocumentoConyuge = !informacionUsuarioObject.couple_information.type_document ? null :
      parseInt(informacionUsuarioObject.couple_information.type_document)
    infoUsuarioCRM.numeroDocumentoConyuge = informacionUsuarioObject.couple_information.couple_document?.toString();
    infoUsuarioCRM.nombreConyuge = informacionUsuarioObject.couple_information.couple_names
    infoUsuarioCRM.apellidoMaternoConyuge = informacionUsuarioObject.couple_information.couple_second_last_name;
    infoUsuarioCRM.apellidoPaternoConyuge = informacionUsuarioObject.couple_information.couple_first_last_name;
    infoUsuarioCRM.fechaNacimientoConyuge = informacionUsuarioObject.couple_information.couple_birthdate;
    infoUsuarioCRM.sociedadConyugal = !informacionUsuarioObject.couple_information.couple_regime_status ? null :
      computedSociedadCnyugal(informacionUsuarioObject.couple_information.couple_regime_status);
  } else {
    infoUsuarioCRM.tipoDocumentoConyuge = null;
    infoUsuarioCRM.numeroDocumentoConyuge = '';
    infoUsuarioCRM.nombreConyuge = '';
    infoUsuarioCRM.apellidoMaternoConyuge = '';
    infoUsuarioCRM.apellidoPaternoConyuge = '';
  }
  // INFORMACION Laboral
  infoUsuarioCRM.tipoCliente = computedTipoCliente(informacionUsuarioObject.job_information.occupation_status);
  infoUsuarioCRM.ruc = informacionUsuarioObject.job_information.occupation_enterprise_ruc;
  infoUsuarioCRM.nombreEmpresa = informacionUsuarioObject.job_information.occupation_enterprise_name;
  infoUsuarioCRM.direccionDatoLaboral = informacionUsuarioObject.job_information.occupation_enterprise_address;
  infoUsuarioCRM.profesionOcupacion = informacionUsuarioObject.personal_information.profession;
  infoUsuarioCRM.cargo = informacionUsuarioObject.job_information.occupation_enterprise_position;
  infoUsuarioCRM.fechaDeIngreso = getDateToSaveCRM(informacionUsuarioObject.job_information.occupation_date_admission);
  infoUsuarioCRM.negocioPropio = false;

  if (informacionUsuarioObject.job_information.occupation_status === 'dependiente' && informacionUsuarioObject.job_information.occupation_date_admission) {
    const fechahora = new Date().toISOString().substr(0, 10);

    infoUsuarioCRM.anioServicio =
      parseInt(fechahora.substr(0, 4)) -
      parseInt(
        informacionUsuarioObject.job_information.occupation_date_admission.substr(0, 4)
      )
  }

  if (informacionUsuarioObject.job_information.occupation_status === 'independiente') {
    infoUsuarioCRM.negocioPropio =
      informacionUsuarioObject.job_information.occupation_enterprise_ruc?.charAt(0) === '2'
  }
  // INFORMACION PEP
  if (informacionUsuarioObject.annexed_pep) {
    infoUsuarioCRM.cargoPEP = informacionUsuarioObject.annexed_pep.function_or_position_held?.position0;
    infoUsuarioCRM.institucionPEP = informacionUsuarioObject.annexed_pep.function_or_position_held?.institution0;
  }


}

export default getParaActualizarDatos;
