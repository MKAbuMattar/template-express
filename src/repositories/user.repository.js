import User from '../models/user.model'

export const findAll = async () => {
  const users = await User.find({}).select('-password')
  return users
}

export const findById = async (id) => {
  const user = await User.findById(id).select('-password')
  return user
}

export const findByIdWithPassword = async (id) => {
  const user = await User.findById(id)
  return user
}

export const findByUser = async (username) => {
  const user = await User.findOne({ username }).select('-password')
  return user
}

export const findByEmail = async (email) => {
  const user = await User.findOne({ email }).select('-password')
  return user
}

export const findByEmailWithPassword = async (email) => {
  const user = await User.findOne({ email })
  return user
}

export const findByPhone = async (phone) => {
  const user = await User.findOne({ phone }).select('-password')
  return user
}

export const createUser = async (user) => {
  const newUser = new User({
    username: user.username,
    name: user.name,
    email: user.email,
    password: user.password,
    phone: user.phone,
    address: user.address,
    isAdmin: user.isAdmin,
  })
  const savedUser = await newUser.save()
  return savedUser
}

export const updateUsername = async (id, username) => {
  const user = await User.findByIdAndUpdate(
    id,
    { username },
    { new: true },
  ).select('-password')
  return user
}

export const updateName = async (id, name) => {
  const user = await User.findByIdAndUpdate(id, { name }, { new: true }).select(
    '-password',
  )
  return user
}

export const updateEmail = async (id, email) => {
  const user = await User.findByIdAndUpdate(
    id,
    { email },
    { new: true },
  ).select('-password')
  return user
}

export const updatePassword = async (id, password) => {
  const user = await User.findByIdAndUpdate(
    id,
    { password },
    { new: true },
  ).select('-password')
  return user
}

export const updatePhone = async (id, phone) => {
  const user = await User.findByIdAndUpdate(
    id,
    { phone },
    { new: true },
  ).select('-password')
  return user
}

export const updateAddress = async (id, address) => {
  const user = await User.findByIdAndUpdate(
    id,
    { address },
    { new: true },
  ).select('-password')
  return user
}

export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id)
  return user
}

export const getUsersStats = async (lastYear) => {
  const users = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: '$createdAt' },
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: 1 },
      },
    },
  ])
  return users
}

export default {
  findAll,
  findById,
  findByIdWithPassword,
  findByUser,
  findByEmail,
  findByEmailWithPassword,
  findByPhone,
  createUser,
  updateUsername,
  updateName,
  updateEmail,
  updatePassword,
  updatePhone,
  updateAddress,
  deleteUser,
  getUsersStats,
}
