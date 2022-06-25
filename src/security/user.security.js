import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

import { JWT_SECRET, PASS_SECRET } from '../env/variable.env'

export const encryptedPassword = (password) => {
  return CryptoJS.AES.encrypt(password, PASS_SECRET).toString()
}

export const decryptedPassword = (password) => {
  return CryptoJS.AES.decrypt(password, PASS_SECRET).toString(CryptoJS.enc.Utf8)
}

export const comparePassword = (password, dPassword) => {
  const compare = decryptedPassword(dPassword) === password
  return compare
}

export const generateAccessToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, JWT_SECRET, { expiresIn: '3d' })
}

export default {
  encryptedPassword,
  decryptedPassword,
  comparePassword,
  generateAccessToken,
}
