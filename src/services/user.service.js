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

export const validatePassword = (name) => {
  return UserValidation.validatePassword(name)
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

export const findAll = async () => {
  const users = await UserRepository.findAll()
  return users
}

export const findById = async (id) => {
  const user = await UserRepository.findByIdWithPassword(id)
  return user
}

export const findByIdWithOutPassword = async (id) => {
  const user = await UserRepository.findById(id)
  return user
}

export const findByEmail = async (email) => {
  const user = await UserRepository.findByEmail(email)
  return user
}

export const findByPhone = async (phone) => {
  const user = await UserRepository.findByPhone(phone)
  return user
}

export const findByUser = async (username) => {
  const user = await UserRepository.findByUser(username)
  return user
}

export const updateUsername = async (id, username) => {
  const user = await UserRepository.updateUsername(id, username)
  return user
}

export const updateName = async (id, name) => {
  const user = await UserRepository.updateName(id, name)
  return user
}

export const updateEmail = async (id, email) => {
  const user = await UserRepository.updateEmail(id, email)
  return user
}

export const updatePassword = async (id, password) => {
  const encryptedPassword = UserSecurity.encryptedPassword(password)
  const user = await UserRepository.updatePassword(id, encryptedPassword)
  return user
}

export const updatePhone = async (id, phone) => {
  const user = await UserRepository.updatePhone(id, phone)
  return user
}

export const updateAddress = async (id, address) => {
  const user = await UserRepository.updateAddress(id, address)
  return user
}

export const deleteUser = async (id) => {
  const user = await UserRepository.deleteUser(id)
  return user
}

export const getUsersStats = async () => {
  const users = await UserRepository.getUsersStats()
  return users
}

export default {
  validateUsername,
  validateName,
  validateEmail,
  validatePassword,
  comparePassword,
  validatePhone,
  validateAddress,
  findAll,
  findById,
  findByIdWithOutPassword,
  findByEmail,
  findByPhone,
  findByUser,
  updateUsername,
  updateName,
  updateEmail,
  updatePassword,
  updatePhone,
  updateAddress,
  deleteUser,
  getUsersStats,
}
