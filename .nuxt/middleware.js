const middleware = {}

middleware['client/validateExternalUpdate'] = require('..\\middleware\\client\\validateExternalUpdate.js')
middleware['client/validateExternalUpdate'] = middleware['client/validateExternalUpdate'].default || middleware['client/validateExternalUpdate']

middleware['mdwmsal'] = require('..\\middleware\\mdwmsal.js')
middleware['mdwmsal'] = middleware['mdwmsal'].default || middleware['mdwmsal']

middleware['server/encrypt/aes-encrypt'] = require('..\\middleware\\server\\encrypt\\aes-encrypt.js')
middleware['server/encrypt/aes-encrypt'] = middleware['server/encrypt/aes-encrypt'].default || middleware['server/encrypt/aes-encrypt']

middleware['server/encrypt/base64-encrypt'] = require('..\\middleware\\server\\encrypt\\base64-encrypt.js')
middleware['server/encrypt/base64-encrypt'] = middleware['server/encrypt/base64-encrypt'].default || middleware['server/encrypt/base64-encrypt']

middleware['server/encrypt/index'] = require('..\\middleware\\server\\encrypt\\index.js')
middleware['server/encrypt/index'] = middleware['server/encrypt/index'].default || middleware['server/encrypt/index']

middleware['server/help'] = require('..\\middleware\\server\\help.js')
middleware['server/help'] = middleware['server/help'].default || middleware['server/help']

middleware['server/validateGenerarToken'] = require('..\\middleware\\server\\validateGenerarToken.js')
middleware['server/validateGenerarToken'] = middleware['server/validateGenerarToken'].default || middleware['server/validateGenerarToken']

middleware['server/validateUpdatePerfil'] = require('..\\middleware\\server\\validateUpdatePerfil.js')
middleware['server/validateUpdatePerfil'] = middleware['server/validateUpdatePerfil'].default || middleware['server/validateUpdatePerfil']

export default middleware
