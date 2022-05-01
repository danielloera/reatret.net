// Thanks to https://github.com/pbrln/GTAV-Tunables for the original code this
// is based on.

import aesjs from 'aes-js'

const key = aesjs.utils.hex.toBytes(
    'F06F12F49B843DADE4A7BE053505B19C9E415C95D93753450A269144D59A0115')

function getTunables(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
            const encrypted = new Uint8Array(event.target.result)
            const encryptedLength = encrypted.length - (encrypted.length % 16)
            const aesEcb = new aesjs.ModeOfOperation.ecb(key)
            const decryptedBytes = aesEcb.decrypt(
                encrypted.slice(0, encryptedLength))
            resolve(aesjs.utils.utf8.fromBytes(decryptedBytes) +
                aesjs.utils.utf8.fromBytes(
                    encrypted.slice(encryptedLength, encrypted.length)))
        }
        reader.readAsArrayBuffer(file)
    });
}

export { getTunables }