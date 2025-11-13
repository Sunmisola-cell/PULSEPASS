// server/utils/crypto.js
const CryptoJS = require('crypto-js');
const crypto = require('crypto');

const AES_SECRET = process.env.AES_SECRET || 'demo_secret_key';

// encrypt Pulse ID (AES)
function encryptPulse(pulseID) {
  return CryptoJS.AES.encrypt(String(pulseID), AES_SECRET).toString();
}

// decrypt Pulse ID
function decryptPulse(cipherText) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, AES_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return null;
  }
}

// hash Pulse ID using SHA-512
function hashPulse(pulseID) {
  return crypto.createHash('sha512').update(String(pulseID)).digest('hex');
}

module.exports = { encryptPulse, decryptPulse, hashPulse };
