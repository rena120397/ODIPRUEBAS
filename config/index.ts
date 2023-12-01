import { B2CPOLICES_DOMINE } from './enviroment.config';

export * from './apim.urls.config';
export * from './crm.codes.config';
export * from './crm.config';
export * from './crm.query.config';
export * from './enviroment.config';
export * from './session.config';

export const TEXT_WAIVER = '1. Haber sido informado por Inteligo SAB sobre la ley denominada “Foreign Account Tax Compliance Act-FATCA” (Ley de fiscalización de cuentas extranjeras), en vigencia a partir del 1 de julio de 2014, cuya finalidad es la de fortalecer los mecanismos de fiscalización de las inversiones que mantienen fuera de los EE.UU. las personas clasificadas por la ley como “US Persons” (ciudadanos, residentes o residentes fiscales de los EE.UU., así como sociedades creadas u organizadas en los EE.UU. o bajo las leyes de ese país, o cuyos accionistas con participación igual o mayor al 10% sean a su vez US Persons, entre otros obligadas por la Ley FATCA). 2. Ser ciudadano de los EEUU para efectos de FATCA y autorizar de manera libre,expresa, informada e inequívoca, a Inteligo para que brinde a la autoridad tributaria competente (ya sea la SUNAT o el Internal Revenue Service –IRS—del gobierno de los Estados Unidos de América) la información sobre mis Datos Personales (nombre, documento oficial de identidad, dirección, nacionalidad, documento de identificación fiscal, tipo y número o código de la(s) cuenta(s) que mantengo en la entidad financiera), detalle de movimientos y saldos de mis cuentas y productos, así como cualquier otra información que pueda ser requerida con el propósito de cumplir con la mencionada Ley.';

export const TERMINOS_Y_CONDICIONES_PDF = 'https://saonboardinginteligo.blob.core.windows.net/documentos/Persona%20Natural-Contrato%20de%20Intermediacio%CC%81n%20OnBoarding%20Digital.pdf';

export const POLITICAS_PDF = 'https://saonboardinginteligo.blob.core.windows.net/documentos/Política de Clientes 2020.2.pdf';

export const PRIVACIDAD_PDF = 'https://saonboardinginteligo.blob.core.windows.net/documentos/POLÍTICA DE PRIVACIDAD DE CLIENTES Y POTENCIALES CLIENTES - Digital Jul 2020.pdf';


export const CODIGO_DUPLICADO_COSMOS = 'DUP_COSMOSDB001';
export const CODIGO_NO_EXISTE_COSMOS = 'NOEXIST_COSMOSDB001';

export const B2C_URI = `https://${B2CPOLICES_DOMINE}.b2clogin.com/${B2CPOLICES_DOMINE}.onmicrosoft.com/B2C_1_`;
export const B2C_SCOPES = [`https://${B2CPOLICES_DOMINE}.onmicrosoft.com/apinode/Demo.Read`];
export const B2C_SIGNUP = `${B2C_URI}SignUpOnboarding`;
export const B2C_SIGNIN = `${B2C_URI}SignInOnboarding`;
export const B2C_RESET_PASSWORD = `${B2C_URI}ResetOnboarding`;
export const B2C_EDIT_PROFILE = `${B2C_URI}EditProfileOnboarding`;

export const BOTON_GUARDAR_TEXTO = 'GUARDAR';
export const BOTON_ACTUALIZAR_TEXTO = 'GUARDAR';

export enum procentajePerfilEnum {
    avisosLegales = 10,
    cuentasBancarias = 10,
    datosLaborales = 20,
    informacionFinanciera = 30,
    informacionPersonal = 20,
    informacionUsuario = 10,
}

export const INTELIGO_SAB_HOME_PAGE = 'https://www.inteligosab.com/home';
