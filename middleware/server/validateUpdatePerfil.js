
import parseurl from 'parseurl';
import { decryptString } from './encrypt';
import { redirect } from "./help";



export const validateUpdatePerfil = async (req, res, next) => {
  const esActualizarUsuario = req.originalUrl?.includes('loading-update');

  if (!esActualizarUsuario) {
    return next();
  }
  const oQuery = new URLSearchParams(parseurl(req)?.query);

  if (!oQuery.has('q')) {
    redirect(res);
  }

  const uri = oQuery.get('q') || '';
  try {
    const dataDecrypt = await decryptString(decodeURI(uri));
    const objectoJson = JSON.parse(dataDecrypt);
    if (!objectoJson.tipo_doc || !objectoJson.num_doc) {
      throw new Error("No tiene el formato correcto");
    }
    res.setHeader('Set-Cookie', 'client-request=' + dataDecrypt);
  } catch (error) {
    console.error(error);
  }
  return next();
}

export default validateUpdatePerfil;
