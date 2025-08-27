import fs  from 'fs'
import path from 'path'
import crypto from 'crypto'

const seccurity = (certPath, shortCodeSecurityCredential) => {
    const bufferToEncrypt = Buffer.from(shortCodeSecurityCredential)
    const data = fs.readFileSync(path.resolve(certPath))
    const privateKey = String(data)
    const encrypted = crypto.publicEncrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
    }, bufferToEncrypt)
    const securityCredential = encrypted.toString('base64')
    return securityCredential
}

export default seccurity;