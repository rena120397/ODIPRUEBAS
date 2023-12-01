
import CryptoJS from 'crypto-js';

export class EncryptAES {
    // private key: CryptoJS.lib.WordArray | string = '';
    // private iv: CryptoJS.lib.WordArray | undefined = undefined;
    constructor(key, vector) {
        this.key = CryptoJS.enc.Latin1.parse(this.obtenerClave(key));
        this.iv = CryptoJS.enc.Latin1.parse(vector);
    }

    obtenerClave(str) {
        return Array.from(str.substring(0, 8)).map(c =>
            c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) :
                encodeURIComponent(c).replace(/\%/g, '').toLowerCase()
        ).join('');
    }

    decrypt(data) {
        const decrypted = CryptoJS.AES.decrypt(data, this.key, { iv: this.iv, padding: CryptoJS.pad.ZeroPadding });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    encrypt(data) {
        const encrypted = CryptoJS.AES.encrypt(data, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
        return encrypted.toString();
    }
}


