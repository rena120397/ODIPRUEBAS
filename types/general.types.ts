export interface ICargo {
    rs_profesionocupacionid: string;
    rs_name: string;
    rs_id: string;
}

export interface IPaisResidenciaFiscal {
    rs_pasesresidenciaid: string;
    rs_name: string;
    rs_id: string;
}

export interface IPais {
    rs_paisid: string;
    rs_name: string;
    rs_cdigo: string;
}

export interface INacionalidad {
    rs_nacionalidadid: string;
    rs_codigonacionalidad: string;
    rs_name: string;
}

export interface IDepartamento {
    rs_departamentoid: string;
    rs_name: string;
}

export interface IProvincia {
    rs_provinciaid: string;
    rs_name: string;
}

export interface IDistrito {
    rs_distritoid: string;
    rs_name: string;
}
