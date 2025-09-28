import { ENC_DEC_KEY } from "./secret";
import CryptoJS from 'crypto-js';

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENC_DEC_KEY).toString();
};

// Decrypt data
export const decryptData = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, ENC_DEC_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};