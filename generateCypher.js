const CryptoJS = require("crypto-js");
const fs = require("fs");

const message = fs.readFileSync("message.txt").toString();
const password = fs.readFileSync("password.txt").toString();

// Encrypt
const ciphertext = CryptoJS.AES.encrypt(message, password);
const cypherString = ciphertext.toString();

console.log("\nCypher:\n", ciphertext.toString());

fs.writeFileSync("cypher.js", `export default "${cypherString}";`);

// Decrypt
const bytes = CryptoJS.AES.decrypt(cypherString, password);
const plaintext = bytes.toString(CryptoJS.enc.Utf8);
console.log("\nSuccessful:", plaintext === message);
