export * from './aes-encrypt';
export * from './base64-encrypt';

import { atob, btoa } from './base64-encrypt';
import { EncryptAES } from ".";
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

const ENCRYPT_TYPE = process.env.ENCRYPT_TYPE || 'base64';
const regexJson = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g;
const encryptMethodNotFound = 'No se estableció un método de encriptación';

// Validando JSON string
export function isJSON(str) {
  if (/^\s*$/.test(str)) { return false; }
  str = str.replace(/\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
  str = str.replace(regexJson, ']');
  str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '')
  return /^[\],:{}\s]*$/.test(str)
}


// kpRWxSPDfsEucj00BYFqQ1IhquWBdhUYBoh9hBZC1v4rFr2U+o8q4RzEExDgMP6qwr/kEU8A96kl+qQxO1K7xY82E7ihQL4cqEdmAEzJNiY=
// kpRWxSPDfsEucj00BYFqQ1IhquWBdhUYBoh9hBZC1v4rFr2U%2Bo8q4RzEExDgMP6qwr%2FkEU8A96kl%2BqQxO1K7xY82E7ihQL4cqEdmAEzJNiY%3D
// const sB64 = libs.btoa(JSON.stringify({"tipo_doc":"1","num_doc":"45381933","createdate":"19-01-202218:19:55"}))

export const getSecretKetToDecrypt = async () => {
  const credential = new DefaultAzureCredential();

  const keyVaultName = process.env.KEY_VAULT_NAME;
  const url = "https://" + keyVaultName + ".vault.azure.net";

  const client = new SecretClient(url, credential);

  // Read the secret we created
  const secret = await client.getSecret(process.env.DECRYPT_SECRET_NAME || 'odi-aes-key');
  const vector = await client.getSecret(process.env.DECRYPT_SECRET_VECTOR || 'odi-aes-vector');
  return [secret?.value || '', vector?.value || ''];
}

export const encryptString = async (value) => {
  switch (ENCRYPT_TYPE) {
    case 'base64': return btoa(JSON.stringify(value));
    case 'aes':
      const [secretKey, vectorKey] = await getSecretKetToDecrypt();
      const AESEncrypt = new EncryptAES(secretKey, vectorKey);
      return AESEncrypt.encrypt(JSON.stringify(value));
    default: throw new Error(encryptMethodNotFound);
  }
}

export const decryptString = async (value) => {

  switch (ENCRYPT_TYPE) {
    case 'base64': return atob(value);
    case 'aes':
      const dataEncrypt = decodeURI(value);
      const [secretKey, vectorKey] = await getSecretKetToDecrypt();
      const AESEncrypt = new EncryptAES(secretKey, vectorKey);
      return AESEncrypt.decrypt(dataEncrypt);
    default: throw new Error(encryptMethodNotFound);
  }

}
