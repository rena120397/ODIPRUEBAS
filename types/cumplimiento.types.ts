
export interface ICumplimientoCosmos {
    apellido_materno:string;
    apellido_paterno:string;
    date: Date;
    diligenceComplianceId:string;
    documentNumber:string;
    hasCRMBlackListObservations:string;
    hasComplianceNoRecomendadoObservations:string;
    hasCompliancePEPObservations:string;
    hasComplianceWordCheckObservations:string;
    hasGoogleObservations:string;
    identityDocument: {
        type:string,
        number: string
    };
    nombres:string;
    status:string;
    id: string | undefined;
}

export interface ICumplimientoCosmosRequest { 
    id: string;
    compliance_information: ICumplimientoCosmos;
    isUpdate: boolean;
}

export type hasCompliance = 'S' | 'N';
export interface IValidarCumplimientoResponse {
    apellido_materno: string;
    apellido_paterno: string;
    documentNumber: string;
    hasCRMBlackListObservations: hasCompliance;
    hasComplianceNoRecomendadoObservations: hasCompliance;
    hasCompliancePEPObservations: hasCompliance;
    hasComplianceWordCheckObservations: hasCompliance;
    hasGoogleObservations: hasCompliance;
    id: string;
    nombres: string;
    status: string;
}

export interface IDataCumplimiento {
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombres: string;
    id: string;
    documentType: string;
    id_relacionado: any;
    cotitulares: {
        apellidoMaterno: any;
        apellidoPaterno: any;
        id_doc: any;
        nombres: any;
        tipo_cotitular: string;
        tipo_id_doc: string;
    }[];
}

