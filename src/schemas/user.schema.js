import mongoose from 'mongoose'
import ConstantNumber from '../constants/number.constant'

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: ConstantNumber.USERNAME_MIN_LENGTH,
      max: ConstantNumber.USERNAME_MAX_LENGTH,
    },
    name: {
      type: String,
      required: true,
      min: ConstantNumber.NAME_MIN_LENGTH,
      max: ConstantNumber.NAME_MAX_LENGTH,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: ConstantNumber.EMAIL_MAX_LENGTH,
    },
    password: {
      type: String,
      required: true,
      min: ConstantNumber.PASSWORD_MIN_LENGTH,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      min: ConstantNumber.PHONE_MIN_LENGTH,
      max: ConstantNumber.PHONE_MAX_LENGTH,
    },
    address: {
      type: String,
      required: true,
      min: ConstantNumber.ADDRESS_MIN_LENGTH,
      max: ConstantNumber.ADDRESS_MAX_LENGTH,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export default UserSchema
