import { IUsuarioInformacionRUT } from "~/types";

export const validarRut = (informacionRut: IUsuarioInformacionRUT): { esValido: boolean, mensajeValidacion: string } => {
    let mensajeValidacion: string = '';
    let esValido: boolean = true;

    if(!informacionRut.apellidoMaterno){
        esValido = false;
        mensajeValidacion += 'No tiene apellidoMaterno\n';
    }
    if(!informacionRut.apellidoPaterno){
        esValido = false;
        mensajeValidacion += 'No tiene apellidoPaterno\n';
    }
    if(!informacionRut.nombres){
        esValido = false;
        mensajeValidacion += 'No tiene nombres\n';
    }
    if(!informacionRut.fechaNacimiento){
        esValido = false;
        mensajeValidacion += 'No tiene fechaNacimiento\n';
    }
    if(!informacionRut.tipoDocumento){
        esValido = false;
        mensajeValidacion += 'No tiene tipoDocumento\n';
    }
    if(!informacionRut.numeroDocumento){
        esValido = false;
        mensajeValidacion += 'No tiene numeroDocumento\n';
    }
    if(!informacionRut.telefono){
        esValido = false;
        mensajeValidacion += 'No tiene telefono\n';
    }
    return { esValido, mensajeValidacion };

}