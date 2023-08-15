import { Argon2, Argon2Mode } from '@sphereon/isomorphic-argon2';
import CryptoJS from 'crypto-js';

const encrypt = async (password) => {// Choose a proper salt
    const salt = "agostinelli"
    const hash = await Argon2.hash(password, salt, {
      hashLength: 32,
      memory: 1024,
      parallelism: 1,
      mode: Argon2Mode.Argon2id,
      iterations: 1,
    });
    return hash.hex
  };

const encryptAES = (password) => {
  const key = CryptoJS.enc.Hex.parse('928e4a4bcf170409735f7bf2d85a0b1a38ee3bcf50284dbb015612edd2682cc4'); // Replace with your 32-byte key
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(password, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  console.log(encrypted)
  return {
    ciphertext: encrypted.ciphertext.toString(CryptoJS.enc.Hex),
    iv: iv.toString(CryptoJS.enc.Hex)
  };
}



export default encryptAES
