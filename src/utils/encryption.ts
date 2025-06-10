import CryptoJS from 'crypto-js';

export class EncryptionService {
  private static generateKey(password: string, salt: string): string {
    return CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 10000
    }).toString();
  }

  static encrypt(data: string, password: string): { encrypted: string; salt: string; iv: string } {
    const salt = CryptoJS.lib.WordArray.random(256 / 8).toString();
    const iv = CryptoJS.lib.WordArray.random(128 / 8).toString();
    const key = this.generateKey(password, salt);
    
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: CryptoJS.enc.Hex.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();

    return { encrypted, salt, iv };
  }

  static decrypt(encryptedData: string, password: string, salt: string, iv: string): string {
    const key = this.generateKey(password, salt);
    
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: CryptoJS.enc.Hex.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  static generatePassword(length: number = 16): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }
}