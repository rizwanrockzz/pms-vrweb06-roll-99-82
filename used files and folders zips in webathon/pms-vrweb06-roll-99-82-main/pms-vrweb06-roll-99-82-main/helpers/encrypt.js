import CryptoJS from 'crypto-js';

export const encryptValue = (value) => {
    const encryptedData = CryptoJS.AES.encrypt(value, process.env.AES_SECRET_KEY).toString();
    console.log("encrypted Data");
    console.log(encryptedData);

    return encryptedData;
}

export const decryptValue = (value) => {
    const bytes = CryptoJS.AES.decrypt(value, process.env.AES_SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    return originalText;
}