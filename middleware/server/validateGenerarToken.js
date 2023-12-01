import parseurl from "parseurl";
import { encryptString } from "./encrypt";
import { redirect } from "./help";

export const validateGenerarToken = async (req, res, next) => {
    const esGenerarToken = req.originalUrl?.includes('generar-token');

    if ((!esGenerarToken) || (esGenerarToken && process.env.PERMITIR_GENERAR_TOKEN !== 'si')) {
        return next();
    }

    const oQuery = new URLSearchParams(parseurl(req)?.query);
    if (!oQuery.has('type') || !oQuery.get('document')) {
        redirect(res);
    }
    const type = oQuery.get('type') || '';
    const document = oQuery.get('document') || '';


    const newConsult =  { "tipo_doc": type, "num_doc": document, "createdate": new Date().toISOString() };
    const dataEncrypt = await encryptString(newConsult);
    const dataUri = encodeURIComponent(dataEncrypt);
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + (60 * 1000); //1 minuto
    now.setTime(expireTime);

    res.setHeader('Set-Cookie', `encrypt-request=${dataUri};expires=${now.toUTCString()}`);
    return next();
}

export default validateGenerarToken;
