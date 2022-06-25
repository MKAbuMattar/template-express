import mongoose from 'mongoose'
import UserSchema from '../schemas/user.schema'

import ConstantModel from '../constants/model.constant'

const UserModel = mongoose.model(ConstantModel.USER_MODEL, UserSchema)

export default UserModel
