import UserRepository from '../repositories/user.repository'
import UserSecurity from '../security/user.security'
import UserValidation from '../validations/user.validation'

export const validateUsername = (username) => {
  return UserValidation.validateUsername(username)
}

export const validateName = (name) => {
  return UserValidation.validateName(name)
}

export const validateEmail = (email) => {
  return UserValidation.validateEmail(email)
}

export const validatePassword = (password) => {
  return UserValidation.validatePassword(password)
}

export const comparePassword = (password, encryptedPassword) => {
  return UserSecurity.comparePassword(password, encryptedPassword)
}

export const validatePhone = (phone) => {
  return UserValidation.validatePhone(phone)
}

export const validateAddress = (address) => {
  return UserValidation.validateAddress(address)
}

export const findByUser = async (username) => {
  const user = await UserRepository.findByUser(username)
  return user
}

export const findByEmail = async (email) => {
  const user = await UserRepository.findByEmailWithPassword(email)
  return user
}

export const findByPhone = async (phone) => {
  const user = await UserRepository.findByPhone(phone)
  return user
}

export const createUser = async (user) => {
  const encryptedPassword = UserSecurity.encryptedPassword(user.password)
  const newUser = {
    username: user.username,
    name: user.name,
    email: user.email,
    password: encryptedPassword,
    phone: user.phone,
    address: user.address,
    isAdmin: user.isAdmin,
  }
  const savedUser = await UserRepository.createUser(newUser)
  return savedUser
}

export const generateAccessToken = async (user) => {
  return `Bearer ${UserSecurity.generateAccessToken(user.id, user.isAdmin)}`
}

export default {
  validateUsername,
  validateName,
  validateEmail,
  validatePassword,
  comparePassword,
  validatePhone,
  validateAddress,
  findByUser,
  findByEmail,
  findByPhone,
  createUser,
  generateAccessToken,
}
