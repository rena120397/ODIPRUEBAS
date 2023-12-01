// Redireccion 301 al home de ODI
export const redirect = function redirect(res) {
    res.writeHead(301, { Location: '/' });
    res.end();
  }

