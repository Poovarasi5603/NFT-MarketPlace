"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = require("@noble/hashes/crypto");
const utils_1 = require("./utils");
function validateOpt(key, iv, mode) {
    if (!mode.startsWith("aes-")) {
        throw new Error(`AES submodule doesn't support mode ${mode}`);
    }
    if (iv.length !== 16) {
        throw new Error("AES: wrong IV length");
    }
    if ((mode.startsWith("aes-128") && key.length !== 16) ||
        (mode.startsWith("aes-256") && key.length !== 32)) {
        throw new Error("AES: wrong key length");
    }
}
async function getBrowserKey(mode, key, iv) {
    if (!crypto_1.crypto.web) {
        throw new Error("Browser crypto not available.");
    }
    let keyMode;
    if (["aes-128-cbc", "aes-256-cbc"].includes(mode)) {
        keyMode = "cbc";
    }
    if (["aes-128-ctr", "aes-256-ctr"].includes(mode)) {
        keyMode = "ctr";
    }
    if (!keyMode) {
        throw new Error("AES: unsupported mode");
    }
    const wKey = await crypto_1.crypto.web.subtle.importKey("raw", key, { name: `AES-${keyMode.toUpperCase()}`, length: key.length * 8 }, true, ["encrypt", "decrypt"]);
    return [wKey, { name: `aes-${keyMode}`, iv, counter: iv, length: 64 }];
}
async function encrypt(msg, key, iv, mode = "aes-128-ctr", pkcs7PaddingEnabled = true) {
    validateOpt(key, iv, mode);
    if (crypto_1.crypto.web) {
        const [wKey, wOpt] = await getBrowserKey(mode, key, iv);
        const cipher = await crypto_1.crypto.web.subtle.encrypt(wOpt, wKey, msg);
        // Remove PKCS7 padding on cbc mode by stripping end of message
        let res = new Uint8Array(cipher);
        if (!pkcs7PaddingEnabled && wOpt.name === "aes-cbc" && !(msg.length % 16)) {
            res = res.slice(0, -16);
        }
        return res;
    }
    else if (crypto_1.crypto.node) {
        const cipher = crypto_1.crypto.node.createCipheriv(mode, key, iv);
        cipher.setAutoPadding(pkcs7PaddingEnabled);
        return (0, utils_1.concatBytes)(cipher.update(msg), cipher.final());
    }
    else {
        throw new Error("The environment doesn't have AES module");
    }
}
exports.encrypt = encrypt;
async function getPadding(cypherText, key, iv, mode) {
    const lastBlock = cypherText.slice(-16);
    for (let i = 0; i < 16; i++) {
        // Undo xor of iv and fill with lastBlock ^ padding (16)
        lastBlock[i] ^= iv[i] ^ 16;
    }
    const res = await encrypt(lastBlock, key, iv, mode);
    return res.slice(0, 16);
}
async function decrypt(cypherText, key, iv, mode = "aes-128-ctr", pkcs7PaddingEnabled = true) {
    validateOpt(key, iv, mode);
    if (crypto_1.crypto.web) {
        const [wKey, wOpt] = await getBrowserKey(mode, key, iv);
        // Add empty padding so Chrome will correctly decrypt message
        if (!pkcs7PaddingEnabled && wOpt.name === "aes-cbc") {
            const padding = await getPadding(cypherText, key, iv, mode);
            cypherText = (0, utils_1.concatBytes)(cypherText, padding);
        }
        const msg = await crypto_1.crypto.web.subtle.decrypt(wOpt, wKey, cypherText);
        const msgBytes = new Uint8Array(msg);
        // Safari always ignores padding (if no padding -> broken message)
        if (wOpt.name === "aes-cbc") {
            const encrypted = await encrypt(msgBytes, key, iv, mode);
            if (!(0, utils_1.equalsBytes)(encrypted, cypherText)) {
                throw new Error("AES: wrong padding");
            }
        }
        return msgBytes;
    }
    else if (crypto_1.crypto.node) {
        const decipher = crypto_1.crypto.node.createDecipheriv(mode, key, iv);
        decipher.setAutoPadding(pkcs7PaddingEnabled);
        return (0, utils_1.concatBytes)(decipher.update(cypherText), decipher.final());
    }
    else {
        throw new Error("The environment doesn't have AES module");
    }
}
exports.decrypt = decrypt;
