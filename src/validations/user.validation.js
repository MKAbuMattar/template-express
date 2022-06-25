import ConstantRegex from '../constants/regex.constant'

export const validateUsername = async (username) => {
  return ConstantRegex.USERNAME.test(username)
}

export const validateName = async (name) => {
  return ConstantRegex.NAME.test(name)
}

export const validateEmail = async (email) => {
  return ConstantRegex.EMAIL.test(email)
}

export const validatePassword = async (password) => {
  return ConstantRegex.PASSWORD.test(password)
}

export const validatePhone = async (phone) => {
  return ConstantRegex.PHONE.test(phone)
}

export const validateAddress = async (address) => {
  return ConstantRegex.ADDRESS.test(address)
}

export default {
  validateUsername,
  validateName,
  validateEmail,
  validatePassword,
  validatePhone,
  validateAddress,
}
